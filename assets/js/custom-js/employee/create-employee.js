$(function() {

    if (window.location.search.substring(1).split('emp_id=')[1] != '' && window.location.search.indexOf('emp_id') == 1) {
        GetEmpDetail(window.location.search.substring(1).split('emp_id=')[1]);
    }
    IsApplicable();
    // $("#div_basic_da").hide();
    // $("#div_hra").hide();
    // $("#div_da").hide();
    $("#div_ta").hide();
    // $("#div_ma").hide();
    $("#div_sa").hide();
    // $("#div_lta").hide();
    $("#div_mal").hide();
    $("#div_bonus").hide();
    $("#div_lwf").hide();
    // $("#div_pt").hide();
    $("#div_esi").hide();
    // $("#div_pf").hide();

    $("#non-ctc-payroll-setting").hide();
    $("#ctc-payroll-setting").hide();

    $("#contribution_div_pf").hide();
    $("#contribution_div_esi").hide();
    $("#contribution_div_basic_da").hide();
    $("#contribution_div_hra").hide();
    $("#contribution_div_ma").hide();
    $("#contribution_div_sa").hide();
    $("#contribution_div_lta").hide();

	$("#kt_create_access").validate({
        rules: {
            empstatus: {
                required: true
            },
            emptype: {
                required: true
            },
            mobileappaccess: {
                required: true
            },
			badgeid : {
				required: true
			}
        },
        messages: {
            mobileappaccess: "This field is required",
            emptype: "Employee type is required",
            empstatus: "Employee status is required",
			badgeid: "Badge Id is requred"
        }
    });
	
	$("#kt_create_access").submit(function(e) {
		
        e.preventDefault(e);
		
        if ($("#mobileappaccess").val() != '' && $("#emptype").val() != '' && $("#empstatus").val() != '') {
            $("#create-access-spinner").show();
            $("#create-access-submit").attr('disabled', 'disabled');
            $.ajax({
                type: "POST",
                url: "/services/rest/employeeaccesssettingmanagement/v1/employeeaccesssetting/",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
                "data": JSON.stringify({
                    "mobileappaccess": $("#mobileappaccess").val(),
                    "emptype": $("#emptype").val(),
					"badgeid": $("#badgeid").val(),
                    "empstatus": $("#empstatus").val(),
					"employeeId" : window.location.search.substring(1).split('emp_id=')[1],
					"modificationCounter": $("#modificationCounter").val(),
					"id": "",
					"organizationId": 1
                }),
                success: function(data) {
                    
                        ShowNotif("Access updated succesfully!", "success");
                    
                    setTimeout(function() {
                        $("#create-access-spinner").hide();
                        $("#create-access-submit").removeAttr('disabled', 'disabled');
                        ActivateTab('kt_role_setting','kt_department_setting')
                    }, 1000);
                },
                error: function(data) {
					
                    $("#create-access-spinner").hide();
                    $("#create-access-submit").removeAttr('disabled', 'disabled');
					
					$("#error-message-area").text(data.responseJSON.message);
					$("#modalError").modal('show');
                }
            });
        }
    });
	
    $("#kt_create_employee").validate({
        rules: {
            employeeName: {
                required: true
            },
            sex: {
                required: true,
                email: true
            },
            maritalStatus: {
                required: true
            },
            dateOfBirth: {
                required: true
            },
            nationalIdNumber: {
                required: true
            },
            pan: {
                required: true
            },
            bloodGroup: {
                required: true
            },
            address: {
                required: true
            },
            phone: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            employeeName: "Employee name is required",
            sex: "Sex is required",
            maritalStatus: "Maritial status is required",
            dateOfBirth: "Date of birth is required",
            nationalIdNumber: "Aadhar number is required",
            pan: "PAN number is required",
            bloodGroup: "Blood Group is required",
            address: "Address is required",
            phone: "Phone is required",
            email: "Email is required"
        }
    });

    $("#kt_create_employee").submit(function(e) {
		
        e.preventDefault(e);
		
        if ($("#employeeName").val() != '' && $("#sex").val() != '' && $("#maritalStatus").val() != '' && $("#dateOfBirth").val() != '' && $("#nationalIdNumber").val() != '' && $("#pan").val() && $("#bloodGroup").val() && $("#address").val() && $("#phone").val() && $("#email").val()) {
            $("#create-employee-spinner").show();
            $("#create-employee-submit").attr('disabled', 'disabled');
            $.ajax({
                type: "POST",
                url: "/services/rest/employeemanagement/v1/employee/",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
                "data": JSON.stringify({
                    "employeeName": $("#employeeName").val(),
                    "employeeId": $("#employeeId").val(),
					"id": $("#id").val(),
                    "sex": $("#sex").val(),
                    "maritalStatus": $("#maritalStatus").val(),
                    "dateOfBirth": $("#dateOfBirth").val(),
                    "nationalIdNumber": $("#nationalIdNumber").val(),
                    "pan": $("#pan").val(),
                    "bloodGroup": $("#bloodGroup").val(),
                    "address": $("#address").val(),
                    "phone": $("#phone").val(),
                    "email": $("#email").val(),
					"empModificationCounter": $("#empModificationCounter").val()
                }),
                success: function(data) {
                    if ($("#id").val()) {
                        ShowNotif("Employee updated succesfully!", "success");
                    } else {
                        ShowNotif("Employee created succesfully!", "success");
                    }
                    setTimeout(function() {
                        $("#create-employee-spinner").hide();
                        $("#create-employee-submit").removeAttr('disabled', 'disabled');
                        ActivateTab('kt_employee_information', 'kt_role_setting');
                    }, 1000);
                },
                error: function(data) {
                    $("#create-employee-spinner").hide();
                    $("#create-employee-submit").removeAttr('disabled', 'disabled');
					$("#error-message-area").text(data.responseJSON.message);
					$("#modalError").modal('show');
                }
            });
        }
    });
});

function GetEmpDetail(emp_id) {
    $.ajax({
        type: "GET",
        url: "/services/rest/employeemanagement/v1/employee/" + emp_id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
        success: function(data) {
			console.log(data);
            $("#employeeName").val(data.employeeName);
            $("#employeeId").val(data.employeeId);
			$("#id").val(data.id);
            $("#sex").val(data.sex);
            $("#phone").val(data.phone);
            $("#maritalStatus").val(data.maritalStatus);
            $("#dateOfBirth").val(data.dateOfBirth);
			$("#nationalIdNumber").val(data.nationalIdNumber);
			$("#pan").val(data.pan);
			$("#bloodGroup").val(data.bloodGroup);
			$("#address").val(data.address);
			$("#email").val(data.email);
            $("#modal-emp-name").text(data.employeeName);
			$("#empModificationCounter").val(data.modificationCounter);
            $("#delete-modal-emp-id").val(data.id);
        }
    });
}

function PayrollSetting()
{
    if($("#payroll_type").val() == 'NonCTC') {
        $("#non-ctc-payroll-setting").show();
        $("#ctc-payroll-setting").hide();
    } else {
        $("#ctc-payroll-setting").show();
        $("#non-ctc-payroll-setting").hide();
    }
}

function SalarySetting() {
    if($("#salary_basic_da").prop("checked")) {
        $("#div_basic_da").show();
    } else {
        $("#div_basic_da").hide();
        $("#input_basic_da").val('0');
    }

    if($("#salary_hra").prop("checked")) {
        $("#div_hra").show();
    } else {
        $("#div_hra").hide();
        $("#input_hra").val('0');
    }

    if($("#salary_da").prop("checked")) {
        $("#div_da").show();
    } else {
        $("#div_da").hide();
        $("#input_da").val('0');
    }

    if($("#salary_transportation_allowance").prop("checked")) { 
        $("#div_ta").show();
    } else {
        $("#div_ta").hide();
        $("#input_transportation_allowance").val('0');
    }

    if($("#salary_medical_allowance").prop("checked")) { 
        $("#div_ma").show();
    } else {
        $("#div_ma").hide();
        $("#input_medical_allowance").val('0');
    }

    if($("#salary_special_allowance").prop("checked")) { 
        $("#div_sa").show();
    } else {
        $("#div_sa").hide();
        $("#input_special_allowance").val('0');
    }

    if($("#salary_leave_travel_allowance").prop("checked")) { 
        $("#div_lta").show();
    } else {
        $("#div_lta").hide();
        $("#input_leave_travel_allowance").val('0');
    }

    if($("#salary_meal_allowance").prop("checked")) { 
        $("#div_mal").show();
    } else {
        $("#div_mal").hide();
        $("#input_meal_allowance").val('0');
    }

    if($("#salary_bonus").prop("checked")) { 
        $("#div_bonus").show();
    } else {
        $("#div_bonus").hide();
        $("#input_bonus").val('0');
    }

    TotalEarning();
}

function TotalEarning() {
    var total_salary = parseInt($("#input_basic_da").val()) + parseInt($("#input_da").val()) + parseInt($("#input_hra").val())  + parseInt($("#input_transportation_allowance").val()) + parseInt($("#input_medical_allowance").val()) + parseInt($("#input_special_allowance").val()) + parseInt($("#input_leave_travel_allowance").val()) + parseInt($("#input_meal_allowance").val())  + parseInt($("#input_bonus").val());
    
    $("#input_total_earning").val(total_salary);
    $("#input_gross_pay").val(total_salary);
}

function DeductionSetting()
{
    if($("#deduction_pfi").prop("checked")) {
        $("#div_pf").show();
    } else {
        $("#div_pf").hide();
        $("#input_pf").val('0');
    }

    if($("#deduction_esi").prop("checked")) {
        $("#div_esi").show();
    } else {
        $("#div_esi").hide();
        $("#input_esi").val('0');
    }

    if($("#deduction_pt").prop("checked")) { 
        $("#div_pt").show();
    } else {
        $("#div_pt").hide();
        $("#input_pt").val('0');
    }

    if($("#deduction_lfw").prop("checked")) { 
        $("#div_lwf").show();
    } else {
        $("#div_lwf").hide();
        $("#input_lwf").val('0');
    }
}

function TotalDeduction() {
    var total_deduction = parseInt($("#input_pf").val()) + parseInt($("#input_esi").val())  + parseInt($("#input_pt").val()) + parseInt($("#input_lwf").val());
    console.log(total_deduction);
    $("#input_total_deduction").val(total_deduction);
    setTimeout(function(){ 
        CalculateGrossNet();
    }, 1000);
}

function CalculateGrossNet() {
    var gp = parseInt($("#input_gross_pay").val());
    var contr = parseInt($("#contribution_total").val());
    var dedu =  parseInt($("#input_total_deduction").val());
    $("#input_net_pay_in_hand").val((gp+contr)-dedu);
}

function ContributionSetting() {
    if($("#contribution_pfi").prop("checked")) {
        $("#contribution_div_pf").show();
    } else {
        $("#contribution_div_pf").hide();
        $("#contribution_input_pf").val('0');
    }

    if($("#contribution_esi").prop("checked")) {
        $("#contribution_div_esi").show();
    } else {
        $("#contribution_div_esi").hide();
        $("#contribution_input_esi").val('0');
    }
	
	 if($("#contribution_basic_da").prop("checked")) {
        $("#contribution_div_basic_da").show();
    } else {
        $("#contribution_div_basic_da").hide();
        $("#contribution_input_basic_da").val('0');
    }

    if($("#contribution_hra").prop("checked")) {
        $("#contribution_div_hra").show();
    } else {
        $("#contribution_div_hra").hide();
        $("#contribution_input_hra").val('0');
    }

    if($("#contribution_medical_allowance").prop("checked")) { 
        $("#contribution_div_ma").show();
    } else {
        $("#contribution_div_ma").hide();
        $("#contribution_input_medical_allowance").val('0');
    }

    if($("#contribution_special_allowance").prop("checked")) { 
        $("#contribution_div_sa").show();
    } else {
        $("#contribution_div_sa").hide();
        $("#contribution_input_special_allowance").val('0');
    }

    if($("#contribution_leave_travel_allowance").prop("checked")) { 
        $("#contribution_div_lta").show();
    } else {
        $("#contribution_div_lta").hide();
        $("#contribution_input_leave_travel_allowance").val('0');
    }
}

function TotalContribution() {
    var total_salary = parseInt($("#contribution_input_pf").val()) + parseInt($("#contribution_input_esi").val())  + parseInt($("#contribution_input_basic_da").val()) + parseInt($("#contribution_input_hra").val()) + parseInt($("#contribution_input_medical_allowance").val()) + parseInt($("#contribution_input_special_allowance").val()) + parseInt($("#contribution_input_leave_travel_allowance").val());

    $("#contribution_total").val(total_salary);

    CalculateGrossNet();
}


function IsApplicable() {
    // if($("#pf_applicable_yes").prop('checked') || $("#esi_applicable_yes").prop('checked') || $("#pt_applicable_yes").prop('checked')) {
    //     $("#is_deduction_applicable").show();
    // } else {
    //     $("#is_deduction_applicable").hide();
    // }
}

function MonthlySalary() {
    var monthly = $("#monthly_salary_ctc").val();   
    var basic = monthly/2;
    var da = monthly * .12;
    var hra = monthly * .20;
    var conveyance = monthly * .16;
    var medical = monthly * .02;
    var pf = monthly * 0.12;
    var professional_tax = 200;

    $("#input_basic_da").val(basic);
    $("#input_da").val(da);
    $("#input_hra").val(hra);
    $("#input_medical_allowance").val(medical);
    $("#input_leave_travel_allowance").val(conveyance);

    $("#input_pf").val(pf);
    $("#input_pt").val(professional_tax);
    

    SalarySetting();
    setTimeout(function(){ 
        TotalDeduction();
    }, 1000);
}


function SelectTemplate() {
    if($("#select_template").val() == 'template_50k') {
        $("#monthly_salary_ctc").val(50000);
    }

    if($("#select_template").val() == 'template_60k') {
        $("#monthly_salary_ctc").val(60000);
    }

    setTimeout(function(){  
        MonthlySalary();
    }, 500); 
}