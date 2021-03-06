// global the manage memeber table 
var manageMemberTable;

$(document).ready(function () {
    manageMemberTable = $("#manageMemberTable").DataTable({
        "ajax": "php_action/retrieve.php",
        "order": []
    });

    $("#addMemberModalBtn").on('click', function () {
//        console.log('13123146584');
        // reset the form 
        $("#createMemberForm")[0].reset();
        // remove the error 
        $(".form-group").removeClass('has-error').removeClass('has-success');
        $(".text-danger").remove();
        // empty the message div
        $(".messages").html("");

        // submit form
        $("#createMemberForm").unbind('submit').bind('submit', function () {

            $(".text-danger").remove();

            var form = $(this);

            // validation
            var name = $("#name").val();
            var fb_link = $("#fb_link").val();
            var address = $("#address").val();
            var contact = $("#contact").val();
            var active = $("#active").val();

            if (name == "") {
                $("#name").closest('.form-group').addClass('has-error');
                $("#name").after('<p class="text-danger">The Name field is required</p>');
            } else {
                $("#name").closest('.form-group').removeClass('has-error');
                $("#name").closest('.form-group').addClass('has-success');
            }
            if (fb_link == "") {
                $("#fb_link").closest('.form-group').addClass('has-error');
                $("#fb_link").after('<p class="text-danger">The Facebook Link field is required</p>');
            } else {
                $("#fb_link").closest('.form-group').removeClass('has-error');
                $("#fb_link").closest('.form-group').addClass('has-success');
            }

//            if (address == "") {
//                $("#address").closest('.form-group').addClass('has-error');
//                $("#address").after('<p class="text-danger">The Address field is required</p>');
//            } else {
//                $("#address").closest('.form-group').removeClass('has-error');
//                $("#address").closest('.form-group').addClass('has-success');
//            }

//            if (contact == "") {
//                $("#contact").closest('.form-group').addClass('has-error');
//                $("#contact").after('<p class="text-danger">The Contact field is required</p>');
//            } else {
//                $("#contact").closest('.form-group').removeClass('has-error');
//                $("#contact").closest('.form-group').addClass('has-success');
//            }

//            if (active == "") {
//                $("#active").closest('.form-group').addClass('has-error');
//                $("#active").after('<p class="text-danger">The Active field is required</p>');
//            } else {
//                $("#active").closest('.form-group').removeClass('has-error');
//                $("#active").closest('.form-group').addClass('has-success');
//            }

            if (name) {
                //submi the form to server
                $.ajax({
                    url: form.attr('action'),
                    type: form.attr('method'),
                    data: form.serialize(),
                    dataType: 'json',
                    success: function (response) {

                        // remove the error 
                        $(".form-group").removeClass('has-error').removeClass('has-success');

                        if (response.success == true) {
                            $(".messages").html('<div class="alert alert-success alert-dismissible" role="alert">' +
                                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                    '<strong> <span class="fa fa-check"></span> </strong>' + response.messages +
                                    '</div>');

                            // reset the form
                            $("#createMemberForm")[0].reset();

                            // reload the datatables
                            manageMemberTable.ajax.reload(null, false);
                            // this function is built in function of datatables;

                        } else {
                            $(".messages").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                    '<strong> <span class="fa fa-exclamation-circle"></span> </strong>' + response.messages +
                                    '</div>');
                        }  // /else
                    } // success  
                }); // ajax subit 				
            } /// if


            return false;
        }); // /submit form for create member
    }); // /add modal

});

function removeMember(id = null) {
    if (id) {
        // click on remove button
        $("#removeBtn").unbind('click').bind('click', function () {
            $.ajax({
                url: 'php_action/remove.php',
                type: 'post',
                data: {member_id: id},
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $(".removeMessages").html('<div class="alert alert-success alert-dismissible" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                '<strong> <span class="fa fa-check"></span> </strong>' + response.messages +
                                '</div>');

                        // refresh the table
                        manageMemberTable.ajax.reload(null, false);

                        // close the modal
                        $("#removeMemberModal").modal('hide');

                    } else {
                        $(".removeMessages").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                '<strong> <span class="fa fa-exclamation-circle"></span> </strong>' + response.messages +
                                '</div>');
                    }
                }
            });
        }); // click remove btn
    } else {
        alert('Error: Refresh the page again');
}
}

function editMember(id = null) {
    if (id) {

        // remove the error 
        $(".form-group").removeClass('has-error').removeClass('has-success');
        $(".text-danger").remove();
        // empty the message div
        $(".edit-messages").html("");

        // remove the id
        $("#member_id").remove();

        // fetch the member data
        $.ajax({
            url: 'php_action/getSelectedMember.php',
            type: 'post',
            data: {member_id: id},
            dataType: 'json',
            success: function (response) {
                $("#editName").val(response.name);
                $("#editfb_link").val(response.fb_link);

                $("#editAddress").val(response.address);

                $("#editContact").val(response.contact);
                $("#editnotes").val(response.notes);

                $("#editActive").val(response.active);

                // mmeber id 
                $(".editMemberModal").append('<input type="hidden" name="member_id" id="member_id" value="' + response.id + '"/>');

                // here update the member data
                $("#updateMemberForm").unbind('submit').bind('submit', function () {
                    // remove error messages
                    $(".text-danger").remove();

                    var form = $(this);

                    // validation
                    var editName = $("#editName").val();
                    var editfb_link = $("#editfb_link").val();
                    var editAddress = $("#editAddress").val();
                    var editContact = $("#editContact").val();
                    var editActive = $("#editActive").val();

                    if (editName == "") {
                        $("#editName").closest('.form-group').addClass('has-error');
                        $("#editName").after('<p class="text-danger">The Name field is required</p>');
                    } else {
                        $("#editName").closest('.form-group').removeClass('has-error');
                        $("#editName").closest('.form-group').addClass('has-success');
                    }
                    if (editfb_link == "") {
                        $("#editfb_link").closest('.form-group').addClass('has-error');
                        $("#editfb_link").after('<p class="text-danger">The Facebook Link field is required</p>');
                    } else {
                        $("#editfb_link").closest('.form-group').removeClass('has-error');
                        $("#editfb_link").closest('.form-group').addClass('has-success');
                    }

//                    if (editAddress == "") {
//                        $("#editAddress").closest('.form-group').addClass('has-error');
//                        $("#editAddress").after('<p class="text-danger">The Address field is required</p>');
//                    } else {
//                        $("#editAddress").closest('.form-group').removeClass('has-error');
//                        $("#editAddress").closest('.form-group').addClass('has-success');
//                    }

//                    if (editContact == "") {
//                        $("#editContact").closest('.form-group').addClass('has-error');
//                        $("#editContact").after('<p class="text-danger">The Contact field is required</p>');
//                    } else {
//                        $("#editContact").closest('.form-group').removeClass('has-error');
//                        $("#editContact").closest('.form-group').addClass('has-success');
//                    }

//                    if (editActive == "") {
//                        $("#editActive").closest('.form-group').addClass('has-error');
//                        $("#editActive").after('<p class="text-danger">The Active field is required</p>');
//                    } else {
//                        $("#editActive").closest('.form-group').removeClass('has-error');
//                        $("#editActive").closest('.form-group').addClass('has-success');
//                    }

                    if (editName) {
                        $.ajax({
                            url: form.attr('action'),
                            type: form.attr('method'),
                            data: form.serialize(),
                            dataType: 'json',
                            success: function (response) {
                                if (response.success == true) {
                                    $(".edit-messages").html('<div class="alert alert-success alert-dismissible" role="alert">' +
                                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                            '<strong> <span class="fa fa-check"></span> </strong>' + response.messages +
                                            '</div>');

                                    // reload the datatables
                                    manageMemberTable.ajax.reload(null, false);
                                    // this function is built in function of datatables;

                                    // remove the error 
                                    $(".form-group").removeClass('has-success').removeClass('has-error');
                                    $(".text-danger").remove();
                                } else {
                                    $(".edit-messages").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                            '<strong> <span class="fa fa-exclamation-circle"></span> </strong>' + response.messages +
                                            '</div>')
                                }
                            } // /success
                        }); // /ajax
                    } // /if

                    return false;
                });

            } // /success
        }); // /fetch selected member info

    } else {
        alert("Error : Refresh the page again");
}
}