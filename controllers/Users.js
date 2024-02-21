const User = require("../model/user");

const registerUser = (req, res) => {

    User.register(
        new User({
            email: req.body.email,
            username: req.body.username
        }),
        req.body.password,
        function (err,msg){
            if(err){
                res.send(err);
            } else {
                res.send({message: "Successful"})
            }
        }
    )

}


const loginFailure = (req, res, next) => {
    console.log(req.session);
    res.send("Login attempt failed");

}

const loginSuccess = (req, res, next) => {
    console.log(req.session);
    res.send("Login attempt successful");

}

const logoutUser = (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.send('Logout successfully');
    });
};

module.exports = {
    registerUser,
    loginFailure,
    loginSuccess,
    logoutUser
}