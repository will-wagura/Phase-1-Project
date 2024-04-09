require('dotenv').config();

const corsProxy = require('cors-anywhere');

corsProxy.createServer({
  origin: '*',
}).listen(8080, () => {
  console.log('CORS proxy server listening on port 8080');
});