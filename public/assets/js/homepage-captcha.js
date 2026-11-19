$(document).ready(function () {
    var captchaCode = '';
    var captchaQuestion = $('#captcha-question');
    var captchaInput = $('#contact-captcha');
    var contactForm = $('#contact-form');

    function createCaptcha() {
        captchaCode = String(Math.floor(1000 + Math.random() * 9000));
        captchaQuestion.text(captchaCode);
        captchaInput.val('').removeClass('is-invalid');
        $('#captcha-help').text('Enter the 4-digit code to send your message.').removeClass('captcha-error');
    }

    if (!contactForm.length) return;
    createCaptcha();
    $('#captcha-refresh').on('click', createCaptcha);
    contactForm[0].addEventListener('submit', function (event) {
        var enteredCode = String(captchaInput.val()).trim();
        if (!/^\d{4}$/.test(enteredCode) || enteredCode !== captchaCode) {
            event.preventDefault();
            event.stopImmediatePropagation();
            createCaptcha();
            captchaInput.addClass('is-invalid').focus();
            $('#captcha-help').text('Incorrect code. Please enter the new 4-digit code.').addClass('captcha-error');
        }
    }, true);
});
