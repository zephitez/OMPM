//app/routes.js
module.exports = function(app, passport) {

  //HOME PAGE (with login links)
  app.get('/', function(req, res) {
    res.render('pages/index', {
      title: 'Home',
      user: req.user
    }); //load the index.ejs file
  });



  // About Page
  app.get('/about', function(req, res) {
    res.render('pages/about', {
      title: 'About'
    }); //load the index.ejs file
  });


  //show login form
  app.get('/login', function(req, res) {
    res.render('pages/login', {
      title: 'Login',
      message: req.flash('loginMessage'),
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  //signup

  //show signup forms
  app.get('/signup', function(req, res) {
    //render the page and pass in any flash stuff
    res.render('pages/signup', {
      title: 'Sign Up',
      message: req.flash('signupMessage'),
    });
  });

  //process the signup forms
  app.post('/signup',  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  //DASHBOARD SECTION- show upon log in

  app.get('/dashboard', //isLoggedIn,
  function(req, res) {
    res.render('pages/dashboard', {
      title: 'Dashboard',
      message: req.flash('authMessage'),
      user: req.user //get the user out of  session and pass to template
    });
  });

  app.get('/dashboard/*', //isLoggedIn,
  function(req, res) {
    res.render('pages/dashboard', {
      title: 'Username',
      message: req.flash('authMessage'),
      user: req.user //get the user out of  session and pass to template
    });
  });

//if they go to logout page, log them out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};

//Logouttttt

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())

    return next();

  //if not auth then redirect to homepage
  res.redirect('/');
}
