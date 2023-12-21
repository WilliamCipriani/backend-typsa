const mongoose = require('mongoose');

// Esquema para el contenido individual del rinconGourmet
const contenidoSchema = new mongoose.Schema({
    type: { type: String, enum: ['image', 'list', 'paragraph', 'url'] },
    src: String,
    alt: String,
    items: [String],
    text: String
}, { _id: false });

// Esquema principal para rinconGourmets
const rinconGourmetSchema = new mongoose.Schema({
    id: String,
    title: String,
    subtitle: String,
    imageFirst: String,
    imageAvatar: String,
    author: String,
    area: String,
    dateCreated: Date,
    summary: String,
    direction: String,
    content: [contenidoSchema]
});

const RinconGourmet = mongoose.model('RinconGourmet', rinconGourmetSchema);

module.exports = RinconGourmet;
