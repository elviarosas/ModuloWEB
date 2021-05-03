const express = require('express')
const editarpreguntaRouter = express.Router()
const axios = require('axios');
const { response } = require('express');

editarpreguntaRouter.get('/:id', async (req,res)=>{

    const { id } = req.params 

    try{
        const webAPIGroups = await axios.get(`http://${process.env.WEBAPI}/api/getGroups`) 
        const webAPILevel = await axios.get(`http://${process.env.WEBAPI}/api/getLevels`) 
        const webAPIPregunta = await axios.get(`http://${process.env.WEBAPI}/api/getQuestion/${id}`) 



        //console.log(webAPIGroups.data)
        res.render('editarpregunta', { grupos: webAPIGroups.data, levels: webAPILevel.data, pregunta: webAPIPregunta.data , user: req.user})
    
        } catch(err){
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else if (err.request){
                    console.log(err.request)
            } else{
                console.error('Error', err.message)
            }
        }  


});

editarpreguntaRouter.post('/:id', async(req,res)=>{

    //res.render('editarpregunta')

    //console.log(req.params.id)
    try{
        const {id} = req.params

        const { grupo, nivel, pregunta, imagen } = req.body

        await axios.put(`http://${process.env.WEBAPI}/api/updateQuestion/${id}`, { 
            question_id : id,
            level_id: nivel,
            group_id: grupo,
            question_desc: pregunta,
            question_image: imagen
            })
            .then(function (res) {
                console.log(res);
            })
            .catch(function(err) {
                console.log('error: ', err);
                res.sendStatus(500);
            });
         
        } catch(err){
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else if (err.request){
                    console.log(err.request)
            } else{
                console.error('Error', err.message)
            }
        }  
    //res.redirect('home')
  res.redirect('/bancopreguntas')

    

})


module.exports = editarpreguntaRouter