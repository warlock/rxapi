var express = require('express'),
	app = express(),
	multer = require('multer'),
	conf = require('./conf.json'),
	io = require('socket.io')({ transports: ['websocket'] }),
	upload = multer({ dest: './web/data' })

app.use(express.static('web'))
app.listen(conf.http_port, () => {
	console.log("Running port: " + conf.http_port)
})

app.get('*', (req, res) => {
  res.redirect('/')
})

io.on('connection', (socket) => {
})