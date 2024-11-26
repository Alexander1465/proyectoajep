//Credenciales de la base de datos
const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "",
        database: "bdgestion", // Base de datos
        port: 3306,
        connectTimeout: 60000
    },
  }
  
  //Exportamos config para poder usarlo en otro archivo
  module.exports = config;