#!/usr/bin/env node
// Pfad-Schulserver (Referenz). Node 18+, keine Abhängigkeiten.
// Speichert freigegebene Fälle, gleicht mit den Geräten ab und verwaltet Einladungen per Kürzel.
// Start:            node pfad-server.mjs
// Lehrkraft anlegen: node pfad-server.mjs nutzer NB "Frau B." 'start-passwort'
// Einstellungen über Umgebungsvariablen: PORT, DATEN (Pfad zur JSON-Datei), APP (Ordner mit der App), TLS_CERT, TLS_KEY
import http from "node:http";import https from "node:https";import fs from "node:fs";import path from "node:path";import crypto from "node:crypto";

const PORT=+process.env.PORT||8080,DATEN=process.env.DATEN||"pfad-daten.json",APP=process.env.APP||"app";
let D={rev:0,users:{},faelle:{},entfernt:{},einladungen:{},tokens:{}};
if(fs.existsSync(DATEN))D={...D,...JSON.parse(fs.readFileSync(DATEN,"utf8"))};
function speichern(){const t=DATEN+".tmp";fs.writeFileSync(t,JSON.stringify(D));fs.renameSync(t,DATEN)}
const hash=(pw,salt)=>crypto.scryptSync(pw,salt,32).toString("hex");

// --- Kommandozeile: Lehrkräfte verwalten ---
const [cmd,...args]=process.argv.slice(2);
if(cmd==="nutzer"){const [k,name,pw]=args;if(!k||!pw||pw.length<8){console.error('Aufruf: node pfad-server.mjs nutzer KÜRZEL "Name" passwort (mind. 8 Zeichen)');process.exit(1)}
  const salt=crypto.randomBytes(16).toString("hex");D.users[k]={name:name||"",salt,hash:hash(pw,salt)};speichern();console.log(`Lehrkraft ${k} gespeichert.`);process.exit(0)}
if(cmd==="nutzer-entfernen"){const [k]=args;delete D.users[k];for(const f of Object.values(D.faelle))if(f.members.includes(k))entferne(f,k);speichern();console.log(`${k} entfernt.`);process.exit(0)}
if(cmd==="liste"){for(const [k,u] of Object.entries(D.users))console.log(k,u.name);console.log(Object.keys(D.faelle).length,"Fälle");process.exit(0)}

// --- Zusammenführen: dieselbe Regel wie in der App ---
const ver=x=>x.edited||x.upd||x.ts||0;
function mergeList(a=[],b=[],del){const m=new Map(a.map(x=>[x.id,x]));for(const x of b){const y=m.get(x.id);if(!y||ver(x)>ver(y))m.set(x.id,x)}return [...m.values()].filter(x=>!del.has(x.id))}
function mergeDoc(ex,k){const del=new Set([...(ex.del||[]),...(k.del||[])]),out={...ex};
  if(ver(k)>ver(ex))Object.assign(out,{code:k.code,cls:k.cls,upd:k.upd,...(k.icon?{icon:k.icon}:{})});
  const eg=new Map((ex.goals||[]).map(g=>[g.id,g]));
  out.goals=mergeList(ex.goals,k.goals,del).map(g=>{const a=eg.get(g.id)?.entries||[],b=((k.goals||[]).find(x=>x.id===g.id)||{}).entries||[];return {...g,entries:mergeList(a,b,del)}});
  out.diary=mergeList(ex.diary,k.diary,del);out.del=[...del];out.delTs=Math.max(ex.delTs||0,k.delTs||0);return out}
const sauber=doc=>{const {srv,team,pending,demo,...d}=doc;return d};
function entferne(f,k){f.members=f.members.filter(x=>x!==k);(D.entfernt[k]??=[]).push({id:f.doc.id,rev:++D.rev});f.rev=++D.rev}

// --- HTTP ---
function antwort(res,code,obj){res.writeHead(code,{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type, Authorization","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Cache-Control":"no-store"});res.end(JSON.stringify(obj))}
const fehler=(res,code,text)=>antwort(res,code,{fehler:text});
async function body(req){let s="";for await(const c of req){s+=c;if(s.length>20e6)throw new Error("zu groß")}return s?JSON.parse(s):{}}
function wer(req){const t=(req.headers.authorization||"").replace(/^Bearer /,""),x=D.tokens[t];if(!x||x.bis<Date.now())return null;return x.k}
const MIME={".html":"text/html; charset=utf-8",".js":"text/javascript",".json":"application/json",".webmanifest":"application/manifest+json",".png":"image/png",".svg":"image/svg+xml"};
function statisch(req,res){let p=decodeURIComponent(new URL(req.url,"http://x").pathname);if(p.endsWith("/"))p+="index.html";
  const root=path.resolve(APP),f=path.resolve(root,"."+path.posix.normalize(p));if(f!==root&&!f.startsWith(root+path.sep))return fehler(res,403,"verboten");
  fs.readFile(f,(e,b)=>{if(e)return fehler(res,404,"nicht gefunden");res.writeHead(200,{"Content-Type":MIME[path.extname(f)]||"application/octet-stream","Cache-Control":"no-cache"});res.end(b)})}

async function handler(req,res){try{
  if(req.method==="OPTIONS")return antwort(res,204,{});
  const url=new URL(req.url,"http://x"),p=url.pathname;
  if(!p.startsWith("/api/"))return statisch(req,res);
  if(p==="/api/ping")return antwort(res,200,{ok:true,name:"Pfad-Server",version:1});
  if(p==="/api/login"&&req.method==="POST"){const {kuerzel,passwort}=await body(req),u=D.users[kuerzel];
    if(!u||hash(passwort||"",u.salt)!==u.hash){await new Promise(r=>setTimeout(r,600));return fehler(res,401,"Kürzel oder Passwort falsch")}
    const t=crypto.randomBytes(24).toString("hex");D.tokens[t]={k:kuerzel,bis:Date.now()+30*864e5};speichern();return antwort(res,200,{token:t,kuerzel,name:u.name})}
  const me=wer(req);if(!me)return fehler(res,401,"nicht angemeldet");
  if(p==="/api/sync"&&req.method==="POST"){const {since=0,push=[]}=await body(req);
    for(const doc of push){if(!doc?.id)continue;const f=D.faelle[doc.id];
      if(!f){D.faelle[doc.id]={doc:sauber(doc),members:[me],pending:[],rev:++D.rev};continue}
      if(!f.members.includes(me))continue;const neu=mergeDoc(f.doc,sauber(doc));if(JSON.stringify(neu)!==JSON.stringify(f.doc)){f.doc=neu;f.rev=++D.rev}}
    const kids=Object.values(D.faelle).filter(f=>f.members.includes(me)&&f.rev>since).map(f=>({...f.doc,team:f.members,pending:f.pending}));
    const removed=(D.entfernt[me]||[]).filter(x=>x.rev>since&&!D.faelle[x.id]?.members.includes(me)).map(x=>x.id);
    const invites=Object.values(D.einladungen).filter(i=>i.an===me).map(i=>({id:i.id,von:i.von,code:D.faelle[i.fall]?.doc.code,cls:D.faelle[i.fall]?.doc.cls}));
    speichern();return antwort(res,200,{rev:D.rev,kids,removed,invites,people:Object.entries(D.users).map(([k,u])=>({kuerzel:k,name:u.name}))})}
  let m;
  if((m=p.match(/^\/api\/faelle\/([^/]+)\/(einladen|entfernen)$/))&&req.method==="POST"){const f=D.faelle[decodeURIComponent(m[1])],{kuerzel}=await body(req);
    if(!f||!f.members.includes(me))return fehler(res,403,"kein Zugriff auf dieses Kind");
    if(m[2]==="einladen"){if(!D.users[kuerzel])return fehler(res,404,`Kürzel ${kuerzel} ist nicht angemeldet`);if(f.members.includes(kuerzel)||f.pending.includes(kuerzel))return fehler(res,409,`${kuerzel} ist schon eingetragen`);
      const id=crypto.randomBytes(8).toString("hex");D.einladungen[id]={id,fall:f.doc.id,an:kuerzel,von:me};f.pending.push(kuerzel);f.rev=++D.rev}
    else{if(!f.members.includes(kuerzel))return fehler(res,404,"nicht eingetragen");entferne(f,kuerzel)}
    speichern();return antwort(res,200,{ok:true})}
  if((m=p.match(/^\/api\/einladungen\/([^/]+)\/(annehmen|ablehnen)$/))&&req.method==="POST"){const i=D.einladungen[m[1]];if(!i||i.an!==me)return fehler(res,404,"Einladung nicht gefunden");
    const f=D.faelle[i.fall];delete D.einladungen[i.id];if(f){f.pending=f.pending.filter(x=>x!==me);if(m[2]==="annehmen"&&!f.members.includes(me))f.members.push(me);f.rev=++D.rev}
    speichern();return antwort(res,200,{ok:true})}
  return fehler(res,404,"unbekannt")}
  catch(e){console.error(e);fehler(res,400,"ungültige Anfrage")}}

const srv=process.env.TLS_CERT?https.createServer({cert:fs.readFileSync(process.env.TLS_CERT),key:fs.readFileSync(process.env.TLS_KEY)},handler):http.createServer(handler);
srv.listen(PORT,()=>console.log(`Pfad-Server läuft auf Port ${PORT} (${process.env.TLS_CERT?"https":"http"}), Daten: ${DATEN}, App: ${APP}`));
