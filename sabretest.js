var SabreDevStudio = require('sabre-dev-studio');
var sabre_dev_studio = new SabreDevStudio({
  client_id:     'V1:gq07j54d95fwx9u4:DEVCENTER:EXT',
  client_secret: '9jS0MbnY',
  uri:           'https://api.test.sabre.com'
});
var options = {};
var callback = function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(JSON.parse(data)));
  }
};
//sabre_dev_studio.get('/v1/lists/supported/cities', options, callback);
sabre_dev_studio.get('/v1/shop/flights/fares?origin=NYC&departuredate=2015-09-29&returndate=2015-09-30&maxfare=200', options, callback);
