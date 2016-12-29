#!/usr/bin/env node
const gitclone = require('gitclone')
const sb = require('spellbook')
const arg = require('argcon')
const pkg = require('../package.json');

function help() {
	console.log(`
RxApi ${pkg.version} - ${pkg.description}
Usage:
	new project    Generate new project in new folder
	run            Run API server
	help           Show this message

${pkg.license} License - ${pkg.author}
`);
}

arg.alone(res => {
	help()
})

arg.on('new', res => {
	if (!sb.empty(sb.get(res, '0')) && sb.isString(res[0])) {
    gitclone('warlock/nodejs-api-rest-tester', { dest: res[0] }, () => {
    	console.log(`RxApi downloaded in '${res[0]}' folder`)
    	const spawn = require('child_process').spawn;
			const ex = spawn('npm', ['i'], { cwd : `./${res[0]}/`});

			ex.stdout.on('data', (data) => {
				console.log(`${data}`);
				console.log(`

	RxApi Instaled! Welcome!
	------------------------
	Please 'cd ${res[0]}' and run server using 'rxapi run'
`);
			});

			ex.stderr.on('data', (data) => {
				console.log(`stderr: ${data}`);
			});

			ex.on('close', (code) => {
			});
    });
	} else console.log('Pease include the name of project or directory')
})

arg.on('help', () => {
	help()
})

arg.on('run', () => {
  const spawn = require('child_process').spawn;
	const ex = spawn('npm', ['start']);
	ex.stdout.on('data', (data) => {

	});

	ex.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	ex.on('close', (code) => {
	});
})
