$(function() {
	
	if (window.location.search.substring(1).split('desg_id=')[1] != '' && window.location.search.indexOf('desg_id') == 1) {
        ActivateTab('kt_branch_setting', 'kt_department_setting');
		ActivateTab('kt_general_setting', 'kt_department_setting');
        showDiv('add-more-department');
        showDiv('add-branch');
        hideDiv('add-department-static ');
        hideDiv('department-list');
        GetDeparmentDetail(window.location.search.substring(1).split('desg_id=')[1]);
        $("#desg_id").val(window.location.search.substring(1).split('desg_id=')[1]);
    }
	
	if (window.location.search.substring(1).split('desg_id=')[1] != '' && window.location.search.indexOf('desg_id') == 1) {
        GetDeptDetail(window.location.search.substring(1).split('desg_id=')[1]);
    }

    $("#kt_create_department").validate({
        rules: {
            deptName: {
                required: true
            },
            deptHead: {
                required: true
			}
        },
        messages: {
            deptName: "Department name is required",
            deptHead: "Department head is required"
        }
    });
	
    var designation_row = 1;
    // Adding dynamic designation
    var browd = designation_row + 1;
    var rnum = "#rownum" + designation_row;
    $('#add-designation').on('click', function() {
        var html = '<div id="rownum' + designation_row + '"><div class="row mt-4 d-flex align-items-end"><span class="fs-3 fw-bolder">Designation #' + (designation_row + 1) + '</span><div class="col-6"> <label class=" fs-5 fw-bold mb-2 required">Designation</label> <input type="number" class="form-control"></div><div class="col-4"><button class="btn btn-secondary btn-sm" type="button" id="remove-designation" onclick="RemoveDesignation(' + designation_row + ')"><i class="fas fa-times"></i> Remove designation</button></div></div></div>';
        $("#add-more-designation").append(html);
        designation_row++;

        if (designation_row == 1) {
            $('#remove-designation').hide();
        } else {
            $('#remove-designation').show();
        }
    });

    $('#remove-designation').on('click', function() {
        $("#rownum" + (designation_row - 1)).remove();
        designation_row--;

        if (designation_row == 1) {
            $('#remove-designation').hide();
        } else {
            $('#remove-designation').show();
        }
    });

    if (designation_row == 1) {
        $('#remove-designation').hide();
    } else {
        $('#remove-designation').show();
    }
});

function RemoveDesignation(id) {
    $("#rownum" + id).hide();
}