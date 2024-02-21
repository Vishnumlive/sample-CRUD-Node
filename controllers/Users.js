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
                res.send({message: "success"})
            }
        }
    )

}


const loginFailure = (req, res, next) => {
    // console.log(req.session);
    res.json({message : "failed"});

}

const loginSuccess = (req, res, next) => {
    // console.log(req.session);
    res.json({message : "success"});

}

const logoutUser = (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.json({message : "success"});
    });
};

module.exports = {
    registerUser,
    loginFailure,
    loginSuccess,
    logoutUser
}