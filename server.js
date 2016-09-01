var exec = require('child_process').exec;
var app = require('express')()
app.set('view engine', 'ejs');
app.set('views', './templates-server');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded());

function openUrl(url, callback) {
    if (!url) {
        return callback(null, "No url");
    }
    var isWin = /^win/.test(process.platform);
    if (isWin) {
        exec('start chrome "' + url + '"', callback);
        return;
    }
    exec('open -a "Google Chrome" "' + url + '"', callback);
}

app.get('/', function (req, res) {
    openUrl(req.query.url, function (err, message) {
        if (err) {
            console.error(err);
            message = String(err);
        }
        if (!message) {
            message = 'Success!';
        }
        console.log(message);
        res.end(JSON.stringify({
            message: message
        }));
    });
});
app.listen(3001, function (err) {
    if (err) {
        throw err;
    }
    console.log('now listening on port', 3001);
});
