const express = require('express')
const registroRouter = express.Router()
const axios = require('axios')
//const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

registroRouter.get('', async(req,res)=>{

    try{
        const webAPIGroups = await axios.get(`http://${process.env.WEBAPI}/api/getGroups`) 
        const webAPITipo = await axios.get(`http://${process.env.WEBAPI}/api/getUserTypes`) 
        

        //console.log(webAPIGroups.data)
        res.render('registro', { grupos: webAPIGroups.data, tipo_usuario: webAPITipo.data, user: req.user})
    
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

registroRouter.post('', async (req, res) =>{

try{
        const { username, password, tipo_usuario, grupo } = req.body

        //const hashPassword = await bcrypt.hash(password, 10)

        console.log(req.body)
        //console.log(hashPassword)

        await axios.post(`http://${process.env.WEBAPI}/api/addUser`, { 
            user_name: username,
            password: password,
            group_id: grupo,
            user_type_id: tipo_usuario,
            created_by: "1"
            })

            res.redirect('usuarios')

    }catch (err){
        console.log(err)
    }
    //res.redirect('home')
    
    //res.send("Usuario dado de alta")
})


module.exports = registroRouter