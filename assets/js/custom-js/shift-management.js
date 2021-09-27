$(function() {
    $("#overtime-setting").hide();
})

function ShowOTSetting() {
    $('#overtime-applicable').is(":checked") ? $("#overtime-setting").show() : $("#overtime-setting").hide();
}