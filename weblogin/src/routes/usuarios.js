const express = require('express')
const usuariosRouter = express.Router()
const axios = require('axios')

usuariosRouter.get('', async(req,res)=>{

//res.render('usuarios')

try{
    const webAPI = await axios.get(`https://${process.env.WEBAPI}/getUsers`) 
    //console.log(webAPI.data)
    res.render('usuarios', { users: webAPI.data, user: req.user})

    } catch(error){
        console.log(error)
    }
    
})



module.exports = usuariosRouter