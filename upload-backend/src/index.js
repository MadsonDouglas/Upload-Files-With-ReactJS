const express = require('express')
const morgan = require('morgan')
const sqlite = require('sqlite')
const cors = require('cors')

const conn = sqlite.open('database.sqlite',{Promise})

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))


app.use(require('./routers/routes'))


const init = async()=>{
    const db = await conn
    await db.run('CREATE TABLE IF NOT EXISTS uploads (id INTEGER PRIMARY KEY, name TEXT, size NUMBER, key TEXT, url TEXT);');
    // const cate = 'Market Team'
    // await db.run(`INSERT INTO categorias('categoria') VALUES('${cate}');`)
}
init()


app.listen('3001', () => {
    console.log('Server rodando')
})