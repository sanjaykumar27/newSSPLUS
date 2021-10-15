$(function() {

    $('.table-responsive').on('show.bs.dropdown', function() {
        $('.table-responsive').css("overflow", "inherit");
    });

    $('.table-responsive').on('hide.bs.dropdown', function() {
        $('.table-responsive').css("overflow", "auto");
    })

    LoadTableJSON();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    $("#dashboardDate").val(today);
    // console.log(WebHTML());
});

function ShowNotif(message, type) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "200",
        "timeOut": "500",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    if (type == 'success') {
        toastr.success(message);
    } else {
        toastr.error(message);
    }

}

function SignOut() {
    localStorage.setItem('security_token', '');
    window.location.href = '/sign-in.html';
}

function showDiv(id) {
    $("#" + id).show();
}

function hideDiv(id) {
    $("#" + id).hide();
}

function LoadTableJSON() {
    // $.getJSON("assets/json/table-title.json", function(data) {
    //     $("#employee-tb-title-json").text(data.en.employee_list);
    //     $("#organization-tb-title-json").text(data.en.organization_list);
    // }).fail(function() {
    //     console.log("Unable to load json file.");
    // });
}

function ActivateTab(prevTab, newTab) {
    var prevTabTitle = prevTab + '_title';
    var nextTabTitle = newTab + '_title';
    $("#" + prevTab).removeClass('active show');
    $("#" + prevTabTitle).removeClass('active show');
    $("#" + newTab).addClass('active show');
    $("#" + nextTabTitle).addClass('active show');
}

function CheckLogin() {
    console.log(localStorage.security_token);
    if (localStorage.security_token == '' || localStorage.security_token == 'undefined') {
        window.location.href = '/sign-in.html';
    }
}



function InitializePhoneInput(element) {
    setTimeout(function() {
        let intlInput = $("#" + element).intlTelInput({
            separateDialCode: true,
            utilsScript: "utils.js",
            initialCountry: "in",
            formatOnDisplay: false
        });
    }, 1000);
}