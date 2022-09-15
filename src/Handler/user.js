const { log } = require("console")
const { json } = require("express")
const Http = require('../exception/HTTPException')
const fs = require(`fs`)
const { encode } = require("querystring")
const { Http2ServerRequest } = require("http2")

const HTTPErr = Http()

const GetUserData = (req, res)=>{
    let  data = fs.readFileSync("G:/MOBILE_NON_DEP/secssion 3 middlevare-CRUD/test/src/data/usersData.json", {encoding:'utf8'})
    data = JSON.parse(data)
    res.json(data)
}
const GetUserDataById = (req, res, next)=>{
    let  data = fs.readFileSync("G:/MOBILE_NON_DEP/secssion 3 middlevare-CRUD/test/src/data/usersData.json", {encoding:'utf8'})
    data = JSON.parse(data)
    let newData = data.find(user=>user.id === req.params.id)
    if(newData){
        res.json(newData)
    }
    else res.json({"message":"id not found"})
}
const CreateUser = (req, res)=>{
    let  data = fs.readFileSync("G:/MOBILE_NON_DEP/secssion 3 middlevare-CRUD/test/src/data/usersData.json", {encoding:'utf8'})
    data = JSON.parse(data)
   
    let newUser = {
        "id":req.body.id,
        "name":req.body.name,
        "password":req.body.password
    }
    let check = data.find(obj =>obj.id ===newUser.id)
    console.log(check);
    if(check === undefined){
        //invole logic
        //email unique
        //pass >8 char

        //got wrong logic
        thow new Http2ServerRequest()


        data.push(newUser)
        data = JSON.stringify(data,null,4)
        fs.writeFileSync("G:/MOBILE_NON_DEP/secssion 3 middlevare-CRUD/test/src/data/usersData.jsonon", data, {encoding:"utf8"})
        res.json(`create successfuly!!`)
        
    }
    else res.json("user has been created before")
    
}
const UpdateUser = (req, res)=>{
    let  data = fs.readFileSync("G:/MOBILE_NON_DEP/secssion 3 middlevare-CRUD/test/src/data/usersData.json", {encoding:'utf8'})
    data = JSON.parse(data)
    console.log(data);
    let newUserUpdate ={
        "id":req.body.id,
        "name":req.body.name
    }
    let newData = data.find(user=>user.id === req.body.id)
    if(newData){
        data = data.map(obj => {if(obj.id === newUserUpdate.id){
            return newUserUpdate
        }else return obj})
        data = JSON.stringify(data)
        fs.writeFileSync("G:/MOBILE_NON_DEP/secssion 3 middlevare-CRUD/test/src/data/usersData.json", data, {encoding:"utf8"})
        res.json("Update Successfuly")
    }
    else res.json({"message":"id not found"})
}
const DeleteUserById =(req, res)=>{
    let  data = fs.readFileSync("G:/MOBILE_NON_DEP/secssion 3 middlevare-CRUD/test/src/data/usersData.json", {encoding:'utf8'})
    data = JSON.parse(data)
    console.log(data);
    let userDelete = data.find(user=>user.id === req.body.id)
    if(userDelete){
        let index = data.indexOf(userDelete)
        for(let i = index;i<data.length-1;i++){
            data[i] = data[i+1]
        }
        data.pop()
        data = JSON.stringify(data)
        fs.writeFileSync("G:/MOBILE_NON_DEP/secssion 3 middlevare-CRUD/test/src/data/usersData.json", data, {encoding:"utf8"})
        res.json("delete Successfuly!!")
    }
    else res.json({"message":"id not found"})
} 
module.exports = {
    GetUserData,
    GetUserDataById,
    UpdateUser,
    CreateUser,
    DeleteUserById
}