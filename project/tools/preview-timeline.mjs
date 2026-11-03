// ЧЕРНОВОЙ таймлайн для проверки кадров, пока нет всей озвучки:
// каждой реплике даётся фиксированная длина, звук не читается.
// node tools/preview-timeline.mjs [frames=96]
import fs from 'node:fs';
import path from 'node:path';
import {FPS, ROOT, readJson, say} from './lib.mjs';

const dur = Number(process.argv[2] ?? 96);
const lines = readJson('script/lines.json').lines;
const clips = readJson('script/clips.json');
const fileOf = new Map();
for (const c of clips) for (const id of c.ids) fileOf.set(id, c.file);
let frame = 12;
const out = lines.map((l) => {
	const env = Array.from({length: dur}, (_, i) => (i > 4 && i < dur - 6 ? 0.6 : 0.02));
	const o = {id: l.id, sp: l.sp, text: l.t, file: fileOf.get(l.id), trimStart: 0, from: frame, dur, env};
	frame += dur + (l.sp === 'N' ? 10 : 8);
	return o;
});
fs.writeFileSync(path.join(ROOT, 'src', 'story', 'timeline.json'), JSON.stringify({fps: FPS, total: frame + 60, lines: out}));
say(`preview timeline: ${out.length} lines, ${((frame + 60) / FPS / 60).toFixed(2)} min`);
