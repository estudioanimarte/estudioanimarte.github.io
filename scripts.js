document.addEventListener('DOMContentLoaded', function() {

    // ... (código do menu hamburguer permanece o mesmo)
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('header nav ul li a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
            }
        });
    });
    // ... (fim do código do menu)


    const countdownContainer = document.getElementById('countdown-container');
    const formContainer = document.querySelector('.form-container');
    
    // Contador ajustado para 15 de Setembro de 2025
    const countDownDate = new Date("September 15, 2025 00:00:00").getTime();

    const interval = setInterval(function() {
        const currentTime = new Date().getTime();
        const distance = countDownDate - currentTime;

        if (distance < 0) {
            clearInterval(interval);
            if (countdownContainer) {
                countdownContainer.style.display = 'none';
            }
            if (formContainer) {
                formContainer.style.display = 'block';
            }
            return; 
        }

        if (countdownContainer) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }
    }, 1000);

    const dateInput = document.getElementById('birthDate');
    if (dateInput) {
        // Preenche o campo de data com a data de hoje por padrão
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        dateInput.value = formattedDate;
    }

    const institutionInput = document.getElementById('institution');
    const studentStatusRadios = document.querySelectorAll('input[name="entry.2094310884"]'); 
    const form = document.getElementById('inscription-form');
    const cpfInput = document.getElementById('cpf');
    const phoneInput = document.getElementById('phone');

    function toggleInstitutionField() {
        const selected = document.querySelector('input[name="entry.2094310884"]:checked');
        
        if (institutionInput && selected) {
            switch(selected.value) {
                case 'Sou estudante/servidor do IFCE':
                    institutionInput.value = 'Instituto Federal de Educação, Ciência e Tecnologia do Ceará';
                    institutionInput.disabled = true;
                    institutionInput.required = true;
                    break;
                case 'Outra instituição':
                    institutionInput.value = '';
                    institutionInput.disabled = false;
                    institutionInput.required = true;
                    break;
                case 'Não estudo':
                    institutionInput.value = '';
                    institutionInput.disabled = true;
                    institutionInput.required = false;
                    break;
            }
        } else if (institutionInput) {
             institutionInput.value = '';
             institutionInput.disabled = true;
             institutionInput.required = false;
        }
    }

    studentStatusRadios.forEach(radio => {
        radio.addEventListener('change', toggleInstitutionField);
    });
    toggleInstitutionField();

    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 11);
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 11);
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }

    function validateCPF(cpf) {
        // ... (função de validar CPF permanece a mesma)
        cpf = String(cpf).replace(/[^\d]+/g, '');
        if (cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        return true;
        // ... (fim da função de validar CPF)
    }

    /*******************************************/
    /* FUNÇÃO DE VALIDAR IDADE - VERSÃO CORRETA */
    /*******************************************/
    function validateAge(birthDateString) { // A string vem no formato "YYYY-MM-DD"
        // Pega a data atual
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // Adiciona 1 porque os meses vão de 0 a 11
        const currentDay = today.getDate();

        // Separa a data de nascimento em ano, mês e dia
        const [birthYear, birthMonth, birthDay] = birthDateString.split('-').map(Number);

        // Calcula a idade inicial
        let age = currentYear - birthYear;

        // Verifica se o aniversário já passou no ano corrente.
        // Se o mês atual for menor que o mês de aniversário, ou
        // se for o mesmo mês mas o dia atual for menor, então a pessoa ainda não fez aniversário este ano.
        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
            age--; // Reduz um ano da idade
        }

        return age >= 16;
    }

    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Validação de CPF
            if (cpfInput) {
                const isCpfValid = validateCPF(cpfInput.value);
                if (!isCpfValid) {
                    cpfInput.setCustomValidity('Por favor, insira um CPF válido.');
                } else {
                    cpfInput.setCustomValidity('');
                }
            }
            
            // Executando a validação de idade com a função corrigida
            if (dateInput) {
                const isAgeValid = validateAge(dateInput.value);
                if (!isAgeValid) {
                    dateInput.setCustomValidity('Você deve ter no mínimo 16 anos para se inscrever.');
                } else {
                    dateInput.setCustomValidity('');
                }
            }

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const formContainer = document.querySelector('.form-container');
            const successMessage = document.getElementById('success-message');
            const submitButton = form.querySelector('button[type="submit"]');

            try {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';

                const formData = new FormData(form);
                const googleFormsURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSethQPetS-gGtyqJgW9WYwwimWqwcfkFE2cVJhjNflLhavbWw/formResponse';

                await fetch(googleFormsURL, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                });

                formContainer.style.display = 'none';
                successMessage.style.display = 'block';

            } catch (error) {
                console.error('Erro ao enviar o formulário:', error);
                alert('Ocorreu um erro ao enviar sua inscrição. Por favor, verifique sua conexão e tente novamente.');
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Inscrição';
            }
        });
    }
});