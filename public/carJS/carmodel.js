
function show() {
    $('#carmodelTable').DataTable({
        processing: true,
        serverSide: true,
        destroy : true,
        ajax: 'http://127.0.0.1:8000/admin/carmodel',
        columns  : [
            {data: 'id'} ,
            {data : 'name'},
            {data: 'maker'},
            {data:'action'},
        ]
    }) ;  
}

$(document).ready(function() {
    show() ;

    $('#create_record').click(function() {
        $('.modal-title').text('Add New Record') ;
        $('#action_button').val('Add') ;
        $('#action').val('Add') ;
        $('#form_result').html('') ;

        $('#formModal').modal('show') ;
    })

    $('#sample_form').on('submit', function(event) {
        event.preventDefault() ;
        var action_url = '' ;

        if($('#action').val() == 'Add') { 
            action_url = "http://127.0.0.1:8000/admin/carmodel/create" ;
        }

        if($('#action').val() == 'Edit')
        {
        action_url = "http://127.0.0.1:8000/admin/carmodel/update";
        }
    $.ajax({
        url: action_url,
        method: 'get',
        data:$(this).serialize(),
        dataType: 'json',
        success:function(data) {
            if(data.errors) 
            {
                $('#form_result').html('') ;
                for(var count = 0; count < data.errors.length; count++)
                {
                    $('#form_result').append(data.errors[count]) ;
                }
            }
            if(data.success) {
                $('#form_result').html('') ;
                $('#sample_form')[0].reset();
                show() ;
                $('#formModal').modal('hide') ;
                alertify.success(data.success) ;
            }
        }

    }) ;
   }) ;

   $(document).on('click', '.edit' , function () {
       var id = $(this).attr('id') ;
        $.ajax({
            url: 'http://127.0.0.1:8000/admin/carmodel/edit/'+id,
            dataType: 'json',
            success:function(data) {
                $('.modal-title').text('Edit Record');
                $('#action_button').val('Edit');
                $('#action').val('Edit');
                $('#formModal').modal('show');
                $('#name').val(data.result.name);
                $('#name').val(data.result.name);
                $('#maker').val(data.result.maker_id);
                $('#hidden_id').val(id);
            }
        })
   })
   var carID ;

   $(document).on('click','.delete', function() {
        carID = $(this).attr('id') ;
       $('#confirmModal').modal('show') ;
   })

   $('#ok_button').click(function() {
       $.ajax({
           url: 'http://127.0.0.1:8000/admin/carmodel/delete/'+carID,
           beforeSend: function(){
               $('#ok_button').html(`<button class="btn " type="button" disabled>
               <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
               Loading...
             </button>`) ;
           },
           success: function(data) {
               setTimeout(function() {
                $('#confirmModal').modal('hide');
                show() ;
                $('#ok_button').text('ok') ;
                alertify.success('Đã xóa') ;
               } ,2000) ;
           }
       })
   })


})
  



