const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function insertData (req, res) {
const data = req.query
const result = await db.query(
    `insert into coleccion(nombre,marca,tipo,precio) values(?,?,?,?)`, 
    [data.nombre, data.marca, data.tipo, data.precio]
)
 return result.affectedRows
}

async function insertDataRol (req, res) {
    const data = req.query
    const result = await db.query(
        `insert into usuarios(nombre,login,password,rol) values(?,?,?,?)`, 
        [data.nombre, data.login, data.password, data.rol]
    )
     return result.affectedRows
    }

    async function insertDataPrestamo (req, res) {
        const data = req.query
        const result = await db.query(
            `insert into prestamos(articulo, persona, fecha) values(?,?,?)`, 
            [data.articulo, data.persona, data.fecha]
        )
         return result.affectedRows
        }

async function getData (req, res) {
    const rows = await db.query(
    `Select * from coleccion`
    )
    const data = helper.emptyOrRows(rows)
return {
    data
}
}

async function getDataRol (req, res) {
    const rows = await db.query(
    `Select * from usuarios`
    )
    const data = helper.emptyOrRows(rows)
return {
    data
}
}
async function getDataPrestamo (req, res) {
    const rows = await db.query(
    `Select * from prestamos`
    )
    const data = helper.emptyOrRows(rows)
return {
    data
}
}



async function deleteData (req, res) {
    const data = req.query
    const result = await db.query(
    `Delete from coleccion where id = ${data.id}`
 )
 return result.affectedRows
}


module.exports = {
    getData,
    insertData,
    deleteData,
    insertDataRol,
    getDataRol,
    insertDataPrestamo,
    getDataPrestamo
   }

