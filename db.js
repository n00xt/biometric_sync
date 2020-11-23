const mysql = require('mysql')

const con  = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword",
    database: "mydb"
});


function callSqlQuery (query, values) {
    return new Promise(function (resolve, reject) {
        con.connect(function (error) {
            if (error) reject(error)
            con.query(query, values, function (error, result) {
                if (error) reject(error)
                resolve(result)
            })
        })
    })
}

module.exports.loadOsobneCisla = async () => {
    let query = 'SELECT pernum from clovek'
    return await callSqlQuery(query)
}

module.exports.saveToBiometricDochadzka = async (ludia) => {
    let query = 'INSERT INTO users (id, meno, priezvisko) VALUES ?'
    return await callSqlQuery(query)
}

module.exports.saveToBiometricStrava = async (ludia) => {
    let query = 'INSERT INTO BALKO.INVENTURA_202011 (id, meno, priezvisko) VALUES ?'
    return await callSqlQuery(query)
}