import validator from 'validator';

export default class Login {
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
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name=email]');
        const passwordInput = el.querySelector('input[name=password]');

        const errorEmailRegister = document.querySelector('.error-email-register');
        const errorSenhaRegister = document.querySelector('.error-senha-register');
        const errorEmailLogin = document.querySelector('.error-email-login');
        const errorSenhaLogin = document.querySelector('.error-senha-login');

        const errorsInput = document.querySelectorAll('.error');
        for (const input of errorsInput) {
            while (input.firstChild) {
                input.removeChild(input.firstChild);
            }
        }

        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            if (el.classList.contains('form-cadastro'))
                this.criarP(errorEmailRegister, 'Email inválido');
            else
                this.criarP(errorEmailLogin, 'Email inválido');
            error = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            if (el.classList.contains('form-cadastro'))
                this.criarP(errorSenhaRegister, 'Senha precisa ter entre 3 e 50 caracteres');
            else
                this.criarP(errorSenhaLogin, 'Senha precisa ter entre 3 e 50 caracteres');
            error = true;
        }

        if (!error) el.submit();
    }

    criarP(el, texto) {
        const p = document.createElement('p');
        p.innerHTML = texto;

        el.style.display = 'block';
        el.append(p);
    }
}