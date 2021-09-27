$(function() {

    if (window.location.search.substring(1).split('emp_id=')[1] != '' && window.location.search.indexOf('emp_id') == 1) {
        GetEmpDetail(window.location.search.substring(1).split('emp_id=')[1]);
    }

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