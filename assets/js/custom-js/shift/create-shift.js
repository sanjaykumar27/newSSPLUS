$(function() {
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
});