// Builds src/story/timeline.json from the voice clips + the script.
// One mp3 holds several lines, so inside every clip the lines are placed by character
// share and then snapped to the nearest quiet moment — the pauses between sentences.
// node tools/build-timeline.mjs
import fs from 'node:fs';
import path from 'node:path';
import {FPS, ROOT, decodePcm, readJson, say} from './lib.mjs';

const clips = readJson('script/clips.json');
const lines = readJson('script/lines.json').lines;
const byId = new Map(lines.map((l) => [l.id, l]));
const envOf = (s) => {
	const per = 16000 / FPS;
	const n = Math.ceil(s.length / per);
	const e = [];
	let peak = 0;
	for (let i = 0; i < n; i++) {
		let a = 0;
		const st = Math.floor(i * per);
		const en = Math.min(s.length, Math.floor((i + 1) * per));
		for (let j = st; j < en; j++) a += (s[j] / 32768) ** 2;
		const rms = Math.sqrt(a / Math.max(1, en - st));
		e.push(rms);
		peak = Math.max(peak, rms);
	}
	return {e, peak};
};

let frame = Math.round(0.4 * FPS);
const out = [];
const warn = [];
for (const c of clips) {
	const file = path.join(ROOT, 'public', c.file);
	if (!fs.existsSync(file)) throw new Error(`missing ${c.file} (clip ${c.n})`);
	const s = decodePcm(file);
	const {e, peak} = envOf(s);
	const thr = peak * 0.06;
	let a0 = e.findIndex((v) => v > thr);
	let a1 = e.length - 1 - [...e].reverse().findIndex((v) => v > thr);
	if (a0 < 0) throw new Error(`clip ${c.n} is silent`);
	a0 = Math.max(0, a0 - 2);
	a1 = Math.min(e.length - 1, a1 + 3);
	const span = a1 - a0 + 1;
	// character share per line, measured without spaces
	const w = c.ids.map((id) => Math.max(4, byId.get(id).t.replace(/\s/g, '').length));
	const tw = w.reduce((a, b) => a + b, 0);
	const raw = [];
	let acc = 0;
	for (let i = 0; i < w.length; i++) {
		raw.push(a0 + Math.round((span * acc) / tw));
		acc += w[i];
	}
	raw.push(a1 + 1);
	// snap interior boundaries to the quietest frame nearby (a pause between sentences)
	const b = [raw[0]];
	for (let i = 1; i < raw.length - 1; i++) {
		const lo = Math.max(b[i - 1] + 5, raw[i] - 12);
		const hi = Math.min(raw[i + 1] - 5, raw[i] + 12);
		let best = raw[i];
		let bv = Infinity;
		for (let k = lo; k <= hi; k++) if (e[k] < bv) (bv = e[k]), (best = k);
		b.push(Math.max(b[i - 1] + 5, Math.min(best, hi)));
	}
	b.push(raw[raw.length - 1]);
	for (let i = 0; i < c.ids.length; i++) {
		const l = byId.get(c.ids[i]);
		const from = b[i];
		const to = b[i + 1];
		const dur = Math.max(6, to - from);
		const env = e.slice(from, Math.min(e.length, from + dur)).map((v) => Math.round(Math.min(1, v / (peak || 1)) * 100) / 100);
		out.push({id: l.id, sp: l.sp, text: l.t, file: c.file, trimStart: from, from: frame, dur, env});
		const cps = l.t.replace(/\s/g, '').length / (dur / FPS);
		if (cps < 7 || cps > 24) warn.push(`${l.id}: ${(dur / FPS).toFixed(1)} s for ${l.t.replace(/\s/g, '').length} letters (${cps.toFixed(1)}/s) — check the split`);
		const gap = Math.round((l.sp === 'N' ? 0.35 : 0.25) * FPS);
		frame += dur + gap;
	}
}
const total = frame + 2 * FPS;
fs.writeFileSync(path.join(ROOT, 'src', 'story', 'timeline.json'), JSON.stringify({fps: FPS, total, lines: out}));
say(`timeline: ${out.length} lines, ${(total / FPS / 60).toFixed(2)} min (${(total / FPS).toFixed(0)} s)`);
const bad = out.filter((l) => l.dur / FPS > 16);
for (const l of bad) say(`  LONG LINE: ${l.id} ${(l.dur / FPS).toFixed(1)} s — ${l.text.slice(0, 50)}`);
for (const w of warn.slice(0, 12)) say('  CHECK ' + w);
