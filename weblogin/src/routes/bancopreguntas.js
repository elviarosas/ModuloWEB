const express = require('express')
const bancopreguntasRouter = express.Router()
const axios = require('axios')

bancopreguntasRouter.get('', async (req,res)=>{

    try{
        const webAPI = await axios.get(`http://${process.env.WEBAPI}/api/getQuestions`) 
        console.log(webAPI.data)
        res.render('bancopreguntas', { preguntas: webAPI.data, user: req.user})
    
    } catch(error){
        console.log(error)
    }


});


module.exports = bancopreguntasRouter