const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cursoSchema = new Schema({
    curso: String,
    duracion: Number

})

const Curso = mongoose.model('Curso', cursoSchema)

module.exports = Curso;