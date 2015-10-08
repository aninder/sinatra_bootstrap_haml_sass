$(function(){
    $('.addtodo').click(function(e){
        $('#home').hide();
        $('#add').show();
    });
    $('.jumbotron .pull-left').click(function(event){
        $('#home').show();
        $('#add').hide();
    });
    $('.jumbotron .pull-right').click(function(event){
        $('#addform').submit();
    });
    $('#addform').submit(function(){
        var name = $('#todoname').val();
        var date = $('#tododate').val();
        var todoarr = JSON.parse(localStorage.getItem('todos')) || [] ;
        var new_obj = {
            name:name,
            date:date
        };
        todoarr.push(new_obj);
        localStorage.setItem('todos',JSON.stringify(todoarr));
        //alert(JSON.stringify(todoarr));
        $('#home').show();
        $('#add').hide();
        jQuery.event.trigger('mycustomevent');
    });
    $(document).bind('mycustomevent', function (e) {
        alert('cusomt event received'+ e.targetName);
        var todoarr = JSON.parse(localStorage.getItem('todos'));
        $('#listtodos').html('');
        $.each(todoarr, function(index, item){
            $('#listtodos').append("<li class='list-group-item'>"+todoarr[index]['name']+" "+todoarr[index]['date']+"</li>");
        });
    });
    $('#home').show(function(){
        jQuery.event.trigger('mycustomevent');
    });
});

