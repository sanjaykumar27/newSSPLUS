$(function() {
    getEmployeeList();
});

function searchEmployee(val) {
    setTimeout(function() {
        getEmployeeList(val);
    }, 500);
}

function getEmployeeList(val = '', pageNum = '0', totalRecords = '5') {
    var search_param = val;
    var th = "";
    $.ajax({
        type: "POST",
        url: "/services/rest/employeemanagement/v1/employee/search/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
        "data": JSON.stringify({
            "employeeName": search_param,
            "pageable": {
                "pageNumber": pageNum,
                "pageSize": totalRecords,
                "sort": []
            }
        }),
        success: function(data) {
			if(data.totalElements > totalRecords) 
			{
				EmpPagination(data.totalElements, totalRecords, pageNum);
				$("#emp-pagination").removeClass('d-none');
			} 
			else {
				$("#emp-pagination").addClass('d-none');
			}
            
            for (let i = 0; i < data.content.length; i++) {
                var j = i + 1;
                th += '<tr><td><div class="form-check form-check-custom form-check-solid d-flex justify-content-center"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div></td><td class="text-center">' + j + '</td><td>' + data.content[i].employeeId + '</td><td>' + data.content[i].employeeName + '</td><td>' + data.content[i].sex + '</td><td>' + data.content[i].phone + '</td><td> <div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked><label class="form-check-label" for="flexSwitchCheckChecked">Yes</label></div></td><td><a href="/create_user.html?emp_id=' + data.content[i].id + '" class="btn btn-light-primary btn-sm">Edit</a> <a href="javascript:void(0)" onclick="GetEmpDetail(' + data.content[i].id + ')" data-bs-toggle="modal" data-bs-target="#modalDeleteEmployee" class="btn btn-light-danger btn-sm">Delete</a></td></tr>';
            }
            $("#emp-list-table").html(th);
        },
        error: function() {
            console.log();
        }
    });
}

function EmpPagination(totalElements, pageSize, currentPage) {
    var totalPages = Math.ceil(totalElements / pageSize);
    var searchTerm = ($("#emp-list-search").val() ? $("#emp-list-search").val() : null);
    var html = '<li class="page-item previous disabled"><a href="#" class="page-link"><i class="previous"></i></a></li>';
    for (i = 0; i < totalPages; i++) {
        var act = (i == currentPage ? 'active' : '');
        html = html + '<li class="page-item ' + act + '"><a href="javascript:void(0)" onclick="getEmployeeList(' + searchTerm + ',' + (i) + ',' + pageSize + ')" class="page-link">' + (i + 1) + '</a></li>'
    }
    var html = html + ' <li class="page-item next"><a href="#" class="page-link"><i class="next"></i></a></li>';
    $("#emp-list-pagination").html(html);
}

function DeleteEmp() {
    var emp_id = $("#delete-modal-emp-id").val();
    $.ajax({
        type: "DELETE",
        url: "/services/rest/employeemanagement/v1/employee/" + emp_id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
        success: function(data) {
            ShowNotif("Employee deleted succesfully!", "success");
            setTimeout(function() {
                getEmployeeList();
                $("#delete-modal-emp-id").modal('hide');
            }, 1000);
        },
        error: function(data) {
            console.log(data);
        }
    });
}

function CreateSampleEmployee(e_name,e_id) {
	$.ajax({
		type: "POST",
		url: "/services/rest/employeemanagement/v1/employee/",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: { "contentType": "application/json", "X-CSRF-TOKEN": localStorage.security_token },
		"data": JSON.stringify({
			"employeeName": e_name,
			"employeeId":e_id,
			"sex":"M",
			"maritalStatus":"M",
			"dateOfBirth":"2011-01-02",
			"nationalIdNumber":"111",
			"pan":"123",
			"bloodGroup":"O+",
			"address":"#101,Whtiefield",
			"phone":"123123",
			"email":"sujithhh@gmail.com"
		}),
		success: function(data) {
			
		},
		error: function(data) {
			
		}
	});
}