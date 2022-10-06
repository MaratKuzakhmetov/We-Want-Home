const { createServer } = require('http');
const { app } = require('./app');
const { wsServer } = require('./websocket');
require('dotenv').config();

const server = createServer(app);

server.on('upgrade', (request, socket, head) => {
  console.log('Session is parsed..');

  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit('connection', ws, request);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });

app.listen(process.env.PORT, () => {
  console.log('The Best Server in our flat', process.env.PORT);
});
