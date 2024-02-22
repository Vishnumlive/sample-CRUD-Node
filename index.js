const express = require("express"); 
const router = require("./router");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require("./model/user");

dotenv.config();

const PORT = 8000;

const app = express();

app.listen(PORT, async () => {
    console.log(`Server up on the port ${PORT}`);
});

const MongoStore = require('connect-mongo');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(()=> {
    console.log("Connected to MongoDb")
})
.catch((err) => {
    // console.log(process.env.MONGODB_URL);
    console.log(err);
})
const db = mongoose.connection;
//console.log(db.client.s.url+" This is the url");

// app.use(cors());

app.use(cors({
    origin : "http://localhost:3000", 
    credentials: true, 
  }));


app.use(express.json());

app.use(express.urlencoded({ extended : false}));

app.use(session({
    secret : "foo",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongoUrl: db.client.s.url})
}))


const strategy = new LocalStrategy(User.authenticate())
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());


// app.post("/login", passport.authenticate("local",{
//     failureRedirect : "/login-failure",
//     successRedirect : "/login-success"
// }), (err, req, res, next) => {
//     if(err) res.send(err); //next(err);
// })

app.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login-failure', 
    successRedirect: '/login-success'
  }), (err, req, res, next) => {
    if (err) next(err);
  });

// app.get('/login-success', (req, res, next) => {
//     console.log(req.session);
//     res.send('Login Attempt was successful.');
//   });
  
  

app.use(router);



