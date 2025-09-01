document.addEventListener('DOMContentLoaded', function() {

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

    const countdownContainer = document.getElementById('countdown-container');
    const formContainer = document.querySelector('.form-container');
    
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 15, 0, 0, 0);
    const countDownDate = targetDate.getTime();

    const interval = setInterval(function() {
        const currentTime = new Date().getTime();
        const distance = countDownDate - currentTime;

        if (distance > 0) {
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
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        dateInput.value = formattedDate;
    }

    const institutionInput = document.getElementById('institution');
    const studentStatusRadios = document.querySelectorAll('input[name="student-status"]');
    const form = document.querySelector('.form-container form');
    const cpfInput = document.getElementById('cpf');
    const phoneInput = document.getElementById('phone');

    function toggleInstitutionField() {
        const selected = document.querySelector('input[name="student-status"]:checked');
        
        if (institutionInput && selected) {
            switch(selected.value) {
                case 'if':
                    institutionInput.value = 'Instituto Federal de Educação, Ciência e Tecnologia do Ceará';
                    institutionInput.disabled = true;
                    institutionInput.required = true;
                    break;
                case 'other':
                    institutionInput.value = '';
                    institutionInput.disabled = false;
                    institutionInput.required = true;
                    break;
                case 'none':
                    institutionInput.value = '';
                    institutionInput.disabled = true;
                    institutionInput.required = false;
                    break;
            }
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
        cpf = String(cpf).replace(/[^\d]+/g, '');
        if (cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.substring(9, 10))) {
            return false;
        }
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.substring(10, 11))) {
            return false;
        }
        return true;
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            if(cpfInput) {
                const isCpfValid = validateCPF(cpfInput.value);
                if (!isCpfValid) {
                    cpfInput.setCustomValidity('Por favor, insira um CPF válido.');
                } else {
                    cpfInput.setCustomValidity('');
                }
            }

            if (form.checkValidity()) {
                alert('Inscrição enviada com sucesso!');
                form.reset();
                toggleInstitutionField();
            } else {
                form.reportValidity();
            }
        });
    }
});

