var express = require('express');
var app = express();
var favicon = require('serve-favicon');

var port = process.env.PORT || 3000;
export default {
   start: (dir) => {
      app.use(favicon(dir + '/public/favicon.ico'));
      
      app.use('/assets', express.static('./public/assets'));
         var server = app.listen(port, function () {
         var host = server.address().address;
         var port = server.address().port;
      });

      app.get('*', function(req, res) {
         res.sendFile(dir + '/public/index.html');
      });

   }
}
