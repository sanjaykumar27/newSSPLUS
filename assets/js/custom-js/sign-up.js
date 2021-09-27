$(function() {
    $("#kt_sign_in_form").validate({
        // Specify validation rules
        rules: {

            j_username: {
                required: true
            },
            j_password: {
                required: true
            }
        },

        messages: {
            j_username: "Username is required",
            j_password: "Password is required",
            password: {
                required: "Please provide a password",
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        /*submitHandler: function(form) {
          form.submit();
        }*/
    });
})
$("#kt_sign_up_account_form").hide();
$("#kt_sign_up_submit").hide();
$("#terms-conditions").hide();
$("#otp-fields").hide();

function SubmitStepOne() {
    $("#kt_sign_up_account_form").show();
    $("#kt_sign_up_form").hide();
}

function GenerateOTP() {
    $("#kt_sign_up_submit").show();
    $("#terms-conditions").show();
    $("#otp-fields").show();
}

$("#kt_sign_in_form").submit(function(e) {
    e.preventDefault(e);
    if ($("#j_password").val() != '' && $("#j_username").val() != '') {
        $("#login-spinner").show();
        $("#kt_sign_in_submit").attr('disabled', 'disabled');
        var settings = {
            "url": "/services/rest/login",
            "type": "POST",
            "timeout": 0,
            "crossDomain": true,
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "j_username": $("#j_username").val(),
                "j_password": $("#j_password").val()
            }),
        };

        $.ajax(settings).done(function(response) {
            if (response != '') {
                $("#invalid-login").show();
            } else {
                ShowNotif('Signin succesfully', 'success');
                getToken();
            }
            $("#login-spinner").hide();
            $("#kt_sign_in_submit").removeAttr('disabled', 'disabled');
        });
    }
});

function getToken() {
    var settings_token = {
        "url": "/services/rest/csrf/v1/token",
        "type": "GET"
    };
    $.ajax(settings_token).done(function(response) {
        if (response.token) {
            localStorage.setItem('security_token', response.token);
            window.location.href = '/index.html';
        }
    });
}