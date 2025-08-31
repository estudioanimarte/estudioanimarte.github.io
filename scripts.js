document.addEventListener('DOMContentLoaded', function() {

    const countdownContainer = document.getElementById('countdown-container');
    const formContainer = document.querySelector('.form-container');
    
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 10, 0, 0, 0);
    const countDownDate = targetDate.getTime();

    const interval = setInterval(function() {
        const currentTime = new Date().getTime();
        const distance = countDownDate - currentTime;

        if (distance < 0) {
            clearInterval(interval);
            countdownContainer.style.display = 'none';
            formContainer.style.display = 'block';
            return; 
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

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

});