const {v4} = require('uuid');

const users = [];

const getAllUsers = (req, res) =>{
    res.send(users);
};

const getUserById = (req, res)=>{
    const foundUser = users.find(user=> user.id===req.params.id);
    res.json(foundUser);
};

const createUser = (req, res)=>{
    const user = req.body;
    users.push({...user, id: v4()});
    res.json(`User details has been added to the database`);
};

const updateUser =  (req, res) =>{
    const {firstname, lastname, age} = req.body;
    const foundUser = users.find(user=> user.id===req.params.id);
    console.log(foundUser);
    if(firstname)foundUser.firstname = firstname;
    if(lastname)foundUser.lastname = lastname;
    if(age)foundUser.age = age;

    res.send(`User ID ${req.params.id} has been updated`);
};

const deleteUser = (req, res)=>{
    let deletedObj;
    const {id} = req.params;
    let getIndex = users.findIndex(user=>user.id === id);
    if(getIndex){
        deletedObj =  users.splice(getIndex,1)
    }
    
    res.send(`User ID ${req.params.id} has been deleted`)
};







module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser}