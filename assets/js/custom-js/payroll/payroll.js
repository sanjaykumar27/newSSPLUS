$(function(){
    $("#new_deduction_type").hide();
    $("#new_expense_type").hide();
    $("#new_allowane_type").hide();
    IsApplicable();
});

function AddNewItem(item_type,val) {
    if(item_type == 'deduction_type' && val == 'New') {
        $("#new_deduction_type").show();
    } else {
        $("#new_deduction_type").hide();
    }

    if(item_type == 'allowance_type' && val == 'New') {
        $("#new_allowane_type").show();
    } else {
        $("#new_allowane_type").hide();
    }

    if(item_type == 'expense_type' && val == 'New') {
        $("#new_expense_type").show();
    } else {
        $("#new_expense_type").hide();
    }
}

