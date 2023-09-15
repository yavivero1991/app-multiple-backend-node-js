const mongoose = require('mongoose')

const dbConnect = () => {
    const db_uri = process.env.DB_URI
    mongoose.connect(db_uri).then((res) => {
        console.log(' ===> Successful connection! <===')
    }).catch((err)=>{
        console.log('===> Conection error! <===', err)
    }).finally(() => {
        
    })
}

module.exports = dbConnect