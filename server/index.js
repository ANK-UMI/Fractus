const express = require('express')
const http = require('http')
const path = require('path')
const serialcomm =  require('serialport')

const app = express();
app.set('PORT', 9000)
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, '../client/')))

server.listen(app.get('PORT'), ()=>{
    console.log("server fractus", app.get('PORT'))
})

// comunication socket
const io = require('socket.io')(server)

// site: http://localhost:9000/

// comunication serial

const parser = new serialcomm(
    'COM4', 
    {baudRate: 9600}
).pipe(new serialcomm.parsers.Readline({delimiter: '\n'}))

parser.on('data', (datos)=>{
    if(datos.includes('ypr')){
    console.log(datos)
    io.emit('datos-giro', datos)
}
})
