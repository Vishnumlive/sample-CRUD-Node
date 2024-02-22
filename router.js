const router = require("express").Router();


const { getCustomers,createCustomer,updateCustomer,deleteCustomer,getSingleCustomer } = require("./controllers/Customers");

const { registerUser,loginFailure, loginSuccess, logoutUser } = require("./controllers/Users");

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        
        next();
    } else{
        res.json({ message: 'auth-failed' })
    }
}

router.get("/", (req, res) => {
    res.send("Let's build a CRUD API");
});

router.post("/register", registerUser);

router.get("/login-failure", loginFailure);

router.get("/login-success", loginSuccess);

router.post("/logout", logoutUser);


router.get("/customers", checkAuthentication , getCustomers);

router.post("/addCustomer", checkAuthentication , createCustomer);

router.get("/customer/:custId", checkAuthentication , getSingleCustomer);

router.put("/customer/:custId", checkAuthentication , updateCustomer);

router.delete("/deleteCustomer/:custId", checkAuthentication , deleteCustomer);

module.exports = router;