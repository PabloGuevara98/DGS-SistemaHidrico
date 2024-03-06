// models/NivelAgua.js
const mongoose = require('mongoose');

const NivelAguaSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

//metodo estatico para obtener el ultimo nivel de agua

NivelAguaSchema.statics.getUltimoNivel = function() {
    return this.findOne().sort('-timestamp').select('value').exec();
};

module.exports = mongoose.model('NivelAgua', NivelAguaSchema);