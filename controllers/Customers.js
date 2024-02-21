const Customer = require("../model/customer");

// get customer list
const getCustomers = (req, res) =>{
    if (req.isAuthenticated()) {
        
        Customer.find()
        .then(customerList => {
            res.json(customerList);
        })
        .catch( error => {
            res.send(error);
        })

        
    } else {
        res.json({ message: 'You are not authenticated' })
    }

}

// create a customer
const createCustomer = (req, res) => {
    
    const customer = new Customer({
        firstName : req.body.firstName,
        middleName : req.body.middleName,
        lastName : req.body.lastName,
        dateOfBirth : req.body.dateOfBirth,
        status : req.body.status,
    })


    customer.save()
    .then(savedDoc => {

        res.json(savedDoc);
        console.log('Document saved successfully:', savedDoc);
    })
    .catch(error => {
        res.send(error);
        console.error('Error saving document:', error);
    });

}

// update a customer

const updateCustomer = (req, res) => {
    
    Customer.findOneAndUpdate(
        { _id : req.params.custId },
        {
            $set: {
                firstName : req.body.firstName,
                middleName : req.body.middleName,
                lastName : req.body.lastName,
                dateOfBirth : req.body.dateOfBirth,
                status : req.body.status,
                updatedAt: new Date()
            }
        },
        { new: true }
    )
    .then(updatedRes => {
        res.json(updatedRes);
    })
    .catch(error => {
        res.send(error);
    })
}

// delete a customer

const deleteCustomer = (req, res) => {
    Customer.deleteOne(
        { _id : req.params.custId }
    )
    .then( () => res.json({ message : "User deleted"}))
    .catch( error => res.send(error))
}

// get a single customer detail

const getSingleCustomer = (req, res) => {
    Customer.findOne(
        {_id : req.params.custId }
    )
    .then((userDetail)=>{
        res.json(userDetail);
    })
    .catch((err) => {
        res.send(err);
    })
}


module.exports = {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getSingleCustomer
}