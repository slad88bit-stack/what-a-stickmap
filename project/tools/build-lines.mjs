// Flattens script/blocks.mjs into script/lines.json (one entry per spoken line) and
// script/clips.json (one TTS call per clip: several neighbouring lines of the same voice).
// A new clip starts when the speaker changes, when the character budget is used up, or
// after a line marked `end: true` (clip boundary that must not move).
// node tools/build-lines.mjs
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, say} from './lib.mjs';

const {BLOCKS} = await import(path.join(ROOT, 'script', 'blocks.mjs'));
const VOICE = {N: 'voice-00', HERO: 'voice-01', MAYA: 'voice-02', MOM: 'voice-03'};
const BUDGET = 1400; // TTS accepts up to 1500 characters per call

const lines = [];
for (const b of BLOCKS) for (const l of b.lines) lines.push({id: String(lines.length + 1).padStart(3, '0'), sp: l.sp, t: l.t, block: b.name, end: !!l.end});
if (lines.length > 999) throw new Error('more than 999 lines');

const clips = [];
let cur = null;
for (const l of lines) {
	if (!cur || cur.sp !== l.sp || cur.end || cur.text.length + l.t.length > BUDGET) {
		cur = {n: clips.length + 1, sp: l.sp, ids: [], text: '', parts: []};
		clips.push(cur);
	}
	cur.ids.push(l.id);
	cur.parts.push(l.t);
	cur.text = cur.parts.join(' ');
	if (l.end) cur = {...cur, closed: true}, (cur = null);
}
for (const c of clips) {
	c.voice = VOICE[c.sp] ?? 'voice-00';
	c.file = `vo/clip${String(c.n).padStart(2, '0')}.mp3`;
}
// the two takes that already exist: their texts are used verbatim, so keep the audio
const KEEP = [
	{first: 'Ты не стал удалять аккаунт.', file: 'vo/clip20.mp3'},
	{first: 'И ты впервые за год ответил не сразу.', file: 'vo/clip22.mp3'},
];
for (const k of KEEP) {
	const c = clips.find((x) => x.text.startsWith(k.first));
	if (!c) throw new Error('no clip starts with: ' + k.first);
	c.file = k.file;
	c.reuse = true;
}
fs.writeFileSync(path.join(ROOT, 'script', 'lines.json'), JSON.stringify({lines}, null, 1));
fs.writeFileSync(path.join(ROOT, 'script', 'clips.json'), JSON.stringify(clips, null, 1));
say(`lines: ${lines.length}, clips: ${clips.length}, chars: ${lines.reduce((a, l) => a + l.t.length, 0)}`);
for (const c of clips) say(`  ${String(c.n).padStart(2, '0')} ${c.sp.padEnd(4)} ${String(c.text.length).padStart(4)} chars  lines ${c.ids[0]}–${c.ids[c.ids.length - 1]}${c.reuse ? '  (reuse ' + c.file + ')' : ''}`);
