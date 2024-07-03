const mongoose = require('mongoose')

async function main(){
    try {
        await mongoose.connect('mongodb://localhost/registration')
        console.log('Conectado ao mongo')
    } catch (err) {
        console.log(`Erro: ${err}`)
    }
}

module.exports = main