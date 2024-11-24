document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.getElementById('login-link');
    const modal = document.getElementById('login-modal');
    const closeButton = document.querySelector('.close-button');
    const loginForm = document.querySelector('.login-form');

    if(loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if(closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
        });
    }
});