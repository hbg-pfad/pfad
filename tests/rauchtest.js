// Rauchtest für Pfad: startet einen lokalen Server und spielt mit dem fiktiven Beispielfall
// Einrichtung, Kind anlegen, Bewerten, Sicherung, App-Sperre und Löschen durch.
// Aufruf im Repo-Ordner: node tests/rauchtest.js   (braucht Playwright mit Chromium)
// Geprüft wird die Beta (beta/). Vorher bauen: python3 werkzeuge/beta-bauen.py pfad-beta-<version>
// Nur fiktive Daten verwenden (Beispielfall, Klasse 7.2). Keine echten Kennungen.
const {chromium}=require("playwright"),http=require("http"),fs=require("fs"),path=require("path"),os=require("os");
const root=path.resolve(__dirname,"..");
const TYPES={".html":"text/html",".js":"text/javascript",".json":"application/json",".webmanifest":"application/manifest+json",".png":"image/png",".svg":"image/svg+xml"};
const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split("?")[0]));if(f.endsWith(path.sep))f+="index.html";
  if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}
  r.writeHead(200,{"Content-Type":TYPES[path.extname(f)]||"application/octet-stream"});fs.createReadStream(f).pipe(r)}).listen(8765);
const URL="http://localhost:8765/beta/",tmp=f=>path.join(os.tmpdir(),f);
const ok=(c,m)=>{if(!c)throw new Error("FEHLER: "+m);console.log("✓ "+m)};
(async()=>{const b=await chromium.launch(),errs=[];
  const page=async ctx=>{const p=await ctx.newPage();p.on("pageerror",e=>errs.push(e.message));p.on("console",m=>{if(m.type()==="error")errs.push(m.text())});return p};
  const ctx=await b.newContext({acceptDownloads:true}),p=await page(ctx);
  const dlgBtn=t=>p.locator(".cele button",{hasText:t}).last().click();
  const dlgIn=async v=>{await p.fill("#dlgIn",v);await p.press("#dlgIn","Enter")};
  const tab=t=>p.evaluate(t=>go({tab:t}),t);

  // Offline-Dateien: räumen nur eigene Speicher auf (ab 1.3.3)
  const swB=fs.readFileSync(path.join(root,"beta/sw.js"),"utf8"),swQ=fs.readFileSync(path.join(root,"quelle/sw.js"),"utf8");
  ok(swB.includes('k!==C&&k.startsWith("pfad-")&&k.startsWith("pfad-beta")'),"Beta-Offline-Datei löscht nur alte Beta-Speicher");
  ok(swQ.includes('k!==C&&k.startsWith("pfad-")&&!k.startsWith("pfad-beta")'),"Haupt-Offline-Datei löscht keine fremden und keine Beta-Speicher");

  await p.goto(URL);await p.waitForFunction(()=>typeof db==="object"&&!!db);
  ok(await p.locator("h1",{hasText:"Heute"}).count()===1,"Startseite Heute");
  ok(await p.locator("text=Einrichtung: noch 4 von 4 Schritten").count()===1,"Einrichtung mit 4 Schritten");
  const ver=await p.evaluate(()=>PFAD_VERSION);ok(/^\d+\.\d+\.\d+ Beta$/.test(ver),"Version "+ver);

  // 1. Kürzel der Lehrkraft
  await p.click("button:has-text('Dein Kürzel eintragen')");await p.fill("#meIn","TE");await p.click("main button:has-text('Weiter')");
  ok(await p.evaluate(()=>db.me==="TE"),"Lehrkraft-Kürzel gespeichert");
  // 2. Beispielfall
  await p.click("button:has-text('Fiktiven Beispielfall laden')");
  ok(await p.evaluate(()=>db.kids.length===1&&db.kids[0].demo&&db.kids[0].code==="7.2-99"),"Beispielfall 7.2-99 geladen");

  // Kind anlegen
  await tab("klassen");await p.click("text=+ Kind anlegen");await p.selectOption("#ncls","7.2");await p.fill("#nnr","3");await p.click("main button:has-text('Anlegen')");
  ok(await p.locator("main",{hasText:"7.2-03"}).count()===1&&await p.evaluate(()=>db.kids.some(k=>k.code==="7.2-03"&&!k.demo)),"Kind 7.2-03 angelegt");
  // Kennung mit HTML wird nicht als HTML ausgegeben
  await tab("klassen");await p.click("text=+ Kind anlegen");await p.selectOption("#ncls","7.2");await p.fill("#nnr",'<img src=x onerror=alert(1)>');await p.click("main button:has-text('Anlegen')");
  ok(await p.locator("main img").count()===0&&await p.evaluate(()=>!db.kids.some(k=>/</.test(k.code))),"Kennung mit HTML wird abgelehnt");
  await p.click("main button:has-text('Abbrechen')").catch(()=>{});

  // Bewerten: Tipp auf die Kinderkarte, beide Verhalten
  await tab("heute");await p.locator("main .card",{hasText:"7.2-99"}).first().locator("text=7.2-99").first().click();
  ok(await p.locator("#overlay .rate").count()===1,"Bewerten öffnet sich");
  const e0=await p.evaluate(()=>db.kids.find(k=>k.demo).goals.reduce((s,g)=>s+g.entries.length,0));
  await p.locator("#overlay button:text-is('7')").click();await p.fill("#note","Fiktiv: ruhige Stunde");await p.click("#overlay button:has-text('Weiter')");
  await p.locator("#overlay button:text-is('3')").click();await p.click("#overlay button.pri");
  await p.waitForFunction(n=>db.kids.find(k=>k.demo).goals.reduce((s,g)=>s+g.entries.length,0)>=n+2,e0);
  ok(await p.evaluate(()=>db.kids.find(k=>k.demo).goals.some(g=>g.entries.some(e=>e.note==="Fiktiv: ruhige Stunde"))),"Einschätzungen mit Kommentar gespeichert");
  await p.locator(".cele button").last().click({timeout:1500}).catch(()=>{});

  // Bewerten auf kleinen iPhones: nur Hinweis, kein Fehler
  {const c=await b.newContext({viewport:{width:375,height:548}}),q=await page(c);await q.goto(URL);await q.waitForFunction(()=>!!db);
    for(const [w,h] of [[375,548],[390,664],[430,740]]){await q.setViewportSize({width:w,height:h});await q.goto(URL);await q.waitForFunction(()=>!!db);
      if(!await q.evaluate(()=>db.kids.length)){await q.evaluate(()=>go({tab:"profil"}));await q.click("button:has-text('Fiktiven Beispielfall laden')");await q.evaluate(()=>go({tab:"heute"}))}
      await q.locator("main .card",{hasText:"7.2-99"}).first().locator("text=7.2-99").first().click();
      const m=await q.evaluate(()=>{const r=document.querySelector("#overlay .rate");return [r.scrollHeight,r.clientHeight]});
      console.log(`  Hinweis: Bewerten auf ${w}×${h}: ${m[0]<=m[1]?"passt ohne Scrollen":"scrollt ("+m[0]+" px Inhalt bei "+m[1]+" px Höhe)"}`);
      await q.click("#overlay button:has-text('✕')")}
    await c.close()}

  // 3. Sicherungskopie
  await tab("profil");await p.click("button:has-text('Sicherungskopie ablegen')");
  await dlgIn("geheim123");await dlgIn("geheim123");
  await dlgBtn("Merken");
  const [dl]=await Promise.all([p.waitForEvent("download"),dlgBtn("Verstanden")]);
  const file=tmp("pfad-test.json");await dl.saveAs(file);
  const sic=JSON.parse(fs.readFileSync(file,"utf8"));
  ok(sic.pfad===3&&sic.ct&&!JSON.stringify(sic).includes("7.2-03"),"Sicherung verschlüsselt, ohne Klartext");
  ok(await p.evaluate(()=>!!db.lastBackup),"Sicherung vermerkt");

  // Sicherung auf frischem Gerät laden
  {const c2=await b.newContext(),p2=await page(c2);await p2.goto(URL);await p2.waitForFunction(()=>!!db);await p2.evaluate(()=>go({tab:"profil"}));
    await p2.setInputFiles("#imp",file);await p2.fill("#dlgIn","geheim123");await p2.press("#dlgIn","Enter");
    await p2.click("main button[onclick='applyImport()']");await p2.waitForTimeout(300);
    ok(await p2.evaluate(()=>db.kids.some(k=>k.code==="7.2-03")),"Sicherung auf neuem Gerät geladen");
    ok(await p2.evaluate(()=>!db.kids.some(k=>k.demo)),"Beispielfall nicht in der Sicherung");
    await c2.close()}

  // 4. App-Sperre
  await tab("profil");await p.locator("input.sw[onchange*='setLock']").check();
  await dlgIn("2468");await dlgIn("2468");
  for(let i=0;i<50&&!await p.evaluate(async()=>{await SAVEQ;return JSON.parse(await idbGet(KEY)||"{}").pfadEnc===1});i++)await p.waitForTimeout(100);
  let raw=await p.evaluate(()=>idbGet(KEY));
  ok(raw.includes('"pfadEnc":1')&&!raw.includes("7.2-03"),"Speicher verschlüsselt");
  await p.reload();await p.waitForFunction(()=>!!db);ok(await p.locator("#lock").count()===1,"Nach Neustart gesperrt");
  const code=async c=>{for(const d of c)await p.locator("#lock button",{hasText:new RegExp("^"+d+"$")}).first().click()};
  await code("1111");await p.waitForTimeout(400);ok(await p.locator("#lock").count()===1,"Falscher Code öffnet nicht");
  await code("2468");await p.waitForSelector("#lock",{state:"detached"});
  // 1.3.7: Beim Sperren verlassen Kinderdaten und Schlüssel den Arbeitsspeicher; „Vergessen?“ nur mit LÖSCHEN
  {const n=await p.evaluate(()=>db.kids.length);await p.evaluate(()=>lockNow());
  ok(await p.evaluate(()=>WIPED&&LKEY===null&&db.kids.length===0),"Gesperrt: Kinderdaten und Schlüssel nicht im Arbeitsspeicher");
  ok(await p.evaluate(()=>["#app","#nav","#overlay"].every(q=>document.querySelector(q).innerHTML==="")),"Gesperrt: zuletzt gezeigte Seite ist weggeräumt (1.3.9)");
  await p.click("#lock button:has-text('Vergessen?')");await p.fill("#dlgIn","nein");await p.press("#dlgIn","Enter");
  ok(await p.evaluate(()=>WIPED),"Vergessen? löscht nur mit LÖSCHEN");
  await code("2468");await p.waitForSelector("#lock",{state:"detached"});ok(await p.evaluate(n=>!WIPED&&db.kids.length===n,n),"Nach Entsperren alles wieder da")}
  ok(await p.evaluate(()=>db.kids.some(k=>k.code==="7.2-03")),"Entsperrt, Daten da");

  // 5. Alle Daten löschen: Sperre bleibt (ab 1.3.3)
  await tab("profil");await p.click("button:has-text('Alle Daten auf diesem Gerät löschen')");await dlgBtn("Alles löschen");
  ok(await p.evaluate(()=>db.kids.length===0&&!!db.lock),"Daten gelöscht, App-Sperre bleibt an");
  await p.evaluate(()=>{db.classes.includes("7.2")||db.classes.push("7.2");db.kids.push({id:uid(),code:"7.2-05",icon:"🦊",cls:"7.2",goals:[],diary:[],ts:Date.now()});save()});
  await p.waitForTimeout(300);raw=await p.evaluate(()=>idbGet(KEY));
  ok(raw.includes('"pfadEnc":1')&&!raw.includes("7.2-05"),"Neue Einträge nach dem Löschen weiter verschlüsselt");
  await p.reload();await p.waitForFunction(()=>!!db);ok(await p.locator("#lock").count()===1,"Nach dem Löschen weiter gesperrt");
  await code("2468");await p.waitForSelector("#lock",{state:"detached"});

  // Fach vorschlagen nach Wochentag und Stunde (ab 1.3.8, ersetzt den Stundenplan). 2026-11-09 und 16/23/30 sind Montage.
  {const e=(date,slot,subj,ts=1)=>({date,slot,subj,ts});
   const kk={goals:[{entries:[e("2026-11-02","1. Std.","Mathe"),e("2026-11-09","1. Std.","Mathe"),e("2026-11-16","1. Std.","Kunst"),e("2026-11-10","1. Std.","Sport")]},{entries:[e("2026-11-16","2. Std.","Englisch")]}]};
   ok(await p.evaluate(k=>learnSubj(k,"2026-11-23","1. Std.")==="Mathe"&&learnSubj(k,"2026-11-24","1. Std.")==="Sport"&&learnSubj(k,"2026-11-23","2. Std.")==="Englisch"&&learnSubj(k,"2026-11-23","3. Std.")===""&&learnSubj(k,"2026-11-25","1. Std.")==="",kk),"Fach nach Wochentag und Stunde vorgeschlagen, Vertretung stört nicht");
   kk.goals[0].entries.push(e("2026-11-23","1. Std.","Kunst"));
   ok(await p.evaluate(k=>learnSubj(k,"2026-11-30","1. Std.")==="Kunst",kk),"Neues Fach setzt sich nach zwei Wochen durch");
   const k0=await p.evaluate(()=>db.kids[0].id);await p.evaluate(id=>go({tab:"klassen",kid:id}),k0);
   ok(await p.locator("main b",{hasText:"Stundenplan"}).count()===0,"Keine Stundenplan-Eingabe mehr beim Kind");
   ok(await p.evaluate(()=>!okKid({...db.kids[0],plan:{9:{1:"D"}}})&&!okKid({...db.kids[0],plan:{1:{1:"<b>"}}})),"Alte Stundenpläne aus Dateien werden weiter geprüft")}

  // PDF-Text: Minuszeichen bleibt lesbar (ab 1.3.3)
  ok(await p.evaluate(()=>pdfTxt("−2 → 3").includes("-2 -> 3")),"Minuszeichen im PDF als -");

  // 1.3.9: Kind löschen mit Rückgängig, Dialoge, Klassen aus Dateien werden geprüft
  await p.evaluate(()=>{if(!db.kids.some(k=>k.demo))demo(true);go({tab:"klassen"})});
  {const id=await p.evaluate(()=>db.kids.find(k=>k.demo).id);const q=p.evaluate(i=>delKid(i),id);await p.locator(".cele button",{hasText:"Löschen"}).last().click();await q;
  ok(await p.evaluate(i=>!kidById(i),id)&&await p.locator(".toast.undo").count()===1,"Kind gelöscht, Rückgängig wird angeboten");
  await p.locator(".toast.undo button").first().click();ok(await p.evaluate(i=>!!kidById(i)&&kidById(i).goals.length===2,id),"Rückgängig holt das Kind mit allen Einträgen zurück")}
  {const q=p.evaluate(()=>askText("Test","x"));await p.waitForSelector(".cele #dlgIn");await p.fill("#dlgIn","abc");await p.mouse.click(3,3);ok(await p.locator(".cele #dlgIn").count()===1,"Dialog mit Textfeld bleibt bei Tipp daneben offen");
  await p.keyboard.press("Escape");ok(await q===null&&await p.locator(".cele").count()===0,"Escape schließt den Dialog")}
  ok(await p.evaluate(()=>{const n=db.classes.length;IMP={kids:[],sel:new Set(),settings:true,d:{classes:[{x:1},"9.9",5,"x".repeat(50)],me:{a:1}}};applyImport();return db.classes.length===n+1&&db.classes.includes("9.9")&&typeof db.me==="string"}),"Klassen und Kürzel aus Dateien werden geprüft");
  // 1.4.0: Speicher der App (IndexedDB), Umzug alter Daten, neues Aussehen
  ok(await p.evaluate(async()=>{save();await SAVEQ;return STORE==="idb"&&localStorage.getItem(KEY)===null&&typeof await idbGet(KEY)==="string"}),"Daten liegen im Speicher der App, nicht im localStorage");
  {const c3=await b.newContext(),p3=await page(c3);await p3.goto(URL);await p3.waitForFunction(()=>!!db);
   await p3.evaluate(async()=>{await SAVEQ;await idbSet(KEY,null);localStorage.setItem(KEY,JSON.stringify({v:2,me:"ALT",subjects:SUBJECTS.slice(),classes:["9.9"],kids:[]}))});
   await p3.reload();await p3.waitForFunction(()=>!!db);
   ok(await p3.evaluate(async()=>db.me==="ALT"&&db.classes.includes("9.9")&&localStorage.getItem(KEY)===null&&(await idbGet(KEY)).includes("ALT")),"Alte Daten aus localStorage werden umgezogen");await c3.close()}
  {await p.setViewportSize({width:390,height:700});const q=p.evaluate(()=>ask("Test?"));await p.waitForSelector(".cele.sheet");
   const r=await p.evaluate(()=>{const x=document.querySelector(".cele.sheet .box").getBoundingClientRect();return x.bottom>=innerHeight-1&&x.width>=innerWidth-1});ok(r,"Rückfrage ohne Textfeld kommt auf dem Handy von unten");await p.keyboard.press("Escape");await q;
   const q2=p.evaluate(()=>askText("Test","x"));await p.waitForSelector(".cele #dlgIn");ok(await p.locator(".cele.sheet").count()===0,"Fenster mit Textfeld bleibt in der Mitte");await p.keyboard.press("Escape");await q2}
  ok(await p.evaluate(()=>{const c=document.createElement("div");c.className="card";document.body.appendChild(c);const b=document.createElement("button");b.className="btn";c.appendChild(b);const r=getComputedStyle(c).borderTopColor==="rgba(0, 0, 0, 0)"&&getComputedStyle(b).borderTopColor==="rgba(0, 0, 0, 0)";c.remove();return r}),"Karten und Knöpfe ohne Rahmen");
  ok(!errs.length,"keine Fehler in der Konsole"+(errs.length?": "+errs.join(" | "):""));
  for(const w of [390,820]){await p.setViewportSize({width:w,height:900});await tab("heute");await p.screenshot({path:tmp(`pfad-${w}.png`),fullPage:true})}
  await b.close();srv.close();console.log("Alle Prüfungen bestanden.")})().catch(e=>{console.error(e.message);srv.close();process.exit(1)});
