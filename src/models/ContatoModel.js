const mongoose = require('mongoose');
const validator = require('validator');
const { use } = require('../../routes');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function () {
    this.validar();

    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);

};

Contato.prototype.validar = function () {
    this.cleanUp();
    // Validação 

    // Email precisa ser válido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    if (!this.body.email && !this.body.telefone) this.errors.push('Preencha pelo menos um contato: email ou telefone.');
};

Contato.prototype.cleanUp = function () {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        telefone: this.body.telefone,
        email: this.body.email,
    }

};

Contato.prototype.edit = async function (id) {
    if (typeof id !== 'string') return;
    this.validar();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};

// MÉTODOS ESTÁTICOS
Contato.buscarPorId = async function (id) {
    if (typeof id !== 'string') return;

    const contato = await ContatoModel.findById(id);
    return contato;
};

Contato.buscarContatos = async function () {
    const contatos = await ContatoModel.find()
        .sort({ criadoEm: -1 });
    return contatos;
};

Contato.delete = async function (id) {
    if (typeof id !== 'string') return;

    const contato = await ContatoModel.findByIdAndDelete(id);
    return contato;
};

module.exports = Contato;
