import React from 'react';
import {interpolate} from 'remotion';
import {FONT, HAND} from '../kit/ui';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const fmtMln = (v: number) => (v >= 1e6 ? (v / 1e6).toFixed(1).replace('.', ',') + ' МЛН' : String(Math.round(v)));

/* Телефон: экран с уведомлениями и счётчиком лайков */
export const Phone: React.FC<{x: number; y: number; s?: number; f: number; value?: number; kind?: 'likes' | 'notif' | 'post'; glow?: number}> = ({x, y, s = 1, f, value = 4800000, kind = 'likes', glow = 1}) => (
	<g transform={`translate(${x},${y}) scale(${s}) rotate(-6)`}>
		<rect x={-150} y={-260} width={300} height={520} rx={34} fill="#12162c" stroke="#3a4570" strokeWidth={6} />
		<rect x={-132} y={-236} width={264} height={472} rx={22} fill="#1b2350" />
		<rect x={-110} y={-220} width={220} height={70} rx={14} fill="#2a3566" />
		<circle cx={-84} cy={-185} r={22} fill="#ff5a5a" />
		<text x={-46} y={-176} fontFamily={FONT} fontWeight={800} fontSize={22} fill="#e8eeff">
			{kind === 'likes' ? 'лайки' : kind === 'post' ? 'новая публикация' : 'уведомления'}
		</text>
		{kind === 'likes' ? (
			<text x={0} y={-40} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={62} fill="#ffc94a">
				{fmtMln(value)}
			</text>
		) : null}
		{Array.from({length: 5}).map((_, i) => {
			const yy = -8 + i * 52;
			const p = interpolate(f, [i * 6, i * 6 + 10], [0, 1], clamp);
			return (
				<g key={i} opacity={p} transform={`translate(0,${(1 - p) * 12})`}>
					<rect x={-108} y={yy} width={216} height={42} rx={10} fill="#141a3a" />
					<circle cx={-84} cy={yy + 21} r={12} fill="#5fd0ff" opacity={0.7} />
					<rect x={-64} y={yy + 12} width={120} height={8} rx={4} fill="#3d4a7c" />
					<rect x={-64} y={yy + 26} width={80} height={7} rx={3} fill="#2c3760" />
				</g>
			);
		})}
		<circle cx={0} cy={ease2(f)} r={0} fill="none" />
		<rect x={-132} y={-236} width={264} height={472} rx={22} fill="#7fb4ff" opacity={0.05 + 0.05 * Math.sin(f / 8)} />
		<circle cx={0} cy={-260} r={120 * glow} fill="#7fb4ff" opacity={0.1 * glow} />
	</g>
);
const ease2 = (_f: number) => 210;

/* Вспышки камер в толпе */
export const Flashes: React.FC<{f: number; x: number; y: number; spread?: number; n?: number; k?: number}> = ({f, x, y, spread = 600, n = 4, k = 1}) => (
	<g opacity={k}>
		{Array.from({length: n}).map((_, i) => {
			const on = Math.sin(f / (5 + i * 1.7) + i * 2.1) > 0.55;
			const px = x - spread / 2 + (i * spread) / Math.max(1, n - 1);
			return on ? (
				<g key={i}>
					<circle cx={px} cy={y + Math.sin(i) * 40} r={26} fill="#fff" opacity={0.85} />
					<circle cx={px} cy={y + Math.sin(i) * 40} r={70} fill="#fff" opacity={0.18} />
				</g>
			) : null;
		})}
	</g>
);

/* Сетка мемов с лицом героя */
export const MemeGrid: React.FC<{f: number; x: number; y: number; s?: number; cols?: number; rows?: number}> = ({f, x, y, s = 1, cols = 3, rows = 2}) => {
	const w = 260;
	const h = 190;
	return (
		<g transform={`translate(${x},${y}) scale(${s})`}>
			{Array.from({length: rows}).map((_, r) =>
				Array.from({length: cols}).map((__, c) => {
					const p = interpolate(f, [(r * cols + c) * 4, (r * cols + c) * 4 + 12], [0, 1], clamp);
					return (
						<g key={`${r}-${c}`} transform={`translate(${(c - (cols - 1) / 2) * (w + 24)},${(r - (rows - 1) / 2) * (h + 24)}) scale(${0.9 + 0.1 * p})`} opacity={p}>
							<rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill="#242c54" stroke="#3b4880" strokeWidth={3} />
							<circle cx={0} cy={-26} r={44} fill="#101426" />
							<circle cx={-14} cy={-34} r={6} fill="#fff" />
							<circle cx={14} cy={-34} r={6} fill="#fff" />
							<path d="M-16,-4 q16,12 32,0" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />
							<rect x={-w / 2 + 20} y={44} width={w - 40} height={12} rx={6} fill="#3d4a7c" />
							<rect x={-w / 2 + 20} y={64} width={w - 90} height={10} rx={5} fill="#2c3760" />
							<text x={w / 2 - 22} y={h / 2 - 20} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={20} fill="#ffc94a">
								♥ {((r * cols + c + 1) * 137 + 400) * 1000}
							</text>
						</g>
					);
				}),
			)}
		</g>
	);
};

/* Бумажное письмо: строки проявляются по одной */
export const Letter: React.FC<{f: number; x: number; y: number; s?: number; t0?: number; k?: number}> = ({f, x, y, s = 1, t0 = 0, k = 1}) => (
	<g transform={`translate(${x},${y}) scale(${s}) rotate(-3)`} opacity={k}>
		<rect x={-330} y={-400} width={660} height={800} rx={10} fill="#efe7d0" />
		<rect x={-330} y={-400} width={660} height={800} rx={10} fill="#fff" opacity={0.18} />
		{Array.from({length: 13}).map((_, i) => {
			const p = interpolate(f, [t0 + i * 9, t0 + i * 9 + 10], [0, 1], clamp);
			const w = 520 - (i % 3) * 90;
			return <rect key={i} x={-280} y={-330 + i * 54} width={w} height={12} rx={6} fill="#5d5546" opacity={0.5 * p} />;
		})}
		<path d="M-280,300 q120,-60 300,10" stroke={HAND} strokeWidth={0} fill="none" />
		<text x={210} y={330} textAnchor="end" fontFamily={HAND} fontSize={54} fill="#3e3a2e" opacity={interpolate(f, [t0 + 120, t0 + 140], [0, 0.9], clamp)}>
			майя
		</text>
	</g>
);

/* Толпа: ряды силуэтов */
export const CrowdSea: React.FC<{f: number; rows?: number; y?: number; wave?: number; k?: number; looking?: number}> = ({f, rows = 4, y = 900, wave = 0, k = 1, looking = 0}) => (
	<g opacity={k}>
		{Array.from({length: rows}).map((_, r) => (
			<g key={r}>
				{Array.from({length: 16}).map((_, i) => {
					const ph = ((i * 37 + r * 91) % 360) / 57.3;
					const bob = Math.sin(f / 10 + ph) * 6;
					const turn = looking * Math.sin(f / 7 + ph) * 12;
					const px = -180 + i * 150 + (r % 2) * 60 + Math.sin(f / 32 + ph) * 8 * wave;
					const sc = 1 - r * 0.14;
					return (
						<g key={i} transform={`translate(${px},${y - r * 74 + bob}) scale(${sc})`}>
							<path d="M-52,72 q0,-42 24,-56 q12,-7 28,-7 q16,0 28,7 q24,14 24,56 z" fill="#1b2244" stroke="#303c6e" strokeWidth={3} />
							<circle cx={0} cy={-16} r={32} fill="#131832" stroke="#333f72" strokeWidth={3} />
							<circle cx={-11 + turn} cy={-22} r={4.4} fill="#dfe6ff" opacity={0.85} />
							<circle cx={11 + turn} cy={-22} r={4.4} fill="#dfe6ff" opacity={0.85} />
						</g>
					);
				})}
			</g>
		))}
	</g>
);

/* Толпа с коридором: head count around x = cx, gap widens over the shot */
export const CrowdBand: React.FC<{f: number; y: number; rows?: number; n?: number; step?: number; x0?: number; sc?: number; k?: number; gap?: number; cx?: number; seed?: number; phones?: boolean}> = ({
	f,
	y,
	rows = 3,
	n = 14,
	step = 150,
	x0 = -160,
	sc = 1,
	k = 1,
	gap = 0,
	cx = 1010,
	seed = 1,
	phones = false,
}) => (
	<g opacity={k}>
		{Array.from({length: rows}).map((_, r) => (
			<g key={r}>
				{Array.from({length: n}).map((_, i) => {
					const ph = ((i * 37 + r * 91 + seed * 53) % 360) / 57.3;
					const px = x0 + i * step + Math.sin(f / 34 + ph) * 7;
					if (gap > 0 && Math.abs(px - cx) < gap * (1 - r * 0.18)) return null;
					const bob = Math.sin(f / 12 + ph) * 6;
					const s = sc * (1 - r * 0.15);
					const phone = phones && i % 3 === 1;
					return (
						<g key={i} transform={`translate(${px},${y - r * 78 * sc + bob}) scale(${s})`}>
							<path d="M-58,78 q0,-44 26,-58 q12,-7 32,-7 q20,0 32,7 q26,14 26,58 z" fill="#1b2244" stroke="#303c6e" strokeWidth={3} />
							<circle cx={0} cy={-16} r={34} fill="#131832" stroke="#333f72" strokeWidth={3} />
							<circle cx={-12} cy={-22} r={4.6} fill="#dfe6ff" opacity={0.9} />
							<circle cx={12} cy={-22} r={4.6} fill="#dfe6ff" opacity={0.9} />
							{phone ? (
								<g transform={`translate(${18},${-46 - Math.sin(f / 16 + ph) * 5}) rotate(${6 + Math.sin(f / 20 + ph) * 5})`}>
									<rect x={-9} y={-26} width={18} height={30} rx={3} fill="#9fe8ff" opacity={0.85} />
									<circle cx={0} cy={-11} r={20} fill="#9fe8ff" opacity={0.14} />
								</g>
							) : null}
						</g>
					);
				})}
			</g>
		))}
	</g>
);

/* Большая цифра с подписью */
export const BigNum: React.FC<{x: number; y: number; from: number; to: number; t0: number; dur?: number; label?: string; s?: number; c?: string; f: number}> = ({x, y, from, to, t0, dur = 50, label, s = 1, c = '#ffc94a', f}) => {
	const v = Math.round(interpolate(f, [t0, t0 + dur], [from, to], clamp));
	return (
		<g transform={`translate(${x},${y}) scale(${s})`}>
			<text x={0} y={0} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={150} fill={c} stroke="#11142c" strokeWidth={10} paintOrder="stroke">
				{v.toLocaleString('ru-RU').replace(/,/g, ' ')}
			</text>
			{label ? (
				<text x={0} y={52} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill="#c9d3ff" letterSpacing={3}>
					{label}
				</text>
			) : null}
		</g>
	);
};

/* Микрофон */
export const Mic: React.FC<{x: number; y: number; s?: number; rot?: number; glow?: number}> = ({x, y, s = 1, rot = -12, glow = 1}) => (
	<g transform={`translate(${x},${y}) scale(${s}) rotate(${rot})`}>
		<circle cx={0} cy={-70} r={60} fill="#7fb4ff" opacity={0.12 * glow} />
		<rect x={-26} y={-116} width={52} height={104} rx={26} fill="#2b3560" stroke="#6f7db8" strokeWidth={4} />
		<circle cx={0} cy={-64} r={26} fill="#1a2140" />
		<rect x={-6} y={-12} width={12} height={60} fill="#6f7db8" />
		<rect x={-30} y={46} width={60} height={14} rx={7} fill="#6f7db8" />
	</g>
);

/* Падающий график отписок */
export const DownGraph: React.FC<{f: number; x: number; y: number; w?: number; h?: number; t0?: number; k?: number}> = ({f, x, y, w = 520, h = 260, t0 = 0, k = 1}) => {
	const pts = Array.from({length: 9}).map((_, i) => {
		const p = interpolate(f, [t0 + i * 8, t0 + i * 8 + 10], [0, 1], clamp);
		const px = (i / 8) * w;
		const py = -h * Math.min(1, Math.pow(i / 8, 0.75)) * p;
		return [px, py] as const;
	});
	const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
	return (
		<g transform={`translate(${x},${y})`} opacity={k}>
			<rect x={-30} y={-h - 40} width={w + 60} height={h + 90} rx={18} fill="#1b2244" opacity={0.9} />
			<path d={d} stroke="#ff8a72" strokeWidth={14} fill="none" strokeLinecap="round" />
			<path d={`${d} L${w},${4} L0,4 Z`} fill="#ff8a72" opacity={0.14} />
		</g>
	);
};
