const router = require("express").Router();


const { getCustomers,createCustomer,updateCustomer,deleteCustomer } = require("./controllers/Customers");

router.get("/", (req, res) => {
    res.send("Let's build a CRUD API");
});



router.get("/customers", getCustomers);

router.post("/addCustomer", createCustomer);

router.put("/customer/:custId", updateCustomer);

router.delete("/deleteCustomer/:custId", deleteCustomer);

module.exports = router;