const express = require('express')
const app = express()

const axios = require('axios')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
var formidable = require("formidable");
var fs = require("fs");
const path = require('path')

//port = 8000

const initPassport = require('./passport-config')

//Static files
app.use(express.static('src/public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/images',express.static(__dirname + 'public/images'))
app.use('/game',express.static(__dirname + 'public/game'))


//Template engine
app.set('view engine', 'ejs')
app.set('views','./src/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Configuración para Passport
initPassport(passport)
app.use(flash())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Inicio Rutas
app.get('/', validaAutentificacion, (req,res) =>{
    res.render('home', {user: req.user});
})

app.get('/login', validaNoAutentificacion, (req,res) =>{
    res.render('login')
})

app.post('/login', validaNoAutentificacion, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.delete('/logout', (req, res) =>{
    req.logOut()
    res.redirect('/login')
})

app.get('/juego', (req,res) =>{
    res.render('juego', {user: req.user});
})

app.get('/pruebagrafica', (req,res) =>{
    res.render('pruebagrafica', {user: req.user});
})

app.get('/altaimagen', (req,res) =>{
    res.render('altaimagen');
})


app.post("/upload", (req, res) => {

    
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
      
            var oldPath = files.file.path;
            var newPath = path.join(__dirname, 'src/public/images')
                    + '/'+files.file.name
            var rawData = fs.readFileSync(oldPath)
          
            fs.writeFile(newPath, rawData, function(err){
                if(err) console.log(err)
                return res.send("Successfully uploaded")
            })
      })
});








//Routes

const registroRouter = require('./src/routes/registro')
app.use('/registro', validaAutentificacion, registroRouter)

const bancopreguntasRouter = require('./src/routes/bancopreguntas')
app.use('/bancopreguntas', validaAutentificacion, bancopreguntasRouter)

const nuevapreguntaRouter = require('./src/routes/nuevapregunta')
app.use('/nuevapregunta', validaAutentificacion, nuevapreguntaRouter)

const editarpreguntaRouter = require('./src/routes/editarpregunta')
app.use('/editarpregunta', validaAutentificacion, editarpreguntaRouter)

const usuariosRouter = require('./src/routes/usuarios')
app.use('/usuarios', usuariosRouter)

function validaAutentificacion(req,res,next){
    if (req.isAuthenticated()){
        return next()    
    }
    res.redirect('/login')
}

function validaNoAutentificacion(req,res,next){
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(port, ()=>console.log(`Escuchando en el puerto ${port}`))