import socketio from 'socket.io'

const io = socketio()

const run = async () => {
  io.on('connection', async socket => {
    console.log('connected!')
  })

  io.listen(3001)
  console.log(`App listening on port 3001`)
}

run()
