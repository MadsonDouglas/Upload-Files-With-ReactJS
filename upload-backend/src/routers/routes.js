const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const multerConfig = require('./../config/multer')
const sqlite = require('sqlite')

const conn = sqlite.open('database.sqlite',{Promise})

router.get('/posts', async(req, res)=>{
    const db = await conn
    const dados = await db.all(`SELECT * FROM uploads;`)
    return res.json(dados)
    db.close
})

router.post('/posts', multer(multerConfig).single('file'), async(req, res) => {
    const db = await conn

    const exec = await db.run(`INSERT INTO uploads('name','size','key','url') VALUES ('${req.file.originalname}','${req.file.size}','${req.file.filename}','${path.join(__dirname, '..', '..', 'tmp', 'uploads')}\\${req.file.filename}');`)
    
    return res.json({
        "ultimoID":exec.lastID,
        "fileName": req.file.originalname,
        "caminho": `${path.join(__dirname, '..', '..', 'tmp', 'uploads')}\\${req.file.filename}`
    })
    db.close
})

router.delete('/posts/:id', async(req, res)=>{
    const db = await conn
    const stmt = await db.run(`DELETE FROM uploads WHERE id=${req.params.id};`)
    res.send(stmt) 
})


module.exports = router