$(document).ready(function () {
    var captchaAnswer = 0;
    var captchaQuestion = $('#captcha-question');
    var captchaInput = $('#contact-captcha');
    var contactForm = $('#contact-form');

    function createCaptcha() {
        var first = Math.floor(Math.random() * 9) + 1;
        var second = Math.floor(Math.random() * 9) + 1;
        captchaAnswer = first + second;
        captchaQuestion.text(first + ' + ' + second);
        captchaInput.val('').removeClass('is-invalid');
        $('#captcha-help').text('Solve the math problem to send your message.').removeClass('captcha-error');
    }

    if (!contactForm.length) return;
    createCaptcha();
    $('#captcha-refresh').on('click', createCaptcha);
    contactForm[0].addEventListener('submit', function (event) {
        var enteredAnswer = Number(captchaInput.val());
        if (enteredAnswer !== captchaAnswer) {
            event.preventDefault();
            event.stopImmediatePropagation();
            createCaptcha();
            captchaInput.addClass('is-invalid').focus();
            $('#captcha-help').text('Incorrect answer. Please solve the new check.').addClass('captcha-error');
        }
    }, true);
});
