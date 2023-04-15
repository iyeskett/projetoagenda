import validator from "validator";

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name=nome]');
        const sobrenomeInput = el.querySelector('input[name=sobrenome]');
        const emailInput = el.querySelector('input[name=email]');
        const telefoneInput = el.querySelector('input[name=telefone]');

        const errorNome = document.querySelector('.error-nome');
        const errorSobreome = document.querySelector('.error-sobrenome');
        const errorEmail = document.querySelector('.error-email');
        const errorTelefone = document.querySelector('.error-telefone');
        let error = false;

        const errorsInput = document.querySelectorAll('.error');
        for (const input of errorsInput) {
            while (input.firstChild) {
                input.removeChild(input.firstChild);
            }
        }

        if (nomeInput.value.trim().length === 0) {
            this.criarP(errorNome, 'Obrigatório preencher o nome do contato.');
            error = true;
        }

        if (emailInput.value.length !== 0 && !validator.isEmail(emailInput.value)) {
            this.criarP(errorEmail, 'Email inválido')
            error = true;
        }

        if (emailInput.value.length === 0 && telefoneInput.value.length === 0) {
            this.criarP(errorEmail, 'Obrigatório preencher pelo menos um tipo de contato: email ou telefone');
            this.criarP(errorTelefone, 'Obrigatório preencher pelo menos um tipo de contato: email ou telefone');
            error = true;
        }

        if (!error) return el.submit();
    }

    criarP(el, texto) {
        const p = document.createElement('p');
        p.innerHTML = texto;

        el.style.display = 'block';
        el.append(p);
    }
}