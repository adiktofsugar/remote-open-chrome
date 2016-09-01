var fs = require('fs');
var path = require('path');


function templateRenderer(templatePath) {
    function renderTemplate(req, res, relativePath) {
        var contents = fs.readFileSync(path.join(templatePath, relativePath), 'utf-8');
        res.end(contents);
    }
    return renderTemplate;
}

module.exports = templateRenderer;
