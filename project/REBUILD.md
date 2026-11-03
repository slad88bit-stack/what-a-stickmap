# «Ты самый популярный человек на земле» — пересборка после потери воркспейса

Проект живёт в репозитории и коммитится каждый ход: песочница обнуляется между ходами.

## Готово
- `script/blocks.mjs` — 93 реплики (8 блоков), `script/lines.json`, `script/clips.json` (19 клипов).
- `public/vo/clip01…clip10`, `clip20`, `clip22` — озвучка (voice-00 рассказчик, 01 герой, 02 Майя, 03 мама).
  `clip20`/`clip22` — дословно прежние дубли финала, их текст в сценарии совпадает посимвольно.
- `src/story/shotsA.tsx` (S01–S21) и `shotsB.tsx` (S22–S41) — 43 сцены, `shots.tsx` их склеивает.
- `src/story/places.tsx` — телефон, толпа, коридор в толпе, мемы, письмо, микрофон, график отписок.
- `src/Thumb.tsx` — обложка (композиция `Thumb`).

## Осталось
1. Озвучить `clip11…clip16`, `clip18` (лимит TTS — 10 клипов на ход).
2. `node tools/build-timeline.mjs` → `node tools/check-plans.mjs` → `tools/storyboard.mjs Long`.
3. `node tools/make-sound.mjs` (звук на локации + эффекты, музыка не нужна).
4. Рендер: `LD_LIBRARY_PATH=/tmp/lib2 BROWSER_EXECUTABLE=/tmp/chromium RENDER_SCALE=1 node tools/render.mjs Long`
   (`/tmp/lib2` = распакованный `node_modules/@sparticuz/chromium/bin/al2023.tar.br` → `tar -xf /tmp/al2023.tar -C /tmp/lib`).
5. `node tools/check-video.mjs out/Long.mp4`, описание с таймкодами.

`src/story/timeline.json` сейчас — черновой (`tools/preview-timeline.mjs`, всем репликам по 96 кадров),
нужен только чтобы смотреть кадры до готовой озвучки.
