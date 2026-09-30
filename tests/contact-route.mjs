import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import assert from 'node:assert/strict';
let upstream, forwarded;
globalThis.__contactTest = { json: (body, init) => Response.json(body, init), submit: async payload => { forwarded = payload; if(upstream instanceof Error) throw upstream; return upstream; } };
const source = (await readFile(new URL('../app/api/contact/route.ts', import.meta.url), 'utf8'))
 .replace('import { NextResponse } from "next/server";', 'const NextResponse = { json: globalThis.__contactTest.json };')
 .replace('import { submitContactMessage } from "@/lib/wordpress";', 'const submitContactMessage = globalThis.__contactTest.submit;');
const { POST } = await import('data:text/javascript;base64,' + Buffer.from(stripTypeScriptTypes(source)).toString('base64'));
const payload = { 'contact-name':'Test', 'contact-phone':'', 'contact-email':'test@example.com', subject:'Website', 'contact-message':'Project details', type:'contact' };
const send = (data, origin='https://portfolio.example') => POST(new Request('https://portfolio.example/api/contact', { method:'POST', headers:{ 'Content-Type':'application/json', origin }, body:JSON.stringify(data) }));
for (const type of ['contact','quote']) {
 upstream=Response.json({success:true, message:'Saved'});
 assert.equal((await send({...payload,type})).status,200); assert.equal(forwarded.type,type);
}
assert.equal((await send(payload,'https://attacker.example')).status,403);
assert.equal((await send({...payload,'contact-email':'bad'})).status,400);
assert.equal((await send({...payload,'contact-phone':'1'.repeat(81)})).status,400);
assert.equal((await send({...payload,website:'spam'})).status,400);
assert.equal((await send({...payload,type:'invalid'})).status,400);
assert.equal((await send({...payload,'contact-message':'a'.repeat(25000)})).status,413);
for (const body of [null, [], {}, {success:false}, {success:'true'}]) { upstream=Response.json(body); assert.equal((await send(payload)).status,502); }
upstream=new Response('not json'); assert.equal((await send(payload)).status,502);
upstream=Response.json({message:'Limited'},{status:429}); assert.equal((await send(payload)).status,429);
upstream=Response.json({success:true, notification:'pending', message:'Saved, email pending'}); assert.equal((await (await send(payload)).json()).message,'Saved, email pending');
upstream=new Error('Simulated timeout'); assert.equal((await send(payload)).status,502);
console.log('PASS contact and quote forwarding, validation, origin, size, upstream failures, pending mail');
