$(function() {
    
    if (window.location.search.substring(1).split('org_id=')[1] != '' && window.location.search.indexOf('org_id') == 1) {
        GetOrgDetail(window.location.search.substring(1).split('org_id=')[1]);
    }
	
	$("#financialStart").datepicker( {
		format: "mm-yyyy",
		viewMode: "months", 
		minViewMode: "months"
	});
	
	$("#financialEnd").datepicker( {
		format: "mm-yyyy",
		viewMode: "months", 
		minViewMode: "months"
	});
	
	/*$("#orgPhone").intlTelInput({
			separateDialCode: true,
			utilsScript: "utils.js",
			initialCountry: "in",
			formatOnDisplay: false
		});
*/
    $("#kt_create_org").validate({
        rules: {
            orgName: {
                required: true
            },
            orgEmail: {
                required: true,
                email: true
            },
            orgPhone: {
                required: true
            },
            orgAddress: {
                required: true
            },
            orgLocation: {
                required: true
            }
        },
        messages: {
            orgName: "Organization name is required",
            orgEmail: "Email ID is required",
            orgPhone: "Phone is required",
            orgAddress: "Address is required",
            orgLocation: "Location is required"
        }
    });

    $("#kt_create_org").submit(function(e) {
        alert();
        e.preventDefault(e);
		//var data = $(this).serializeArray();
        if ($("#orgName").val() != '' && $("#orgEmail").val() != '' && $("#orgPhone").val() != '' && $("#orgLocation").val() != '' && $("#orgAddress").val() != '') {
            $("#create-org-spinner").show();
            $("#create-org-submit").attr('disabled', 'disabled');
            $.ajax({
                type: "POST",
                url: "/services/rest/organizationmanagement/v1/organization/",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
                "data": JSON.stringify({
                    "orgName": $("#orgName").val(),
                    "email": $("#orgEmail").val(),
                    "phone": $("#orgPhone").val(),
                    "location": $("#orgLocation").val(),
					"orgModificationCounter": $("#orgModificationCounter").val(),
                    "address": $("#orgAddress").val(),
                    "id": $("#orgID").val(),
                    "logo": "/assets/images/log.png"
                }),
                success: function(data) {
                    if ($("#orgID").val()) {
                        ShowNotif("Organization updated succesfully!", "success");
                    } else {
                        ShowNotif("Organization created succesfully!", "success");
                    }
                    setTimeout(function() {
                        $("#create-org-spinner").hide();
                        $("#create-org-submit").removeAttr('disabled', 'disabled');
                        ActivateTab('kt_general_setting', 'kt_branch_setting')
                    }, 1000);
                },
                error: function(data) {
                    $("#create-org-spinner").hide();
                    $("#create-org-submit").removeAttr('disabled', 'disabled');
					
                    if (data.responseJSON.message == 'UNIQUE_ORG_NAME') {
						$("#error-message-area").text('Organization with this name already exists !');
                        $("#modalError").modal('show');
                    }
					
					else {
						$("#error-message-area").text(data.responseJSON.message);
                        $("#modalError").modal('show');
                    }
                }
            });
        }
    });
	
	 $("#kt_create_settings").validate({
        rules: {
            locale: {
                required: true
            },
            dateFormat: {
                required: true
            },
            timeFormat: {
                required: true
            },
            financialStart: {
                required: true
            },
            financialEnd: {
                required: true
            },
			organizationId: {
				required: true
			}
        },
        messages: {
            locale: "Please select locale",
            dateFormat: "Please select date format",
            timeFormat: "Please select time format",
            financialStart: "Please select financial year start",
            financialEnd: "Please selected financial year end",
			organizationId: "Please select organization"
        }
    });
	
	
    $("#kt_create_settings").submit(function(e) {
        e.preventDefault(e);
			$("#create-setting-spinner").show();
            $("#create-setting-submit").attr('disabled', 'disabled');
			$.ajax({
                type: "POST",
                url: "/services/rest/localemanagement/v1/locale/",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
                "data": JSON.stringify({
                    "locale": $("#locale").val(),
                    "dateFormat": $("#dateFormat").val(),
                    "timeFormat": $("#timeFormat").val(),
                    "financialStart": $("#financialStart").val(),
					"financialEnd": $("#financialEnd").val(),
                    "address": $("#orgAddress").val(),
                    "organizationId": $("#organizationId").val()
                }),
                success: function(data) {
                    ShowNotif("Settings updated succesfully!", "success");
                    setTimeout(function() {
                        $("#create-setting-spinner").hide();
                        $("#create-setting-submit").removeAttr('disabled', 'disabled');
				   }, 1000);
                },
                error: function(data) {
                    $("#create-setting-spinner").hide();
                    $("#create-setting-submit").removeAttr('disabled', 'disabled');
					
                    $("#error-message-area").text(data.responseJSON.message);
					$("#modalError").modal('show');
                }
            });
			
	});
});


function CreateOrgSample(o_name) {
	$.ajax({
		type: "POST",
		url: "/services/rest/organizationmanagement/v1/organization/",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
		"data": JSON.stringify({
			"orgName":  o_name,
			"email": 'example@example.com',
			"phone": '7014568025',
			"location": 'Delhi',
			"address": "Delhi STP",
			"id": '',
			"logo": "/assets/images/log.png"
		}),
		success: function(data) {
			
		},
		error: function(data) {
			
		}
	});
}

function GetLocale()
{
	
}