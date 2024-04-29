const paths = require('../../config/paths');

module.exports = () => {
  return ({
    contentBase: paths.appPublic,
    //compress: true, // enable gzip compression
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /^\/device/, to: '/device.html' }
        /*{ from: /./, to: '/views/404.html' }*/
      ]
    },
    hot: true,
    transportMode: 'ws',
    injectClient: false,
    noInfo: true,
    host: '127.0.0.1',
    port: 3000
  })
};
