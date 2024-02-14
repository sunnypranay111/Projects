const userRouter = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userControllers');


userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;