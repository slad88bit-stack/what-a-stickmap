// Мини-сервер для страницы с роликом: отдаёт файлы и умеет Range,
// иначе браузер не может перематывать большое видео и тянет его целиком.
//   node serve.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.argv[2]) || 8080;
const TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.mp4': 'video/mp4',
	'.jpg': 'image/jpeg',
	'.png': 'image/png',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.md': 'text/markdown; charset=utf-8',
};

http
	.createServer((req, res) => {
		const url = decodeURIComponent((req.url || '/').split('?')[0]);
		const rel = url === '/' ? 'index.html' : url.replace(/^\/+/, '');
		const file = path.join(ROOT, rel);
		if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
			res.writeHead(404, {'content-type': 'text/plain; charset=utf-8'});
			res.end('not found');
			return;
		}
		const size = fs.statSync(file).size;
		const type = TYPES[path.extname(file)] ?? 'application/octet-stream';
		const range = req.headers.range;
		if (range) {
			const m = /bytes=(\d*)-(\d*)/.exec(range);
			const start = m && m[1] ? Number(m[1]) : 0;
			const end = m && m[2] ? Number(m[2]) : size - 1;
			if (start >= size || end < start) {
				res.writeHead(416, {'content-range': `bytes */${size}`});
				res.end();
				return;
			}
			res.writeHead(206, {
				'content-type': type,
				'content-length': end - start + 1,
				'content-range': `bytes ${start}-${end}/${size}`,
				'accept-ranges': 'bytes',
				'cache-control': 'no-cache',
			});
			fs.createReadStream(file, {start, end}).pipe(res);
			return;
		}
		res.writeHead(200, {
			'content-type': type,
			'content-length': size,
			'accept-ranges': 'bytes',
			'cache-control': 'no-cache',
		});
		if (req.method === 'HEAD') res.end();
		else fs.createReadStream(file).pipe(res);
	})
	.listen(PORT, '0.0.0.0', () => console.log(`http://0.0.0.0:${PORT}  ->  ${ROOT}`));
