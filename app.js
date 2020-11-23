const db = require('./db')
const Parser = require('node-dbf').default

let parser = new Parser('sample.dbf');
let ludia = []
let osobneCisla = []

parser.on('start', (p) => {
    console.log('Začiatok spracovania DBF súboru...');

    // console.log('Načítavanie osobných čísiel z DB...')
    // db.loadOsobneCisla().then(data => {
    //     osobneCisla = data
    //     console.log('Načítavanie osobných čísiel z DB ukončené.')
    // })
});

parser.on('header', (h) => {
    console.log('Hlavička DBF súboru bola spracovaná.');
});

parser.on('record', (record) => {
    if (osobneCisla.map(function(e) { return e.CUST_NO; }).indexOf(record.CUST_NO) === -1){
        ludia.push([record.CUST_NO, record.NAME, record.STREET])
    }

});

parser.on('end', (p) => {
    console.log('vvv------------------------ZÁZNAMY------------------------vvv')
    console.log(ludia);
    console.log('^^^------------------------ZÁZNAMY------------------------^^^')
    // db.saveToBiometricDochadzka(ludia).then( data => {
    //     console.log("Počet vložených záznamov: " +data.affectedRows)
        ludia = []
        osobneCisla = []
    // })
});

setInterval(() => {
    parser.parse();
}, 10000)