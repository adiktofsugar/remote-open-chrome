var exec = require('child_process').exec;
var urlFormat = require('url').format;
var app = require('express')()
app.set('view engine', 'ejs');
app.set('views', './templates');


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

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
    res.render('index.ejs', {
        message: req.query.message
    });
});
app.post('/', function (req, res) {
    var url = req.body.url;
    openUrl(url, function (error, message) {
        if (error) {
            console.error(error);
            message = String(error);
        }
        if (!message) {
            message = 'Success!';
        }
        res.redirect(urlFormat({
            pathname: '/',
            query: {
                message: message
            }
        }))
    });
});
app.listen(3000, function (err) {
    if (err) {
        throw err;
    }
    console.log('now listening on port', 3000);
});
