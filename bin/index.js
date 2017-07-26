#!/usr/bin/env node
const git = require('simple-git')
const arg = require('argcon')
const pkg = require('../package.json')
const chalk = require('chalk')
const exec = require("child_process").exec
const welcome = (folder, version) => `

  ${chalk.blue(`RxAPi${version}: `, chalk.green(pkg.version))} Instaled! Welcome!
  ------------------------  

  Documentation:
  https://rxapi.js.gl

  ------------------------

  Please 'cd ${folder}' and run server using 'rxapi run' or 'npm start'

`

var help = () => {
  console.log(`
${chalk.blue('RxAPi: ', chalk.green(pkg.version))}
Usage:
  new [project_name]      Generate new project in new folder
  dummy [project_name]    Generate new project in new folder
  run                     Run API server
  help                    Show this message


Documentation:
https://rxapi.js.gl

  ${pkg.license} License - Josep Subils <js@js.gl>
`)
}

arg.on('new', project => {
  if (undefined !== project) {
    console.log(chalk.blue('RxAPi: ', chalk.green(pkg.version)))
    console.log(chalk.green(`Start downloading server in '${project}' folder.`))
    git().clone('https://github.com/warlock/api-template.git', `./${project}`, err => {
      if (err) console.log(err)
      else {
        console.log(chalk.green("Installing dependences"))
        exec(`cd ${project} && npm i`, (err, stdout, stderr) => {
          if (err) console.log(err)
          else {
            console.log(welcome(project))
          }
        })
      }
    })
  }
})

arg.on('dummy', project => {
  if (undefined !== project) {
    console.log(chalk.blue('RxAPi: ', chalk.green(pkg.version)))
    console.log(chalk.green(`Start downloading dummy in '${project}' folder.`))
    git().clone('https://github.com/warlock/nodejs-api-rest-tester.git', `./${project}`, err => {
      if (err) console.log(err)
      else {
        console.log(chalk.green("Installing dependences"))
        exec(`cd ${project} && npm i`, (err, stdout, stderr) => {
          if (err) console.log(err)
          else {
            console.log(welcome(project))
          }
        })
      }
    })
  }
})

arg.on('help', () => {
  help()
})

arg.on('run', () => {
  exec(`npm start`, (err, stdout, stderr) => {
    if (err) console.error(err)
  })
})

arg.on('version', () => {
  console.log(chalk.blue('RxAPi: ', chalk.green(pkg.version)) + '\n')
})

arg.alone(res => {
  help()
})