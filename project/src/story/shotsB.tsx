import React from 'react';
import {interpolate} from 'remotion';
import {Pose} from '../engine/Stickman';
import {env, gesture, idle, reach, walkTo} from '../kit/actions';
import {Actor, useShot, useSpeaking} from '../kit/core';
import type {ShotDef} from '../kit/coverage';
import {HeroBadge, Layer, Mirror, Stage, Svg, camOn, clamp, mixCam, usePush} from '../kit/kit';
import {Bedroom, Corridor, Entrance, HallBack, Kitchen, KitchenTable, NightStreet} from '../kit/sets';
import {Callout, Split} from '../kit/graphics';
import {FONT} from '../kit/ui';
import {BigNum, CrowdBand, CrowdSea, DownGraph, Flashes, Letter, Mic, Phone} from './places';
import {FL, FLH, badgeY} from './lib';

/* 052–053: двенадцать тысяч мест — самый важный вечер */
const S22: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 560, 1.04), camOn(960, 520, 1.16));
	return (
		<Stage cam={cam} bg="#140e26" light={{x: 20, y: 8, o: 0.28, night: true}} grain={0.05}>
			<Layer depth={1.7}>
				<HallBack f={gf} smoke={0.25} disco={0.4} />
			</Layer>
			<Layer depth={1.3}>
				<Svg>
					<CrowdSea f={f} rows={2} y={1040} k={0.75} looking={0} />
					<BigNum f={f} x={960} y={400} from={0} to={12000} t0={30} dur={70} label="МЕСТ В ЗАЛЕ" s={0.8} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={470} floor={FL} s={0.98} facing={1} faceTurn={0.4} look={[0.7, 0]} expr="worried" pose={{...idle(gf, 52), armF: [20, 30]}} uid="h52" />
					<HeroBadge x={470} y={badgeY(0.98)} s={0.72} />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 054–056: двенадцать тысяч кричат — и сказать нечего */
const S23: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 600, 1.06), camOn(1040, 560, 1.22));
	const wv = 0.8;
	return (
		<Stage cam={cam} bg="#1a1030" light={{x: 30, y: 10, o: 0.26, night: true}} grain={0.05}>
			<Layer depth={1.8}>
				<HallBack f={gf} smoke={0.5} disco={1} />
			</Layer>
			<Layer depth={1.4}>
				<Svg>
					<CrowdSea f={f} rows={3} y={1000} wave={wv} looking={1} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={940} floor={FLH + 60} s={1.06} facing={1} faceTurn={0.3} look={[0.2, 0]} expr="worried" pose={{...idle(gf, 54), armF: [46, 34]}} uid="h54" />
					<HeroBadge x={940} y={badgeY(1.06, FLH + 60)} s={0.78} />
					<Mic x={1090} y={600} s={0.66} rot={-10} glow={0.8} />
					<Flashes f={f} x={1420} y={600} spread={760} n={5} k={0.8} />
					<Callout f={f} t0={at('056')} t1={at('056') + 80} from={[1000, 520]} to={[700, 240]} text="СКАЗАТЬ НЕЧЕГО" c="#ff8a72" size={26} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 057: «Я не спою ни одной песни…» */
const S24: React.FC = () => {
	const {f, gf} = useShot();
	const sp = useSpeaking(gf);
	const cam = usePush(camOn(940, 600, 1.24), camOn(1000, 570, 1.4));
	return (
		<Stage cam={cam} bg="#1b1130" light={{x: 24, y: 10, o: 0.28, night: true}} grain={0.05}>
			<Layer depth={1.8}>
				<HallBack f={gf} smoke={0.45} disco={0.8} />
			</Layer>
			<Layer depth={1.3}>
				<Svg>
					<CrowdSea f={f} rows={2} y={1030} k={0.9} looking={-1} wave={0.4} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={780} floor={FLH + 60} s={1.1} facing={1} faceTurn={0.6} look={[0.8, 0]} expr="angry" mouth={sp === 'HERO' ? 'open' : 'line'} pose={{...idle(gf, 57), armF: [70, 40], lean: 4}} uid="h57" />
					<HeroBadge x={780} y={badgeY(1.1, FLH + 60)} s={0.8} />
					<Mic x={940} y={590} s={0.7} rot={-14} glow={1} />
					<Callout f={f} t0={24} t1={150} from={[1180, 940]} to={[1420, 560]} text="ДЕВОЧКА У БАРЬЕРА" c="#9ff0b0" size={22} align="center" />
				</Svg>
			</Layer>
			<Layer depth={0.9}>
				<Svg>
					<Actor who="maya" x={1180} floor={1000} s={0.72} facing={-1} faceTurn={0.3} look={[-0.4, -0.6]} expr="sad" mouth="line" pose={{...idle(gf, 58), head: 8, lean: -8}} uid="ma57" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 058–059: охрана хватает за плечо — «Можно» */
const S25: React.FC = () => {
	const {f, gf, at} = useShot();
	const sp = useSpeaking(gf);
	const grab = env(f, at('058') + 4, at('059') + 4, 8, 8);
	const cam = usePush(camOn(900, 580, 1.2), camOn(960, 560, 1.36));
	return (
		<Stage cam={cam} bg="#160f28" light={{x: 30, y: 10, o: 0.24, night: true}} grain={0.06}>
			<Layer depth={1.8}>
				<HallBack f={gf} smoke={0.4} disco={0.6} />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={840} floor={FLH + 60} s={1.08} facing={1} faceTurn={0.5} look={[0.6, 0]} expr={sp === 'HERO' ? 'angry' : 'wide'} mouth={sp === 'HERO' ? 'open' : 'line'} pose={{...idle(gf, 59), lean: 3 - grab * 2, head: -3}} uid="h59" />
					<Actor who="guard" x={1080} floor={FLH + 60} s={1.08} facing={-1} faceTurn={0.4} look={[-0.8, 0]} expr="angry" mouth="open" pose={reach({...idle(gf, 60), lean: 4}, 'F', [-96, -30], grab)} uid="gd59" />
					<HeroBadge x={840} y={badgeY(1.08, FLH + 60)} s={0.78} />
					<Callout f={f} t0={at('058') + 6} t1={at('058') + 70} from={[1120, 600]} to={[1380, 330]} text="НЕЛЬЗЯ, ЭФИР" c="#ff8a72" size={24} align="center" />
					<Mic x={700} y={600} s={0.6} rot={-6} glow={sp === 'HERO' ? 1 : 0.5} />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 060–061: двенадцать тысяч голов поворачиваются */
const S26: React.FC = () => {
	const {f, gf} = useShot();
	const turn = interpolate(f, [10, 40], [0, 1], clamp);
	const cam = usePush(camOn(960, 700, 1.02, {farBlur: 6}), camOn(1040, 720, 1.16, {farBlur: 6}));
	return (
		<Stage cam={cam} bg="#140e28" light={{x: 30, y: 10, o: 0.28, night: true}} grain={0.05}>
			<Layer depth={2}>
				<HallBack f={gf} smoke={0.35} disco={0.5} />
			</Layer>
			<Layer depth={1.55}>
				<Svg>
					<CrowdBand f={f} y={1200} rows={4} n={16} step={140} x0={-200} sc={0.92} k={0.95} seed={3} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={960} floor={1120} s={1.04} facing={1} faceTurn={0.3} look={[0.2, 0.2]} expr="wide" mouth="line" pose={{...idle(gf, 61), armF: [46, 34], head: -4}} uid="h60" />
					<HeroBadge x={960} y={badgeY(1.04, 1120)} s={0.74} />
				</Svg>
			</Layer>
			<Layer depth={0.7}>
				<Svg>
					<CrowdBand f={f} y={1420} rows={3} n={14} step={196} x0={-260} sc={1.66} seed={9} phones />
					<Callout f={f} t0={16} t1={140} from={[1000, 980]} to={[520, 560]} text={`12 000 ГОЛОВ · ${Math.round(turn * 12000).toLocaleString('ru-RU')}`} c="#ffc94a" size={24} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 062–064: толпа расступается коридором */
const S27: React.FC = () => {
	const {f, gf, at} = useShot();
	const gap = interpolate(f, [at('062') - 10, at('062') + 80], [0, 300], clamp);
	const gk = interpolate(f, [at('062') + 40, at('063') + 40], [0, 1], clamp);
	const cam = usePush(camOn(940, 700, 1.06, {farBlur: 5}), camOn(1020, 740, 1.18, {farBlur: 5}));
	return (
		<Stage cam={cam} bg="#140e28" light={{x: 30, y: 10, o: 0.3, night: true}} grain={0.05}>
			<Layer depth={2}>
				<HallBack f={gf} smoke={0.35} disco={0.5} />
			</Layer>
			<Layer depth={1.55}>
				<Svg>
					<CrowdBand f={f} y={1200} rows={4} n={16} step={140} x0={-200} sc={0.92} k={0.95} gap={gap * 0.9} seed={3} />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={1010} floor={1120} s={1.06} facing={1} faceTurn={0.4} look={[0.4, 0]} expr="normal" pose={{...idle(gf, 62), armF: [56, 44], head: -4}} uid="h62" />
					<HeroBadge x={1010} y={badgeY(1.06, 1120)} s={0.74} />
				</Svg>
			</Layer>
			<Layer depth={0.7}>
				<Svg>
					<g opacity={gk}>
						<Actor who="maya" x={1330 - 150 * gk} floor={1230 + 40 * gk} s={0.9 + 0.26 * gk} facing={-1} faceTurn={0.25} look={[-0.5, 0]} expr="wide" mouth="line" pose={{...idle(gf, 63), lean: -4, head: 3, armF: [50, 36]}} uid="ma62" />
					</g>
					<CrowdBand f={f} y={1420} rows={3} n={14} step={196} x0={-260} sc={1.66} gap={gap} seed={9} />
					<Callout f={f} t0={at('064')} t1={at('064') + 90} from={[1010, 900]} to={[1420, 620]} text="ОДНО СЛОВО" c="#9ff0b0" size={26} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 065: последний автобус, капюшон */
const S28: React.FC = () => {
	const {f, gf} = useShot();
	const w = walkTo(f, -40, 80, -220, 700, 3, 0.26);
	const cam = usePush(camOn(900, 620, 1.1), camOn(1000, 580, 1.22));
	return (
		<Stage cam={cam} bg="#0a0e20" light={{x: 80, y: 10, o: 0.22, night: true}} grain={0.06}>
			<Layer depth={1.8}>
				<NightStreet f={gf} />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={w.x} floor={FL} s={1.03} facing={1} faceTurn={0.2} look={[0.4, 0]} expr="sad" hood pose={{...w.pose, head: 4}} vx={w.vx} bob={w.bob} uid="h65" />
					<HeroBadge x={w.x} y={badgeY(1.03)} s={0.72} />
					<Callout f={f} t0={30} t1={140} from={[1020, 640]} to={[1440, 400]} text="В КАПЮШОНЕ" c="#9aa9e0" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 066: сотни теорий и ни одной правильной */
const S29: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 600, 1.04), camOn(960, 560, 1.16));
	const notes = ['он в бегах', 'его украли', 'это был двойник', 'он умер', 'его забрали в ЦРУ', 'это реклама', 'он вернётся в пятницу', 'это была игра', 'он просто устал'];
	return (
		<Stage cam={cam} bg="#0d1230" light={{x: 40, y: 8, o: 0.3, night: true}} grain={0.06}>
			<Layer depth={1.6}>
				<Svg>
					{notes.map((t, i) => {
						const x = 260 + (i % 3) * 620 + Math.sin(i * 2.3) * 60;
						const y = 240 + Math.floor(i / 3) * 250;
						const p = interpolate(f, [i * 7, i * 7 + 12], [0, 1], clamp);
						return (
							<g key={i} opacity={0.25 + 0.5 * p} transform={`translate(${x},${y}) scale(${0.86 + 0.14 * p}) rotate(${Math.sin(i) * 5})`}>
								<rect x={-190} y={-62} width={380} height={124} rx={26} fill="#1b2450" stroke="#3b4880" strokeWidth={3} />
								<circle cx={-140} cy={-16} r={26} fill="#2f3a6b" />
								<text x={-40} y={-8} fontFamily={FONT} fontWeight={800} fontSize={26} fill="#cfd8ff">
									{t}
								</text>
								<text x={-140} y={40} fontFamily={FONT} fontWeight={700} fontSize={20} fill="#7f8cc0">
									{(i + 2) * 1374} лайков
								</text>
							</g>
						);
					})}
					<text x={960} y={1010} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill="#ff8a72">
						НИ ОДНОЙ ПРАВИЛЬНОЙ
					</text>
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 067: макароны с сыром прямо из кастрюли */
const S30: React.FC = () => {
	const {f, gf, at} = useShot();
	const eat = f % 60 < 24 ? 1 : 0;
	const cam = usePush(camOn(900, 660, 1.1), camOn(980, 620, 1.22));
	return (
		<Stage cam={cam} bg="#2a2440" light={{x: 40, y: 10, o: 0.3, night: true}}>
			<Layer depth={1.7}>
				<Kitchen night />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<rect x={520} y={720} width={880} height={24} rx={8} fill="#6b5a48" />
					<rect x={560} y={744} width={20} height={156} fill="#4a3c30" />
					<rect x={1340} y={744} width={20} height={156} fill="#4a3c30" />
					<Actor who="hero" x={820} floor={FL} s={1} facing={1} faceTurn={0.3} look={[0.2, 0.4]} expr="normal" mouth={eat ? 'open' : 'line'} pose={{...idle(gf, 67), armF: [eat * 60, 30 + eat * 70], head: 4}} seat={714} uid="h67" />
					<HeroBadge x={820} y={badgeY(1, FL) - 80} s={0.7} />
					<g transform="translate(1010,700)">
						<ellipse rx={62} ry={16} fill="#8a8f9e" />
						<rect x={-62} y={-40} width={124} height={40} fill="#9aa0ac" />
						<ellipse rx={50} ry={11} fill="#ffd98a" />
					</g>
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 068–069: мама про восемьдесят миллионов — «Пусть» */
const S31: React.FC = () => {
	const {f, gf, at} = useShot();
	const sp = useSpeaking(gf);
	const cam = usePush(camOn(1000, 640, 1.1), camOn(1080, 600, 1.24));
	return (
		<Stage cam={cam} bg="#2a2440" light={{x: 30, y: 10, o: 0.32, night: true}}>
			<Layer depth={1.7}>
				<Kitchen night />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={780} floor={FL} seat={760} s={1.02} facing={1} faceTurn={0.4} look={[0.6, 0]} expr="normal" mouth={sp === 'HERO' ? 'open' : 'line'} pose={{...idle(gf, 68), armF: [40, 60], legB: [86, 80], legF: [92, 88]}} uid="h68" />
					<Actor who="mom" x={1180} floor={FL} s={1.04} facing={-1} faceTurn={0.5} look={[-0.8, 0]} expr="worried" mouth={sp === 'MOM' ? 'open' : 'line'} pose={{...idle(gf, 69), armF: [46, 56], lean: 3}} uid="m68" />
					<HeroBadge x={780} y={badgeY(1.02, FL) - 60} s={0.72} />
					<Callout f={f} t0={at('068') + 10} t1={at('069') + 40} from={[1120, 620]} to={[1340, 340]} text="80 МЛН ОБИДЯТСЯ" c="#ff9ad0" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 070–074: фото пустого коридора в 6:41 и счётчик назад */
const S32: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 620, 1.08), camOn(1000, 580, 1.22));
	const post = env(f, at('071') - 6, at('072') + 10, 10, 10);
	return (
		<Stage cam={cam} bg="#141a38" light={{x: 40, y: 10, o: 0.32, night: true}} grain={0.05}>
			<Layer depth={1.7}>
				<Corridor f={gf} />
			</Layer>
			<Layer depth={1.2}>
				<Svg>
					<g opacity={post} transform={`translate(${1180},${520}) rotate(-4) scale(${0.9 + 0.1 * post})`}>
						<rect x={-300} y={-230} width={600} height={460} rx={18} fill="#e9e2cc" />
						<rect x={-268} y={-198} width={536} height={396} rx={8} fill="#5b6488" />
						<rect x={-268} y={-40} width={536} height={238} fill="#3f4767" />
						<rect x={-60} y={-160} width={120} height={200} fill="#2b3157" />
						<text x={0} y={260} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill="#3e3a2e">
							6:41 · без подписи
						</text>
					</g>
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={720} floor={FL} seat={790} s={1.02} facing={1} faceTurn={0.5} look={[0.6, 0]} expr="sleepy" pose={{...idle(gf, 70), armF: [50 + 30 * post, 60], legB: [86, 80], legF: [92, 88]}} uid="h70" />
					<HeroBadge x={720} y={badgeY(1.02, FL) - 50} s={0.72} />
					<DownGraph f={f} x={240} y={430} w={420} h={230} t0={at('074')} />
					<Callout f={f} t0={at('074')} t1={at('074') + 80} from={[380, 330]} to={[420, 200]} text="СЧЁТЧИК НАЗАД" c="#ff8a72" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 075–076: минус семьдесят девять миллионов, осталось двенадцать */
const S33: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 600, 1.06), camOn(960, 560, 1.18));
	return (
		<Stage cam={cam} bg="#120f28" light={{x: 40, y: 8, o: 0.28, night: true}} grain={0.06}>
			<Layer depth={1.6}>
				<Svg>
					<BigNum f={f} x={960} y={400} from={84000000} to={12} t0={at('075') + 20} dur={at('076') - at('075') + 30} label="ПОДПИСЧИКОВ" s={0.86} />
					<Callout f={f} t0={at('075') + 4} t1={at('076')} from={[700, 500]} to={[420, 250]} text="−79 000 000" c="#ff8a72" size={30} align="center" />
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={960} floor={FL} s={1} facing={1} faceTurn={0.2} look={[0, -0.5]} expr="sad" pose={{...idle(gf, 75), armF: [10, 20], head: -8}} uid="h75" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 077–079: популярность и любовь */
const S34: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 600, 1.08), camOn(960, 560, 1.2));
	return (
		<Stage cam={cam} bg="#101534" light={{x: 30, y: 10, o: 0.28, night: true}} grain={0.05}>
			<Layer depth={1.4}>
				<Svg>
					<Split f={f} a={{label: 'ПОПУЛЯРНОСТЬ', num: '84 МЛН', color: '#9fe8ff', who: 'friend', expr: 'wide'}} b={{label: 'ЛЮБОВЬ', num: '12', color: '#ffc94a', who: 'hero', expr: 'sad'}} />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 080: письмо в конверте с марками */
const S35: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(960, 600, 1.1), camOn(960, 560, 1.26));
	const drop = interpolate(f, [at('080') + 10, at('080') + 40], [-260, 0], clamp);
	return (
		<Stage cam={cam} bg="#1c2240" light={{x: 60, y: 10, o: 0.32, night: true}}>
			<Layer depth={1.8}>
				<Entrance />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<g transform={`translate(960,${520 + drop}) rotate(-6)`}>
						<rect x={-260} y={-170} width={520} height={340} rx={10} fill="#efe7d0" />
						<path d="M-260,-170 L0,20 L260,-170" stroke="#cfc3a4" strokeWidth={6} fill="none" />
						<g transform="translate(150,-110) rotate(8)">
							<rect x={-46} y={-56} width={92} height={112} fill="#f6f1e2" stroke="#b8ac8c" strokeWidth={3} strokeDasharray="6 6" />
							<circle cx={0} cy={-14} r={22} fill="#8b5cf6" opacity={0.8} />
							<text x={0} y={26} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={16} fill="#6b6350">
								МАРКА
							</text>
						</g>
						<text x={-150} y={110} fontFamily={FONT} fontWeight={800} fontSize={30} fill="#3e3a2e">
							тебе
						</text>
					</g>
					<Actor who="hero" x={520} floor={FL} s={1} facing={1} faceTurn={0.5} look={[0.7, 0]} expr="wide" pose={{...idle(gf, 80), armF: [60, 50]}} uid="h80" />
					<HeroBadge x={520} y={badgeY(1)} s={0.74} />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 081–083: читает письмо */
const S36: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(940, 620, 1.1), camOn(980, 580, 1.24));
	return (
		<Stage cam={cam} bg="#241f3c" light={{x: 36, y: 10, o: 0.34, night: true}}>
			<Layer depth={1.7}>
				<Kitchen night />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<rect x={560} y={740} width={880} height={26} rx={8} fill="#6b5a48" />
					<Actor who="hero" x={820} floor={FL} seat={734} s={1.02} facing={1} faceTurn={0.3} look={[0.3, 0.2]} expr="worried" pose={{...idle(gf, 81), armF: [56, 62], legB: [86, 80], legF: [92, 88], head: 6}} uid="h81" />
					<HeroBadge x={820} y={badgeY(1.02, FL) - 60} s={0.72} />
					<Letter f={f} x={1240} y={620} s={0.62} t0={at('081')} />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 084–086: «читал три раза подряд» */
const S37: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(900, 620, 1.2), camOn(900, 580, 1.36));
	return (
		<Stage cam={cam} bg="#221d3a" light={{x: 30, y: 10, o: 0.34, night: true}}>
			<Layer depth={1.5}>
				<Letter f={f} x={960} y={560} s={1.02} t0={at('084') - 40} />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Callout f={f} t0={at('086')} t1={at('086') + 90} from={[1180, 420]} to={[1440, 200]} text="ТРИ РАЗА ПОДРЯД" c="#ffc94a" size={24} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 087: «Слушай… ты счастлив?» */
const S38: React.FC = () => {
	const {f, gf} = useShot();
	const sp = useSpeaking(gf);
	const cam = usePush(camOn(980, 640, 1.12), camOn(1040, 600, 1.26));
	return (
		<Stage cam={cam} bg="#1a2140" light={{x: 50, y: 10, o: 0.34, night: true}}>
			<Layer depth={1.7}>
				<Kitchen night />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={820} floor={FL} seat={760} s={1.02} facing={1} faceTurn={0.4} look={[0.6, 0]} expr="worried" pose={{...idle(gf, 87), armF: [40, 60], legB: [86, 80], legF: [92, 88]}} uid="h87" />
					<g transform="translate(1180,720)">
						<rect x={-80} y={-130} width={160} height={250} rx={24} fill="#1b2240" stroke="#4a5896" strokeWidth={5} />
						<rect x={-64} y={-112} width={128} height={208} rx={12} fill="#25305c" />
						<circle cx={-30} cy={-70} r={22} fill="#8b5cf6" />
						<text x={8} y={-62} fontFamily={FONT} fontWeight={700} fontSize={17} fill="#c9d3ff">
							майя
						</text>
						<rect x={-52} y={-24} width={104} height={54} rx={12} fill="#3b4880" />
						<text x={0} y={8} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={15} fill="#e8eeff">
							ты счастлив?
						</text>
					</g>
					<HeroBadge x={820} y={badgeY(1.02, FL) - 60} s={0.72} />
					<Callout f={f} t0={20} t1={140} from={[1220, 640]} to={[1420, 360]} text="ТОЛЬКО ЧЕСТНО" c="#9ff0b0" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 088–090: впервые не отвечает сразу */
const S39: React.FC = () => {
	const {f, gf, at} = useShot();
	const cam = usePush(camOn(900, 600, 1.22), camOn(940, 560, 1.38));
	const blink = Math.floor(f / 24) % 2 === 0 ? 1 : 0;
	return (
		<Stage cam={cam} bg="#141a38" light={{x: 30, y: 10, o: 0.3, night: true}}>
			<Layer depth={1.6}>
				<Kitchen night />
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={880} floor={FL} seat={760} s={1.04} facing={1} faceTurn={0.2} look={[0, 0.1]} expr="worried" mouth="line" pose={{...idle(gf, 88), armF: [40, 58], legB: [86, 80], legF: [92, 88], head: 4}} uid="h88" />
					<HeroBadge x={880} y={badgeY(1.04, FL) - 60} s={0.72} />
					<g transform="translate(1180,700)">
						<rect x={-74} y={-120} width={148} height={230} rx={22} fill="#1b2240" stroke="#4a5896" strokeWidth={5} />
						<rect x={-58} y={-104} width={116} height={110} rx={10} fill="#25305c" />
						<text x={-20} y={-40} fontFamily={FONT} fontWeight={700} fontSize={16} fill="#c9d3ff">
							печатает
						</text>
						{[0, 1, 2].map((i) => (
							<circle key={i} cx={-22 + i * 22} cy={-4} r={7} fill="#9fe8ff" opacity={blink ? 0.9 : 0.3} />
						))}
					</g>
					<Callout f={f} t0={at('090')} t1={at('090') + 100} from={[1120, 600]} to={[1400, 320]} text="НЕ СРАЗУ" c="#ffc94a" size={26} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 091–092: имя важнее счётчика */
const S40: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 600, 1.04), camOn(960, 560, 1.16));
	return (
		<Stage cam={cam} bg="#111634" light={{x: 60, y: 8, o: 0.28, night: true}} grain={0.06}>
			<Layer depth={1.6}>
				<Svg>
					<CrowdSea f={f} rows={2} y={1010} k={0.55} looking={1} />
					<text x={960} y={330} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={92} fill="#ffc94a" opacity={0.9}>
						ПО ИМЕНИ
					</text>
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={960} floor={FL} s={1.06} facing={1} faceTurn={0.2} look={[0, 0.1]} expr="normal" pose={{...idle(gf, 91), armF: [16, 26]}} uid="h91" />
					<HeroBadge x={960} y={badgeY(1.06)} s={0.8} />
					<Callout f={f} t0={40} t1={150} from={[1020, 600]} to={[1400, 700]} text="НЕ СЧЁТЧИК" c="#9fe8ff" size={22} align="center" />
				</Svg>
			</Layer>
		</Stage>
	);
};

/* 093: двенадцать подписчиков и вопрос в конце */
const S41: React.FC = () => {
	const {f, gf} = useShot();
	const cam = usePush(camOn(960, 600, 1.1), camOn(960, 540, 1.22));
	return (
		<Stage cam={cam} bg="#0f1430" light={{x: 30, y: 8, o: 0.34, night: true}} grain={0.06}>
			<Layer depth={1.8}>
				<Bedroom night f={gf} />
			</Layer>
			<Layer depth={1.2}>
				<Svg>
					<Phone x={1180} y={560} s={0.5} f={f} kind="likes" value={12} glow={0.5} />
					<text x={1180} y={330} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill="#9ff0b0">
						12 ПОДПИСЧИКОВ
					</text>
				</Svg>
			</Layer>
			<Layer depth={1}>
				<Svg>
					<Actor who="hero" x={700} floor={FL} s={1.04} facing={1} faceTurn={0.4} look={[0.7, 0]} expr="normal" mouth="line" pose={{...idle(gf, 93), armF: [10, 24], head: -2}} uid="h93" />
					<HeroBadge x={700} y={badgeY(1.04)} s={0.76} />
				</Svg>
			</Layer>
		</Stage>
	);
};

export const SHOTS_B: ShotDef[] = [
	{at: '052', C: S22, whip: true},
	{at: '054', C: S23, whip: true},
	{at: '057', C: S24},
	{at: '058', C: S25},
	{at: '060', C: S26, whip: true},
	{at: '062', C: S27},
	{at: '065', C: S28, whip: true},
	{at: '066', C: S29, whip: true},
	{at: '067', C: S30, whip: true},
	{at: '068', C: S31},
	{at: '070', C: S32, whip: true},
	{at: '075', C: S33, whip: true},
	{at: '077', C: S34},
	{at: '080', C: S35, whip: true},
	{at: '081', C: S36},
	{at: '084', C: S37},
	{at: '087', C: S38},
	{at: '088', C: S39},
	{at: '091', C: S40},
	{at: '093', C: S41},
];
