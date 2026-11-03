// Flattens script/blocks.mjs into script/lines.json and script/clips.json
// (one TTS call per clip: neighbouring lines of the same voice).
// Идентификаторы реплик идут через один (001, 003, 005…), чтобы новые строки можно было
// вставлять между ними (чётные номера), не сдвигая привязки сцен `at('NNN')`.
// Имя файла озвучки — по первой реплике клипа: public/vo/clip_<id>.mp3.
// node tools/build-lines.mjs
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, say} from './lib.mjs';

const {BLOCKS} = await import(path.join(ROOT, 'script', 'blocks.mjs'));
const VOICE = {N: 'voice-00', HERO: 'voice-01', MAYA: 'voice-02', MOM: 'voice-03'};
const BUDGET = 1400;

const lines = [];
let k = 0;
for (const b of BLOCKS) {
	for (const l of b.lines) {
		const id = l.id ?? String(k * 10 + 1).padStart(3, '0');
		if (!l.id) k++;
		if (lines.some((x) => x.id === id)) throw new Error('duplicate line id ' + id);
		lines.push({id, sp: l.sp, t: l.t, block: b.name, end: !!l.end, brk: !!l.brk});
	}
}
lines.sort((a, b) => a.id.localeCompare(b.id));

const clips = [];
let cur = null;
for (const l of lines) {
	if (!cur || l.brk || cur.sp !== l.sp || cur.end || cur.text.length + l.t.length > BUDGET) {
		cur = {n: clips.length + 1, sp: l.sp, ids: [], parts: [], text: ''};
		clips.push(cur);
	}
	cur.ids.push(l.id);
	cur.parts.push(l.t);
	cur.text = cur.parts.join(' ');
	if (l.end) cur = null;
}
for (const c of clips) {
	c.voice = VOICE[c.sp] ?? 'voice-00';
	c.file = `vo/clip_${c.ids[0]}.mp3`;
}
fs.writeFileSync(path.join(ROOT, 'script', 'lines.json'), JSON.stringify({lines}, null, 1));
fs.writeFileSync(path.join(ROOT, 'script', 'clips.json'), JSON.stringify(clips, null, 1));
say(`lines: ${lines.length}, clips: ${clips.length}, chars: ${lines.reduce((a, l) => a + l.t.length, 0)}`);
for (const c of clips) say(`  ${String(c.n).padStart(2, '0')} ${c.sp.padEnd(4)} ${String(c.text.length).padStart(4)}  ${c.ids[0]}–${c.ids[c.ids.length - 1]}  ${fs.existsSync(path.join(ROOT, 'public', c.file)) ? 'ok' : 'НЕТ ОЗВУЧКИ'}  ${c.file}`);
