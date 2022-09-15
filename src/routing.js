const express = require('express')
const mainRouter  = express.Router()
const {GetUserData, GetUserDataById, UpdateUser, CreateUser, DeleteUserById} = require('./Handler/user')
mainRouter.use(express.json())
mainRouter.get("/user", GetUserData)
mainRouter.get('/user/:id', GetUserDataById)
mainRouter.post('/user',CreateUser)
mainRouter.put('/user',UpdateUser)
mainRouter.delete("/user",DeleteUserById)

module.exports = mainRouter