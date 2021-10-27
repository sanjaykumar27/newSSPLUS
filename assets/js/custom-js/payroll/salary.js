$(function(){
    IsApplicable();
});

function IsApplicable() {
    if($("#pf_applicable_yes").prop('checked')) {
        $("#show-pf-components").show();
        $("#show-pf-components").addClass('d-flex');

    } else {
        $("#show-pf-components").removeClass('d-flex');
        $("#show-pf-components").hide();
    }

    if($("#pt_applicable_yes").prop('checked')) {
        $("#show-pt-components").show();
        $("#show-pt-components").addClass('d-flex');
    } else {
        $("#show-pt-components").removeClass('d-flex');
        $("#show-pt-components").hide();

    }

    if($("#esi_applicable_yes").prop('checked')) {
        $("#show-esi-components").show();
        $("#show-esi-components").addClass('d-flex');
    } else {
        $("#show-esi-components").removeClass('d-flex');
        $("#show-esi-components").hide();
    }
}