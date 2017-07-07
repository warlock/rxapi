#!/usr/bin/env node
const gitclone = require('gitclone')
const pro = require('commander')
const pkg = require('../package.json')
const chalk = require('chalk')
const exec = require("child_process").exec
const welcome = folder => `

  ${chalk.blue('RxAPi: ', chalk.green(pkg.version))} Instaled! Welcome!
  ------------------------  

  Documentation:
  https://warlock.gitbooks.io/rxapi/content

  ------------------------

  Please 'cd ${folder}' and run server using 'rxapi run' or 'npm start'

`

pro
.version(
  chalk.blue('RxAPi: ', chalk.green(pkg.version)) + '\n'
)

pro
.command('new <project>')
.action(project => {
  console.log(chalk.blue('RxAPi: ', chalk.green(pkg.version)))
  console.log(`Start download in '${project}' folder.`)
  gitclone('warlock/api-template', { dest: project }, () => {
    exec(`cd project && npm i`, (err, stdout, stderr) => {
      if (err) console.error(err)
      else {
        console.log(welcome())
      }
    })
  })
})

pro
.command('run')
.action(() => {
  exec("npm start", (err, stdout, stderr) => {
    if (err) console.error(err)
  })
})

pro.parse(process.argv)
