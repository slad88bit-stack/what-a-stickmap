import React from 'react';
import {interpolate} from 'remotion';
import {Pose} from '../engine/Stickman';
import {env, gesture, idle, reach, walkTo} from '../kit/actions';
import {Actor, useShot, useSpeaking} from '../kit/core';
import type {ShotDef} from '../kit/coverage';
import {HeroBadge, Layer, Mirror, Rays, Sleeper, Stage, Svg, camOn, clamp, mixCam, usePush} from '../kit/kit';
import {Bedroom, Blanket, ClassroomEve, Corridor, Elevator, Entrance, Kitchen, KitchenTable, Lamp, NightStreet, SchoolYard, Shop} from '../kit/sets';
import {Callout, Split} from '../kit/graphics';
import {RuleCard} from '../kit/ui';
import {FONT} from '../kit/ui';
import {BigNum, CrowdBand, CrowdSea, Flashes, MemeGrid, Phone} from './places';
import {FL, FLB, badgeY} from './lib';

/* Входы всегда с края кадра, жест — на слове, камера всё время едет. */

/* 001–004: шесть сорок один, телефон дрожит на подушке */
const S01: React.FC = () => {
	const {f, gf} = useShot();
	const rise = env(f, 30, 999, 16, 1);
	const cam = usePush(camOn(1300, 700, 1.14), camOn(1180, 690, 1.3));
	return (
		<Stage cam={cam} bg="#12162e" light={{x: 66, y: 10, o: 0.34, night: true}} grain={0.06}>
			<Layer depth={1.7}>
				<Bedroom night f={gf} />
			</Layer>
			<Layer depth={1} opacity={1}>
				<Svg>
					<Sleeper x={1520} y={742} s={1.02} lift={rise * 26} talk={0} expr={f > 24 ? 'wide' : 'sleepy'} />
				</Svg>
			</Layer>
			<Layer depth={1.1}>
				<Blanket night f={gf} lift={rise * 22} />
			</Layer>
			<Layer depth={1.25}>
				<Svg>
					<Phone x={1120} y={660} s={0.52} f={f} kind="likes" value={4800000} glow={0.6 + 0.4 * Math.sin(f / 6)} />
					<Callout f={f} t0={6} t1={70} from={[1120, 470]} to={[700, 250]} text="6:41" c="#9fe8ff" size={30} align="center" />
					<Callout f={f} t0={78} t1={150} from={[1120, 470]} to={[700, 250]} text="200+ УВЕДОМЛЕНИЙ" c="#ff9ad0" size={24} align="center" />
					<HeroBadge x={1560} y={520} s={0.82} />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 005: «Мам! МАМ! Тут какая-то ошибка!» */
const S02: React.FC = () => {
	const {f, gf} = useShot();
	const sp = useSpeaking(gf);
	const cam = usePush(camOn(1080, 640, 1.2), camOn(1000, 620, 1.34));
	const shout = sp === 'HERO' ? 1 : 0.3;
	const hero: Pose = {...idle(gf, 3), armF: [96 * shout, 20], armB: [-40 * shout, 26], head: -8, lean: 6};
	const mw = walkTo(f, 6, 54, 2100, 1560, 2, 0.3);
	const mp: Pose = gesture('shrug', {...mw.pose, head: 6}, 0.7, f);
	return (
		<Stage cam={cam} bg="#1a2044" light={{x: 70, y: 10, o: 0.4, night: true}}>
			<Layer depth={1.7}>
				<Bedroom night f={gf} />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={860} floor={FLB} s={1.04} facing={1} faceTurn={0.7} look={[0.8, 0]} expr="wide" mouth={shout > 0.5 ? 'open' : 'line'} pose={hero} uid="h5" />
					<Actor who="mom" x={mw.x} floor={FLB} s={1.02} facing={-1} faceTurn={0.5} look={[-0.6, 0]} expr="worried" pose={mp} vx={mw.vx} bob={mw.bob} uid="m5" />
					<HeroBadge x={860} y={badgeY(1.04, FLB)} s={0.78} />
					<Callout f={f} t0={8} t1={110} from={[900, 620]} to={[1420, 330]} text="КАКАЯ-ТО ОШИБКА" c="#ffc94a" size={26} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 006–007: школа → город → мир */
const S03: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 620, 1.06), camOn(1080, 560, 1.22));
	const k1 = env(f, at('051'), at('061') - 4, 10, 10);
	const k2 = env(f, at('061') + 10, at('061') + 120, 12, 12);
	return (
		<Stage cam={cam} bg="#1b2348" light={{x: 24, y: 8, o: 0.34, night: true}}>
			<Layer depth={1.7}>
				<Bedroom night f={gf} />
			</Layer>
			<Layer depth={1.1}>
				<Svg>
					<Rays x={900} y={170} w={420} angle={18} c="#9fc4ff" o={0.14} />
					<CrowdSea f={f} rows={1} y={980} k={0.9 * Math.max(k1, k2)} looking={1} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={760} floor={FLB} s={1.02} facing={1} faceTurn={0.2} look={[0.2, -0.2]} expr="worried" pose={{...idle(gf, 5), armB: [-14, 20]}} uid="h6" />
					<HeroBadge x={760} y={badgeY(1.02, FLB)} s={0.78} />
					<Callout f={f} t0={at('051') + 4} t1={at('061') - 6} from={[820, 560]} to={[1360, 250]} text="ШКОЛА" c="#9ff0b0" size={28} align="center" />
					<Callout f={f} t0={at('061') + 6} t1={at('061') + 60} from={[820, 560]} to={[1360, 250]} text="ГОРОД" c="#9fe8ff" size={28} align="center" />
					<Callout f={f} t0={at('061') + 64} t1={at('061') + 140} from={[820, 560]} to={[1360, 250]} text="ВЕСЬ МИР" c="#ffc94a" size={28} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 008–009: у окна с остывшим кофе — популярность не про тебя */
const S04: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(900, 620, 1.12), camOn(980, 560, 1.3));
	return (
		<Stage cam={cam} bg="#1c2246" light={{x: 20, y: 10, o: 0.38, night: true}}>
			<Layer depth={1.7}>
				<Bedroom night f={gf} />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={860} floor={FLB} s={1.06} facing={-1} faceTurn={0.3} look={[-0.3, 0]} expr="sleepy" pose={{...idle(gf, 7), armF: [64, 74], head: 4}} uid="h8" />
					<HeroBadge x={860} y={badgeY(1.06, FLB)} s={0.8} />
					<g transform="translate(940,700)">
						<ellipse rx={26} ry={9} fill="#e9e2cc" />
						<rect x={-26} y={-34} width={52} height={30} rx={6} fill="#cfc7ae" />
					</g>
					<Callout f={f} t0={16} t1={140} from={[900, 600]} to={[1320, 300]} text="ПОПУЛЯРНОСТЬ — НЕ ПРО ТЕБЯ" c="#ffc94a" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 010–011: правило первое — дорисовали удобного (меловая доска) */
const S05: React.FC = () => {
	const {f, gf, at} = useShot();
	return (
		<>
			<RuleCard
				n="01"
				title="ПРАВИЛО ПЕРВОЕ"
				text="Любят не за поступок, а за то, что придумали."
				t={f - at('091') + 4}
				fix="дорисовали удобного человека"
				icon={
					<g>
						<circle cx={0} cy={-40} r={78} fill="none" stroke="#f4f1e6" strokeWidth={5} strokeDasharray="14 12" />
						<circle cx={0} cy={-40} r={46} fill="#0b0b0d" />
						<circle cx={-16} cy={-52} r={6} fill="#fff" />
						<circle cx={16} cy={-52} r={6} fill="#fff" />
						<path d="M-18,-16 q18,16 36,0" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />
						<path d="M88,-90 q60,-40 60,20" stroke="#ff6a5a" strokeWidth={6} fill="none" />
						<path d="M-88,-90 q-60,-40 -60,20" stroke="#ff6a5a" strokeWidth={6} fill="none" />
					</g>
				}
			/>
		</>
	);
};

/* 012–013: удобный улыбается, соглашается и никогда не говорит «нет» */
const S05b: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 640, 1.08), camOn(1000, 600, 1.2));
	const smile = env(f, at('111'), at('111') + 44, 10, 10);
	const yes = env(f, at('111') + 46, at('111') + 86, 10, 10);
	const no = env(f, at('111') + 88, at('121') + 30, 10, 12);
	return (
		<Stage cam={cam} bg="#1a2044" light={{x: 40, y: 10, o: 0.34, night: true}}>
			<Layer depth={1.5}>
				<Svg>
					<CrowdSea f={f} rows={2} y={1010} k={0.6} looking={1} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={960} floor={FL} s={1.04} facing={1} faceTurn={0.4} look={[0.2, 0]} expr="worried" pose={{...idle(gf, 12), armF: [14, 26]}} uid="h12" />
					<Actor who="friend" x={700} floor={FL} s={1} facing={1} faceTurn={0.5} look={[0.6, 0]} expr="normal" mouth={smile > 0.3 || yes > 0.3 ? 'smile' : 'line'} pose={{...idle(gf, 13), lean: 4, head: 6}} uid="cv1" />
					<Actor who="neighbor" x={1240} floor={FL} s={1} facing={-1} faceTurn={0.5} look={[-0.6, 0]} expr="normal" mouth={no > 0.4 ? 'line' : 'smile'} pose={{...idle(gf, 14), lean: -4, head: 4, armF: [40, 40]}} uid="cv2" />
					<HeroBadge x={960} y={badgeY(1.04)} s={0.76} />
					<Callout f={f} t0={at('111') + 2} t1={at('111') + 44} from={[700, 560]} to={[420, 300]} text="УЛЫБАЕТСЯ" c="#9ff0b0" size={24} align="center" />
					<Callout f={f} t0={at('111') + 46} t1={at('111') + 86} from={[1240, 560]} to={[1500, 300]} text="СОГЛАШАЕТСЯ" c="#9fe8ff" size={24} align="center" />
					<Callout f={f} t0={at('111') + 88} t1={at('121') + 40} from={[1240, 600]} to={[1450, 340]} text="НИКОГДА НЕ ГОВОРИТ «НЕТ»" c="#ff8a72" size={20} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 014–015: двадцать два человека и один телефон наготове */
const S06: React.FC = () => {
	const {f, gf, at} = useShot();
	const sp = useSpeaking(gf);
	const cam = usePush(camOn(1000, 640, 1.08), camOn(1120, 600, 1.24));
	const mv = walkTo(f, -4, 40, 2160, 1280, 4, 0.3);
	const mp: Pose = gesture('point', {...mv.pose, head: -4}, env(f, at('131') + 8, at('131') + 60, 8, 10), f);
	return (
		<Stage cam={cam} bg="#e9d9ae" light={{x: 22, y: 10, o: 0.36}}>
			<Layer depth={1.7}>
				<ClassroomEve />
			</Layer>
			<Layer depth={1.35}>
				<Svg>
					<CrowdSea f={f} rows={2} y={1000} k={0.95} looking={1} wave={0.2} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={780} floor={FL} s={1.04} facing={1} faceTurn={0.5} look={[0.7, 0]} expr={sp === 'MAYA' ? 'wide' : 'normal'} pose={{...idle(gf, 11), armB: [-10, 18]}} uid="h14" />
					<Actor who="maya" x={mv.x} floor={FL} s={1.02} facing={-1} faceTurn={0.6} look={[-0.8, 0]} expr="wide" mouth={sp === 'MAYA' ? undefined : 'line'} pose={mp} handF="point" vx={mv.vx} bob={mv.bob} uid="ma14" />
					<HeroBadge x={780} y={badgeY(1.04)} s={0.78} />
					<Callout f={f} t0={at('141') + 6} t1={at('141') + 90} from={[1180, 900]} to={[1420, 560]} text="22 ЧЕЛОВЕКА" c="#ffc94a" size={26} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 016–017: аватарка и пятёрка за молчание */
const S07: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 600, 1.1), camOn(960, 560, 1.22));
	return (
		<Stage cam={cam} bg="#16203f" light={{x: 40, y: 8, o: 0.34, night: true}}>
			<Layer depth={1}>
				<Svg>
					<Split
						f={f}
						a={{label: 'АВАТАРКА', num: 'КТО-ТО', color: '#9fe8ff', who: 'friend', expr: 'wide'}}
						b={{label: 'ПЯТЁРКА', num: '5', color: '#ffc94a', who: 'teacher', expr: 'normal'}}
					/>
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 018–019: «Я просто сидел» */
const S08: React.FC = () => {
	const {f, gf, at} = useShot();
	const sp = useSpeaking(gf);
	const cam = usePush(camOn(960, 600, 1.16), camOn(1000, 560, 1.3));
	const sit = env(f, at('171') - 10, at('171') + 40, 8, 8);
	return (
		<Stage cam={cam} bg="#e6d6ab" light={{x: 26, y: 10, o: 0.38}}>
			<Layer depth={1.7}>
				<Corridor f={gf} />
			</Layer>
			<Layer depth={1.2}>
				<Svg>
					<rect x={620} y={820} width={700} height={28} rx={10} fill="#8a6a44" />
					<rect x={660} y={848} width={22} height={60} fill="#6f5232" />
					<rect x={1250} y={848} width={22} height={60} fill="#6f5232" />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={960} floor={FL} seat={800} s={1.04} facing={-1} faceTurn={0.4} look={[-0.6, 0]} expr={sp === 'HERO' ? 'normal' : 'worried'} pose={{...idle(gf, 13), armF: [40, 60], legB: [86, 80], legF: [92, 88], lean: -6 + sit * 2}} uid="h18" />
					<HeroBadge x={960} y={badgeY(1.04) - 60} s={0.74} />
					<Callout f={f} t0={at('181') + 4} t1={at('181') + 80} from={[1000, 700]} to={[1420, 400]} text="ЛУЧШИЙ УЧЕНИК" c="#9ff0b0" size={24} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 020–022: мемы, смех, потом тишина */
const S09: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 600, 1.06), camOn(960, 560, 1.18));
	const laugh = env(f, at('191'), at('211') - 6, 10, 14);
	const stop = env(f, at('211') + 20, 999, 14, 1);
	return (
		<Stage cam={cam} bg="#151b38" light={{x: 40, y: 10, o: 0.3, night: true}} grain={0.05}>
			<Layer depth={1.5}>
				<Svg>
					<MemeGrid f={f} x={1100} y={470} s={0.86} cols={3} rows={2} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={420} floor={FL} s={1.02} facing={1} faceTurn={0.6} look={[0.9, -0.1]} expr={stop > 0.4 ? 'worried' : 'wide'} mouth={laugh > 0.4 && stop < 0.3 ? 'smile' : 'line'} pose={{...idle(gf, 15), head: -2 + laugh * 4, armF: [30 + laugh * 20, 40]}} uid="h20" />
					<HeroBadge x={420} y={badgeY(1.02)} s={0.74} />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 023–024: восемьдесят четыре миллиона */
const S10: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 560, 1.08), camOn(960, 520, 1.2));
	return (
		<Stage cam={cam} bg="#0f1430" light={{x: 50, y: 6, o: 0.34, night: true}} grain={0.06}>
			<Layer depth={1.6}>
				<Svg>
					<CrowdSea f={f} rows={2} y={1010} k={0.7} looking={1} />
				</Svg>
			</Layer>
			<Layer depth={1.25}>
				<Svg>
					<BigNum f={f} x={960} y={430} from={4800000} to={84000000} t0={at('221') + 8} dur={at('231') - at('221') + 20} label="СМОТРЯТ НА ТЕБЯ" s={0.9} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={960} floor={FL} s={1} facing={1} faceTurn={0.25} look={[0.1, -0.6]} expr="wide" pose={{...idle(gf, 17), head: -10, armB: [-12, 20]}} uid="h23" />
					<HeroBadge x={960} y={badgeY(1)} s={0.76} />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 025–026: коридор, все смотрят и никто не говорит */
const S11: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 600, 1.12), camOn(1020, 560, 1.28));
	return (
		<Stage cam={cam} bg="#1d2547" light={{x: 30, y: 8, o: 0.34, night: true}}>
			<Layer depth={1.7}>
				<Corridor f={gf} />
			</Layer>
			<Layer depth={1.3}>
				<Svg>
					<CrowdSea f={f} rows={2} y={980} k={0.95} looking={1} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={880} floor={FL} s={1.04} facing={-1} faceTurn={0.2} look={[0, 0]} expr="worried" pose={{...idle(gf, 19), armF: [14, 26], lean: -2}} uid="h25" />
					<HeroBadge x={880} y={badgeY(1.04)} s={0.76} />
					<Callout f={f} t0={30} t1={150} from={[1300, 800]} to={[1420, 300]} text="ВСЕ СМОТРЯТ" c="#9fe8ff" size={24} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 027–028: десять секунд тишины */
const S12: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(900, 640, 1.1), camOn(940, 600, 1.24));
	const t = Math.max(0, Math.min(10, Math.floor((f - at('261')) / 30)));
	return (
		<Stage cam={cam} bg="#131a36" light={{x: 34, y: 10, o: 0.3, night: true}}>
			<Layer depth={1.7}>
				<Kitchen night />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={900} floor={FL} seat={760} s={1.02} facing={1} faceTurn={0.3} look={[0, 0.1]} expr="sleepy" pose={{...idle(gf, 21), armF: [40, 64], legB: [86, 80], legF: [92, 88]}} uid="h27" />
					<HeroBadge x={900} y={badgeY(1.02) - 40} s={0.74} />
					<text x={1400} y={430} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={120} fill="#5b6ba8">
						{t}
					</text>
					<Phone x={1180} y={790} s={0.34} f={f} kind="likes" value={84000000} glow={0.4} />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 029–033: зеркало и сорок повторов */
const S13: React.FC = () => {
	const {f, gf, at} = useShot();
	const rep = Math.min(40, 1 + Math.floor((f - at('281')) / 4));
	const cam = usePush(camOn(980, 620, 1.06), camOn(1120, 580, 1.2));
	const hand = env(f, at('301') - 6, at('301') + 70, 10, 12);
	return (
		<Stage cam={cam} bg="#242c52" light={{x: 28, y: 10, o: 0.44}}>
			<Layer depth={1}>
				<Svg>
					<rect x={1020} y={190} width={760} height={760} rx={20} fill="#6b5a48" />
					<rect x={1046} y={216} width={708} height={708} rx={12} fill="#8fa6e0" opacity={0.4} />
					<Mirror x={1046} y={216} w={708} h={708} id="mir13">
						{Array.from({length: Math.min(4, 2 + Math.floor(f / 26))}).map((_, i) => (
							<g key={i} opacity={i === 0 ? 1 : 0.6 - i * 0.15}>
								<Actor who="hero" x={1300 + 86 * i} floor={880 - 116 * i} s={1.04 * Math.pow(0.63, i)} facing={-1} faceTurn={0} look={[0, 0]} expr="normal" mouth="line" pose={{...idle(gf, 25 + i), armF: hand > 0.4 ? [150, 30] : [6, 18]}} uid={'mr13' + i} shadow={false} />
							</g>
						))}
					</Mirror>
					<Actor who="hero" x={620} floor={880} s={1.04} facing={1} faceTurn={0.8} look={[0.9, 0]} expr={f > at('311') ? 'worried' : 'normal'} pose={{...idle(gf, 29), armF: hand > 0.4 ? [150, 30] : [6, 18], head: -2}} uid="h29" />
					<HeroBadge x={620} y={badgeY(1.04, 880)} s={0.76} />
					<text x={1400} y={1000} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={52} fill="#dfe6ff">
						×{rep} РАЗ
					</text>
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 034: «Это не я. Это не я, слышишь?» */
const S14: React.FC = () => {
	const {f, gf} = useShot();
	const sp = useSpeaking(gf);
	const cam = usePush(camOn(820, 620, 1.24), camOn(880, 580, 1.4));
	return (
		<Stage cam={cam} bg="#1b2246" light={{x: 24, y: 10, o: 0.4, night: true}}>
			<Layer depth={1.6}>
				<Svg>
					<rect x={1020} y={190} className="mirror" width={760} height={760} rx={20} fill="#5c4d3e" />
					<rect x={1046} y={216} width={708} height={708} rx={12} fill="#7f95cc" opacity={0.35} />
					<g opacity={0.5}>
						<Actor who="hero" x={1300} floor={880} s={1.04} facing={-1} faceTurn={0} look={[0, 0]} expr="worried" mouth="open" pose={{...idle(gf, 31), armF: [70, 40]}} uid="mr34" shadow={false} />
					</g>
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={720} floor={880} s={1.1} facing={1} faceTurn={0.9} look={[0.9, 0]} expr="angry" mouth={sp === 'HERO' ? 'open' : 'line'} pose={gesture('fist', {...idle(gf, 33), lean: 8, head: -4}, sp === 'HERO' ? 1 : 0.4, f)} uid="h34" />
					<HeroBadge x={720} y={badgeY(1.1, 880)} s={0.8} />
					<Callout f={f} t0={10} t1={140} from={[780, 520]} to={[400, 260]} text="ЭТО НЕ Я" c="#ff8a72" size={30} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 035–038: у популярности нет ушей — толпа повторяет услышанное */
const S15: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 640, 1.06, {farBlur: 5}), camOn(1040, 600, 1.18, {farBlur: 5}));
	const echo = ['он что-то сказал', 'он что-то скрывает', 'он сказал то, что мне нравится', 'он сказал то, что я и так думал'];
	return (
		<Stage cam={cam} bg="#121736" light={{x: 34, y: 8, o: 0.3, night: true}} grain={0.05}>
			<Layer depth={1.6}>
				<Svg>
					<CrowdBand f={f} y={1180} rows={4} n={16} step={140} x0={-200} sc={1.02} k={0.92} seed={5} />
					{echo.map((t, i) => {
						const p = interpolate(f, [at('351') + i * 22, at('351') + i * 22 + 14], [0, 1], clamp);
						return (
							<g key={i} opacity={0.35 + 0.6 * p} transform={`translate(${300 + i * 380},${250 + (i % 2) * 170}) scale(${0.8 + 0.2 * p}) rotate(${(i % 2 ? 3 : -3)})`}>
								<rect x={-190} y={-56} width={380} height={112} rx={24} fill="#1b2450" stroke="#3b4880" strokeWidth={3} />
								<text x={0} y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={22} fill="#cfd8ff">
									{t}
								</text>
							</g>
						);
					})}
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={960} floor={1120} s={1.06} facing={1} faceTurn={0.3} look={[0.2, 0.2]} expr="sad" mouth={f < at('371') ? 'open' : 'line'} pose={{...idle(gf, 35), armF: [60, 40], head: -2}} uid="h35b" />
					<HeroBadge x={960} y={badgeY(1.06, 1120)} s={0.74} />
					<Callout f={f} t0={at('371')} t1={at('371') + 90} from={[1000, 830]} to={[1400, 520]} text="ЭХО ГРОМЧЕ ГОЛОСА" c="#ff8a72" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 039–040: правило второе (меловая доска) */
const S15b: React.FC = () => {
	const {f, at} = useShot();
	return (
		<RuleCard
			n="02"
			title="ПРАВИЛО ВТОРОЕ"
			text="Толпа повторяет не слова, а то, что услышала."
			t={f - at('381') + 4}
			fix="эхо громче голоса"
			icon={
				<g>
					<circle cx={-120} cy={-40} r={40} fill="#0b0b0d" />
					<path d="M-160,60 q40,-90 80,0 z" fill="#f2b21c" />
					<circle cx={60} cy={-40} r={30} fill="#0b0b0d" opacity={0.8} />
					<circle cx={190} cy={-40} r={22} fill="#0b0b0d" opacity={0.55} />
					<circle cx={290} cy={-40} r={16} fill="#0b0b0d" opacity={0.35} />
					<path d="M-40,-140 q160,-60 320,0" stroke="#9ff0b0" strokeWidth={6} fill="none" strokeDasharray="12 10" />
				</g>
			}
		/>
	);
};

/* 041–042: дома всегда кто-то есть */
const S16: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 620, 1.08), camOn(1040, 580, 1.2));
	return (
		<Stage cam={cam} bg="#1a2040" light={{x: 60, y: 10, o: 0.36, night: true}}>
			<Layer depth={1.7}>
				<Kitchen night />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={760} floor={FL} s={1.04} facing={1} faceTurn={0.3} look={[0.6, 0]} expr="sleepy" pose={{...idle(gf, 37), armF: [18, 30]}} uid="h41" />
					{[1150, 1350, 1560].map((x, i) => (
						<g key={i}>
							<Actor who="friend" x={x} floor={FL} s={0.98} facing={-1} faceTurn={0.4} look={[-0.6, 0]} expr="wide" mouth="line" pose={{...idle(gf, 40 + i), armF: [70, 60]}} uid={'g' + i} />
							<rect x={x + 34} y={560} width={44} height={72} rx={8} fill="#9fe8ff" opacity={0.8} />
						</g>
					))}
					<HeroBadge x={760} y={badgeY(1.04)} s={0.76} />
					<Callout f={f} t0={30} t1={140} from={[1300, 620]} to={[1300, 300]} text="ЖДУТ ФОТО" c="#ff9ad0" size={24} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 043: старая куртка в мусорном ведре */
const S17: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(900, 780, 1.2), camOn(860, 740, 1.42));
	return (
		<Stage cam={cam} bg="#171d3b" light={{x: 30, y: 10, o: 0.26, night: true}}>
			<Layer depth={1.7}>
				<Kitchen night />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<g transform="translate(900,860)">
						<path d="M-140,0 L-110,-260 L110,-260 L140,0 Z" fill="#3a4260" stroke="#5a658c" strokeWidth={5} />
						<ellipse cx={0} cy={-260} rx={112} ry={26} fill="#242c48" />
						<g transform="translate(10,-286) rotate(-8)">
							<path d="M-64,40 q-10,-70 30,-84 q40,-14 62,10 q22,26 6,74 z" fill="#f2b21c" opacity={0.9} />
							<path d="M-30,40 q-6,-46 18,-56 q24,-10 38,8" stroke="#c98f14" strokeWidth={6} fill="none" />
						</g>
					</g>
					<Callout f={f} t0={30} t1={160} from={[980, 640]} to={[1360, 380]} text="НЕ ПОДХОДИТ ОБРАЗУ" c="#ff8a72" size={24} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 044: соседка просит автограф */
const S18: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(980, 620, 1.1), camOn(1040, 580, 1.24));
	return (
		<Stage cam={cam} bg="#20263f" light={{x: 70, y: 10, o: 0.3, night: true}}>
			<Layer depth={1.8}>
				<Entrance />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={800} floor={FL} s={1.04} facing={1} faceTurn={0.3} look={[0.5, 0]} expr="sleepy" pose={{...idle(gf, 43), armF: [40, 40]}} uid="h44" />
					<Actor who="neighbor" x={1180} floor={FL} s={1} facing={-1} faceTurn={0.5} look={[-0.7, 0]} expr="wide" mouth="open" pose={gesture('point', {...idle(gf, 44)}, 0.7, f)} handF="point" uid="nb44" />
					<HeroBadge x={800} y={badgeY(1.04)} s={0.76} />
					<Callout f={f} t0={26} t1={150} from={[1240, 640]} to={[1440, 360]} text="АВТОГРАФ" c="#9ff0b0" size={24} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 045–046: балкон и три телефона внизу */
const S19: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 560, 1.06), camOn(960, 640, 1.2));
	return (
		<Stage cam={cam} bg="#0d1230" light={{x: 50, y: 6, o: 0.24, night: true}} grain={0.07}>
			<Layer depth={1.8}>
				<NightStreet f={gf} />
			</Layer>
			<Layer depth={1.1}>
				<Svg>
					<rect x={-200} y={820} width={2400} height={40} fill="#2b3560" />
					<CrowdSea f={f} rows={1} y={1070} k={0.8} looking={1} />
					{[820, 980, 1160].map((x, i) => (
						<rect key={i} x={x} y={900} width={26} height={44} rx={5} fill="#9fe8ff" opacity={0.85} />
					))}
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={900} floor={860} s={1.04} facing={1} faceTurn={0.2} look={[0.1, 0.6]} expr="sad" pose={{...idle(gf, 45), armF: [30, 70], lean: -6}} uid="h45" />
					<HeroBadge x={900} y={badgeY(1.04, 860)} s={0.76} />
					<Callout f={f} t0={30} t1={140} from={[1000, 900]} to={[1360, 700]} text="ТРИ ТЕЛЕФОНА" c="#9fe8ff" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 047–049: звонок старого друга */
const S20: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(900, 620, 1.14), camOn(940, 580, 1.28));
	const pick = env(f, at('461') + 30, at('461') + 60, 8, 8);
	return (
		<Stage cam={cam} bg="#141a34" light={{x: 24, y: 10, o: 0.3, night: true}}>
			<Layer depth={1.7}>
				<Kitchen night />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={820} floor={FL} s={1.04} facing={1} faceTurn={0.4} look={[0.6, 0]} expr="worried" pose={{...idle(gf, 47), armF: [40 + pick * 30, 60 + pick * 20], head: 4}} uid="h47" />
					<HeroBadge x={820} y={badgeY(1.04)} s={0.76} />
					<g transform="translate(1120,720)">
						<rect x={-70} y={-120} width={140} height={220} rx={22} fill="#1b2240" stroke="#4a5896" strokeWidth={5} />
						<rect x={-56} y={-104} width={112} height={180} rx={12} fill="#25305c" />
						<circle cx={0} cy={-60} r={26} fill="#3aa37a" opacity={0.9} />
						<text x={0} y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={22} fill="#c9d3ff">
							ЗВОНОК
						</text>
						<circle cx={0} cy={96} r={12} fill={pick > 0.5 ? '#3aa37a' : '#ff5a5a'} />
					</g>
					<Callout f={f} t0={at('471') - 10} t1={at('481') + 20} from={[1200, 640]} to={[1400, 320]} text="«ХОТЕЛ, КАК РАНЬШЕ»" c="#9ff0b0" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 050–051: тысяча знакомых и ни одного, кому позвонить */
const S21: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 600, 1.02), camOn(960, 560, 1.16));
	return (
		<Stage cam={cam} bg="#101634" light={{x: 60, y: 8, o: 0.24, night: true}} grain={0.07}>
			<Layer depth={1.8}>
				<Svg>
					<rect x={-200} y={-200} width={2400} height={1400} fill="#0c1128" />
					{Array.from({length: 40}).map((_, i) => {
						const x = -100 + (i % 8) * 280;
						const y = 300 + Math.floor(i / 8) * 200;
						return (
							<g key={i} opacity={0.18 + 0.1 * Math.sin(f / 20 + i)}>
								<circle cx={x} cy={y} r={54} fill="#1b2649" />
								<path d={`M${x - 66},${y + 110} q66,-120 132,0 z`} fill="#1b2649" />
							</g>
						);
					})}
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={960} floor={FL} s={1.06} facing={1} faceTurn={0.2} look={[0, 0.2]} expr="sad" pose={{...idle(gf, 51), armF: [10, 22], armB: [-10, 22], head: -6}} uid="h50" />
					<HeroBadge x={960} y={badgeY(1.06)} s={0.8} />
					<Callout f={f} t0={20} t1={150} from={[1020, 600]} to={[1400, 340]} text="1000 ЗНАКОМЫХ" c="#9fe8ff" size={24} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};


/* 322–326: возвращение — хлеб в магазине и двенадцать камер */
const S42: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(980, 640, 1.12), camOn(1040, 600, 1.28));
	return (
		<Stage cam={cam} bg="#20304a" light={{x: 28, y: 10, o: 0.3, night: true}} grain={0.05}>
			<Layer depth={1.7}>
				<Shop f={gf} />
			</Layer>
			<Layer depth={1.35}>
				<Svg>
					<CrowdBand f={f} y={1045} rows={2} n={11} step={165} x0={-120} sc={1.06} k={0.8} phones seed={4} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={880} floor={FL} s={1.04} facing={-1} faceTurn={0.25} look={[0, 0]} expr="worried" pose={{...idle(gf, 322), armF: [30, 50]}} uid="h322" />
					<HeroBadge x={880} y={badgeY(1.04)} s={0.76} />
					<Callout f={f} t0={20} t1={160} from={[1150, 640]} to={[1350, 330]} text="ДВЕНАДЦАТЬ С КАМЕРАМИ" c="#9fe8ff" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 327: в школе теперь здороваются телефоном */
const S43: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 620, 1.1), camOn(1010, 580, 1.26));
	return (
		<Stage cam={cam} bg="#1d2547" light={{x: 30, y: 8, o: 0.32, night: true}}>
			<Layer depth={1.7}>
				<Corridor f={gf} />
			</Layer>
			<Layer depth={1.2}>
				<Svg>
					<CrowdBand f={f} y={1045} rows={2} n={10} step={180} x0={20} sc={1.04} k={0.78} phones seed={9} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={820} floor={FL} s={1.02} facing={1} faceTurn={0.4} look={[0.6, 0]} expr="sad" pose={{...idle(gf, 327), head: 6}} uid="h327" />
					<HeroBadge x={820} y={badgeY(1.02)} s={0.74} />
					<Callout f={f} t0={10} t1={110} from={[1120, 700]} to={[1340, 420]} text="ВМЕСТО «ПРИВЕТ»" c="#ffc94a" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 328–330: старые видео — год назад тебя никто не сохранил */
const S44: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(920, 620, 1.14), camOn(990, 580, 1.3));
	return (
		<Stage cam={cam} bg="#131a36" light={{x: 34, y: 10, o: 0.3, night: true}} grain={0.05}>
			<Layer depth={1.8}>
				<Bedroom night f={gf} />
			</Layer>
			<Layer depth={1.2}>
				<Svg>
					<Phone x={1180} y={620} s={0.46} f={f} kind="post" glow={0.4} />
					<text x={470} y={790} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill="#9fe8ff" opacity={0.9}>
						ВИДЕО ГОД НАЗАД
					</text>
					<text x={470} y={836} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={28} fill="#8b98cc" opacity={0.9}>
						0 СОХРАНЕНИЙ
					</text>
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={820} floor={FL} s={1.04} facing={1} faceTurn={0.35} look={[0.8, 0]} expr="sad" pose={{...idle(gf, 328), armF: [60, 20], head: 4}} uid="h328" />
					<HeroBadge x={820} y={badgeY(1.04)} s={0.74} />
				</Svg>
			</Layer>
		</Stage>
	);
};

export const SHOTS_A: ShotDef[] = [
	{at: '001', C: S01},
	{at: '041', C: S02},
	{at: '051', C: S03},
	{at: '071', C: S04},
	{at: '091', C: S05},
	{at: '111', C: S05b},
	{at: '131', C: S06},
	{at: '151', C: S07},
	{at: '171', C: S08},
	{at: '191', C: S09},
	{at: '221', C: S10},
	{at: '241', C: S11},
	{at: '261', C: S12},
	{at: '281', C: S13},
	{at: '322', C: S42, whip: true},
	{at: '327', C: S43},
	{at: '328', C: S44},
	{at: '331', C: S14},
	{at: '341', C: S15},
	{at: '381', C: S15b},
	{at: '401', C: S16},
	{at: '421', C: S17},
	{at: '431', C: S18},
	{at: '441', C: S19},
	{at: '461', C: S20},
	{at: '491', C: S21},
];
