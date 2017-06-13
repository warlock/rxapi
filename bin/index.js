#!/usr/bin/env node
const gitclone = require('gitclone')
const sb = require('spellbook')
const arg = require('argcon')
const pkg = require('../package.json')

var help = () => {
  console.log(`
RxApi ${pkg.version} - ${pkg.description}
Usage:
  new project    Generate new project in new folder
  run            Run API server
  help           Show this message

${pkg.license} License - Josep Subils Rigau <josep@spellbook.io>
`)
}

arg.on('new', res => {
  if (!sb.empty(sb.get(res, '0')) && sb.isString(res[0])) {
    console.log(`RxApi: Start downloading project in '${res[0]}' folder.`)
    gitclone('warlock/nodejs-api-rest-tester', { dest: res[0] }, () => {
      console.log(`RxApi: Successful download in '${res[0]}' folder`)
      const spawn = require('child_process').spawn
      const ex = spawn('npm', ['i'], { cwd : `./${res[0]}/`})

      ex.stdout.on('data', data => {
        process.stdout.write(`${data}`)
        console.log(`

  RxApi Instaled! Welcome!
  ------------------------

  Principal documents:
  ./${res[0]}/scaffold/http.js     API REST Generator
  ./${res[0]}/scaffold/socket.js   WEBSOCKET Generator
  ./${res[0]}/schema.json          JSON Data model schema
  ./${res[0]}/conf.json            Server configuration file

  ------------------------

  Development documentation:
  https://github.com/warlock/nodejs-api-rest-tester

  ------------------------

  Please 'cd ${res[0]}' and run server using 'rxapi run' or 'npm start'

`)
      })

      ex.stderr.on('data', data => {
        process.stdout.write(`${data}`)
      })

      ex.on('close', code => {
      })
    })
  } else console.log('Pease include the name of project or directory')
})

arg.on('help', () => {
  help()
})

arg.on('run', () => {
  const spawn = require('child_process').spawn
  const ex = spawn('npm', ['start'])
  ex.stdout.on('data', (data) => {
    process.stdout.write(`${data}`)
  })

  ex.stderr.on('data', (data) => {
    process.stderr.write(`${data}`)
  })

  ex.on('close', (code) => {
  })
})

arg.alone(res => {
  help()
})
