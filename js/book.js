
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateEmai2(email_number) {
    var re1 = /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/;
    return re1.test(String(email_number).toLowerCase());
}
function user_name1(user_name) {
    var name=/^[A-Za-z\s]+$/;
    return name.test(user_name);
}

function sendEmail() {//var $result = $("#result");
    var email = $("#email").val();
    var user_name = $("#name").val();
    var phon_number = $("#phone").val();
    var message = $("#message").val();

    $.ajax({
        method: "POST",
        url: "contact-submit.php",
        dataType: "json",
        data: {
            userName: user_name,
            userPhone: phon_number,
            userEmail: email,
            userMessage: message
        }
    }).done(function( result ) {
        var $resultDiv = $(".contact-result");
        $resultDiv.show();
        $resultDiv.removeClass("text-success text-error");
        if (result.type === "error") {
            $resultDiv.addClass("text-error");
            $resultDiv.text(result.text);
        } else {
            $resultDiv.addClass("text-success");
            $resultDiv.text("Thank you, your message has been sent successfully.");
        }
    });

}

$(document).ready(function () {
    var validator = $('#contact-form').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                number: true
            },
            message: {
                required: true,
            },
        },
        messages: {},
        errorElement : 'div',
        errorLabelContainer: '.errorTxt',
        submitHandler: function(form) {
            // some other code
            // maybe disabling submit button
            // then:
            console.log("Form is valid");
            sendEmail()
        },
        invalidHandler: function (e, validator) {
            $("div.error").hide();
        },
    });
});


