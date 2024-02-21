const router = require("express").Router();


const { getCustomers,createCustomer,updateCustomer,deleteCustomer,getSingleCustomer } = require("./controllers/Customers");

const { registerUser,loginFailure, loginSuccess, logoutUser } = require("./controllers/Users");

router.get("/", (req, res) => {
    res.send("Let's build a CRUD API");
});

router.post("/register", registerUser);

router.get("/login-failure", loginFailure);

router.get("/login-success", loginSuccess);

router.post("/logout", logoutUser);


router.get("/customers", getCustomers);

router.post("/addCustomer", createCustomer);

router.get("/customer/:custId", getSingleCustomer);

router.put("/customer/:custId", updateCustomer);

router.delete("/deleteCustomer/:custId", deleteCustomer);

module.exports = router;