var express=require("express");
var passport=require('passport');
var FacebookStrategy=require('passport-facebook').Strategy;
var app=express();
var fbConfig=require('./creds.js');

app.use(passport.initialize());
app.use(passport.session());
  
app.listen(process.env.PORT || 5000,function(){
	console.log("running..");
});

passport.serializeUser(function(user,done){
	done(null,user);
});

passport.deserializeUser(function(obj,done){
	done(null,obj);
});

passport.use(new FacebookStrategy({
		clientID:fbConfig.appID,
		clientSecret:fbConfig.appSecret,
		callbackURL:fbConfig.callbackUrl
	},
	function(){
			process.nextTick(function(){
				return done(null,profile);
			});
	}
));


app.get('/',function(req,res){
	res.sendFile(__dirname+"/index.html");
});

app.get('/auth/facebook',
	passport.authenticate('facebook'),
	function(req,res){}
);

app.get('/auth/facebook/callback',passport.authenticate('faacebook',{failureRedirect:'/'}),function(req,res){
	console.log("incoming...");
	res.redirect('/logged');
});

app.get('/logged',ensure,function(req,res){
	console.log("incoming..");
	console.log(req.user);
});

function ensure(req,res,next){
	if(req.isAuthenticated())
	{
		return next();
	}
	else
	{
		res.redirect('/');		
	}

};