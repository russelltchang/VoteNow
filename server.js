var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongo')(session);
var url = process.env.MONGOLAB_URI || process.env.MONGODB_URI;
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist')); 
app.use(session({secret: process.env.SESSIONS_SECRET, resave: false, saveUninitialized: false, store: new MongoStore({url: url})}));

app.get('/', (req, res) => {
    console.log('/home '+ req.session.id);
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.post('/signup', (req, res) => {
    MongoClient.connect(url, function(err, database) {
        database.db('voting').collection('users').find({"username" : req.body.username}).toArray(function(err, data) {
            if (err) {console.log('Error finding username');}
            if (data.length < 1) {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    database.db('voting').collection('users').insert({
                        'username' : req.body.username,
                        'password' : hash
                    });
                });
                req.session.regenerate(()=>{
                    req.session.isLoggedIn = true;
                    req.session.username = req.body.username;
                    res.send(req.session.isLoggedIn);
                    console.log('signup success ' + req.sessionID);
                });
            }
        });
    });
});

app.post('/login', (req, res)=>{
    MongoClient.connect(url, function(err, database) {
        database.db('voting').collection('users').find({"username" : req.body.username}).toArray(function(err, data) {
            if (err) {console.log('Error finding username');}
            else if (data.length === 1) {
                bcrypt.compare(req.body.password, data[0].password, function(err, isMatch) {
                    if (isMatch) {
                        req.session.regenerate(()=>{
                            req.session.isLoggedIn = true;
                            req.session.username = req.body.username;
                            res.send(req.session.isLoggedIn);
                            console.log('login success ' + req.sessionID);
                        });
                    } else {res.send('Incorrect Password');}
                });
            } else if (data.length < 1) {res.send('No Username Found');}
        });
    });
});

app.post('/createpoll', (req, res) => {
    if (req.session.isLoggedIn) {
        MongoClient.connect(url, function(err, database) {
             if (err) console.log('Error inserting into database');
             console.log('/createpoll ' + req.sessionID);
             database.db('voting').collection('polls').insert({
                 'title' : req.body.title,
                 'username' : req.session.username,
                 'options' : req.body.options,
                 'count' : req.body.count
             });
        });
        res.send(true);
    }
});

app.get('/logout', (req, res)=>{
    if (req.session.isLoggedIn) {
        req.session.destroy(()=>{
            console.log('/logout after destroy ' + req.sessionID);
            res.clearCookie('connect.sid');
            res.send(false);        
        });
    }
});

app.get('/polls', (req, res)=>{
    console.log('/polls ' + req.sessionID);
    MongoClient.connect(url, function(err, database) {
        database.db('voting').collection('polls').find({}).toArray(function(err, data) {
            if (err) console.log(err);
            res.send(data);
        });
    });
});

app.get('/mypolls', (req, res)=>{
    if (req.session.isLoggedIn) {
        console.log('/mypolls ' + req.sessionID);
        MongoClient.connect(url, function(err, database) {
            database.db('voting').collection('polls').find({'username' : req.session.username}).toArray(function(err, data) {
                if (err) console.log(err);
                res.send(data);
            });
        });
    }
});

app.get('/poll/:id', (req, res)=>{
    console.log('/poll/:id ' + req.sessionID);
    var id = req.params.id;
    MongoClient.connect(url, function(err, database) {
        database.db('voting').collection('polls').find({"_id": ObjectId(req.params.id)}).toArray(function(err, data) {
            if(err) console.log(err);
            res.send(data);
        });
    });
});

app.post('/addvote', (req, res)=>{
    if (req.session.isLoggedIn) {
        var title = req.body.title;
        var vote = req.body.vote;
        var index = req.body.index;
        MongoClient.connect(url, function(err, database) {
            database.db('voting').collection('polls').update({"title": title}, {$inc : {['count.' + index] : 1}}    );
            database.db('voting').collection('polls').find({"title": title}).toArray(function(err, data) {
                if (err) console.log(err);
                res.send(data);
            });
        });
    }
});

var port = 3000 || process.env.PORT;
app.listen(port, ()=> {
    console.log('App is listening at ' + port);
});