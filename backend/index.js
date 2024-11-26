const { insertData, getData , deleteData, insertDataRol, getDataRol} = require('./services/items');
const express = require('express')
const cors = require('cors')
const login = require('./services/login')

const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())

app.get('/', function (req, res) {
    res.json({message: 'Hola Mundo!'})
})

app.get('/login', async function(req, res, next) {
    console.log(req.query)
    console.log(req.query.user)
    console.log(req.query.password)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

app.listen(port)
console.log('API escuchando en el puerto ' + port)


app.get('/addItem', async function(req, res, next) {
    try {
        res.json(await insertData(req))
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
        next(err);
    }
   })

   app.get('/addItemRol', async function(req, res, next) {
    try {
        res.json(await insertDataRol(req))
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
        next(err);
    }
   })


   app.get('/getItems', async function(req, res, next) {
    try {
        res.json(await getData(req))
    } catch (err) {
        console.error(`Error while getting items `, err.message);
        next(err);
    }
    })

    app.get('/getItemsRol', async function(req, res, next) {
        try {
            res.json(await getDataRol(req))
        } catch (err) {
            console.error(`Error while getting items `, err.message);
            next(err);
        }
        })


    app.get('/deleteItem', async function(req, res, next) {
    try {
        res.json(await deleteData(req))
    } catch (err) {
        console.error(`Error while deleting items `, err.message);
        next(err);
    }
    })

    
    