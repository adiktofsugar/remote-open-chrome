var request = require('request');
var urlFormat = require('url').format;
var app = require('express')()
app.set('view engine', 'ejs');
app.set('views', './templates-client');

function getHost(callback) {
    //callback(null, 'localhost');
    callback(null, '192.168.0.112');
}

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
    res.render('index.ejs', {
        message: req.query.message
    });
});
app.post('/', function (req, res) {
    var url = req.body.url;
    console.log('URL IS ', url);

    getHost(function (err, host) {
        var serverRequest = urlFormat({
            protocol: 'http',
            host: host + ':3001',
            pathname: '/',
            query: {
                'url': url
            }
        });
        console.log('SERVER REQUEST IS ', serverRequest);

        request(serverRequest, function (err, response, body) {
            console.log('finished server request', body);
            if (err) {
                console.error(err);
            }
            var message = err
                ? 'There was a problem'
                : 'Success!'

            if (body) {
                body = JSON.parse(body);
                message = body.message;
            }
            res.redirect(urlFormat({
                pathname: '/',
                query: {
                    message: message
                }
            }))
        });
    });
});
app.listen(3000, function (err) {
    if (err) {
        throw err;
    }
    console.log('now listening on port', 3000);
});
