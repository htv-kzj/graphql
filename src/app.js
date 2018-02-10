import { init } from './lib/config/awsConfig';

const appStart = () => new Promise(async (resolve, reject) => {
  try {
    init();
    return resolve('');
  } catch (err) {
    return reject(err);
  }
});

appStart()
  .then(() => {
    // eslint-disable-next-line global-require
    const server = require('./server');
    return server;
  })
  .catch(err => {
    console.log(err.stack);
    process.exit();
  });
