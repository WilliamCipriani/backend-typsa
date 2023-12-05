const express = require ('express')
const router = express.Router()

const Curso = require('../models/curso')

router.get('/', async (req, res) => {
    try{
        const arrayCursosDB = await Curso.find()
        console.log(arrayCursosDB)

        res.render("curso", {
            arrayCursos: arrayCursosDB
        })

    }catch (error) {
        console.log(error)
    }
})