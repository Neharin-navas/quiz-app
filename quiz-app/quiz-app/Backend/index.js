//import json server

const jsonServer = require('json-server')

//backend application

const restServer = jsonServer.create()

//router

const router = jsonServer.router()

//middleware

const middleware = jsonServer.defaults()

//ports

const port = 3001


//use

restServer.use(router)
restServer.use(middleware)

//listen

restServer.listen(port,()=>{
    console.log('the server is listening' + port);
    
})