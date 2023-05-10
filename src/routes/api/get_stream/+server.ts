import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { spawn } from 'child_process';
import { once } from 'events';
import path from 'path';

export const POST = (async ({ request }) => {
	const data = await request.json();
	console.log(data);
	let result = '';
	const pythonProcess = spawn('python3', [
		path.join(process.cwd(), 'src/scripts/getStreams.py'),
		...data
	]);

	pythonProcess.stdout.on('data', (data) => {
		result += data.toString();
	});

	pythonProcess.stderr.on('error', (error) => {
		console.log(error);
	});

	await once(pythonProcess, 'close');
	return json(result);
}) satisfies RequestHandler;
