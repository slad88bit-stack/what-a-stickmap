# Проект «Ты самый популярный человек на земле» — состояние

Воркспейс-песочница обнулилась между ходами: из готового проекта уцелели только
два голосовых файла, всё остальное (сценарий, 43 сцены, таймлайн, звук) пришлось
восстанавливать. Чтобы это не повторилось, проект живёт **внутри git-репозитория**
и коммитится после каждого хода.

## Что в репозитории
- `project/` — шаблон скилла (Remotion), `tools/` — скрипты скилла.
- Готовые артефакты рендера складывать в `project/out/` (в git не попадает).

## Порядок сборки
1. `npm install` (в `project/`).
2. Сценарий → `tools/build-lines.mjs` → `public/vo/clipNN.mp3` (озвучка).
3. `tools/build-timeline.mjs` → `tools/check-plans.mjs`.
4. `tools/storyboard.mjs Long` — глазами по кадрам.
5. `tools/make-sound.mjs` → `public/sfx/bed.wav`.
6. `tools/render.mjs Long` → `tools/check-video.mjs out/Long.mp4`.

Запуск рендера в песочнице:
```
LD_LIBRARY_PATH=/tmp/lib BROWSER_EXECUTABLE=/tmp/chromium RENDER_SCALE=1 node tools/render.mjs Long
```
(`/tmp/chromium` + `/tmp/lib` пересоздаются командой:
`node -e "require('@sparticuz/chromium').executablePath().then(console.log)"`)
