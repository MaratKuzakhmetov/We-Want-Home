const { createServer } = require('http');
const { app } = require('./app');
const { wsServer } = require('./websocket');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

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

server.listen(PORT, () => {
  console.log('Server is up on port ', process.env.PORT);
});
