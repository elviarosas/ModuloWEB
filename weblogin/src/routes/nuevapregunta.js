const express = require('express')
const nuevapreguntaRouter = express.Router()
const axios = require('axios');
const { response } = require('express');
var formidable = require("formidable");
var fs = require("fs");
const path = require('path')

nuevapreguntaRouter.get('', async (req,res)=>{

    try{
        const webAPIGroups = await axios.get(`http://localhost:3001/api/getGroups`) 
        const webAPILevel = await axios.get(`http://localhost:3001/api/getLevels`) 
        

        console.log(webAPIGroups.data)
        res.render('nuevapregunta', { grupos: webAPIGroups.data, levels: webAPILevel.data, user: req.user })
    
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

nuevapreguntaRouter.post('', async (req,res)=>{

    try{

        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
      
            var oldPath = files.file_imagen.path;
            /*var newPath = path.join(__dirname, '../src/public/images')
                    + '/'+files.file_imagen.name*/
            /*var newPath =  __dirname
                    + '/'+files.file_imagen.name*/
            var newPath =  path.dirname(require.main.filename)
                    + '/src/public/images/'+files.file_imagen.name
                    console.log (newPath)
                    

            var rawData = fs.readFileSync(oldPath)
          
            fs.writeFile(newPath, rawData, async function(err){
                if(err) { console.log(err) }
               else{ 
                await axios.post(`http://localhost:3001/api/addQuestion`, { 
                    level_id: fields.nivel,
                    group_id: fields.grupo,
                    question_desc: fields.pregunta,
                    question_image: 'src/public/images/'+ files.file_imagen.name
                    })
        
                res.redirect("/bancopreguntas")

                }
                
            })
      })

        
        /*const { grupo, nivel, pregunta, imagen } = req.body


        await axios.post(`http://${process.env.WEBAPI}/api/addQuestion`, { 
            level_id: nivel,
            group_id: grupo,
            question_desc: pregunta,
            question_image: imagen
            })

        res.redirect("/bancopreguntas")*/


    } catch(err){
        console.log(err)
    }
});

module.exports = nuevapreguntaRouter