var users = {
    'Joe': ['Guitar', 'Magic the Gathering', 'Generally being nerdy'],
    'David': ['Reading', 'Traveling', 'Go for it'],
    'DJ': ['Body Painting'],
    'Sonia': ['Photography', 'Writing', 'Drawing']
};

var http = require('http');
var server = http.createServer();
var express = require('express');
var pipeline = express();
var bodyParser = require('body-parser');
var swig = require('swig');

server.listen(1337);

server.on('request', pipeline);

pipeline.engine('html', swig.renderFile);
pipeline.set('view engine', 'html');
pipeline.set('views', __dirname + '/views');

pipeline.use(express.static(__dirname + '/js'));

pipeline.use(bodyParser.urlencoded());

pipeline.use(function (req, res, next) {
    req.joe = 'Yup'; // req.joe is now accessible by all following middleware in the pipeline.
    setTimeout(function () {
        next();
    }, 1000);
});


pipeline.get('/user/:userName', function (req, res) {

    var name = req.params.userName;
    var userLikes = users[name];

    res.render('user', {
        user: {
            name: name,
            likes: userLikes
        }
    });

});

