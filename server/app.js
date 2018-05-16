var mongoose = require('mongoose');
var passport = require('passport');
require('./models/user');
require('./passport')(passport);

mongoose.connect('mongodb://localhost/passport-example', 
  function(err, res) {
    if(err) throw err;
    console.log('Conectado con Ã©xito a la BD');
});

app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(express.session({ secret: 'secretkey' }));

// Configuración de Express
app.use(passport.initialize());
app.use(passport.session());

// Rutas de Passport
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', 
    failureRedirect: '/login' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', 
    failureRedirect: '/login' }));


exports.index = function(req, res){
  res.render('index', { 
    title: 'Passport-Example',
    user: req.user
  });
};