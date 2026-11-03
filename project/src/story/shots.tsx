import type {ShotDef} from '../kit/coverage';
import {SHOTS_A} from './shotsA';
import {SHOTS_B} from './shotsB';

/* Сцены разбиты на два файла, чтобы не держать в голове всё сразу.
   Правила те же: вход с края кадра, жест на слове, камера всё время едет,
   вжух на смене локации, новый кадр каждые 3–10 секунд (автопокрытие). */
export const SHOTS: ShotDef[] = [...SHOTS_A, ...SHOTS_B].sort((a, b) => a.at.localeCompare(b.at));
