$(function(){
    $('.addtodo').click(function(e){
        $('#home').hide();
        $('#add').show();
    });
    $('#clearalltodo').click(function(e){
        if(confirm('are you sure')) {
            localStorage.removeItem('todos');
            localStorage.removeItem('lastitem');
        }
    });
    $('.jumbotron .pull-left').click(function(event){
        $('#home').show();
        $('#add').hide();
        $('#edit').hide();
    });
    $('#add .pull-right').click(function(event){
        $('#addform').submit();
    });

    $('#edit .pull-right').click(function(event){
        alert('edit cancel')
    });
    $('#addform').submit(function(){
        var name = $('#todoaddname').val();
        var date = $('#todoadddate').val();
        if (name == "" || date == "" ) {
            alert('name and date cannot be blank');
            return false ;
        }
        var todoarr = JSON.parse(localStorage.getItem('todos')) || [] ;
        var new_id  = (JSON.parse(localStorage.getItem('lastid')) || 0)  + 1;
        var new_obj = {
            id:new_id,
            name:name,
            date:date
        };
        todoarr.push(new_obj);
        localStorage.setItem('todos',JSON.stringify(todoarr));
        localStorage.setItem('lastid',JSON.stringify(new_id));
        //alert(JSON.stringify(todoarr));
        $('#home').show();
        $('#add').hide();
        jQuery.event.trigger('mycustomevent');
    });
    $(document).bind('mycustomevent', function (e) {
        var todoarr = JSON.parse(localStorage.getItem('todos'));
        $('#listtodos').html('');
        $.each(todoarr, function(index, item){
            $('#listtodos').append("<li class='list-group-item' id="+item['id']+" name="+item['name']+" date="+item['date']+">"+item['name']+" "+item['date']+"<span class='glyphicon glyphicon-pencil pull-right'</span</li>");
        });
    });
    $('#home').show(function(){
        jQuery.event.trigger('mycustomevent');
    });
    $('#listtodos').delegate('li','click', (function(event){
        $('#home').hide();
        $('#edit').show();
        alert($(event.target).attr('date'));
        //$('#todoeditname').val()

    }));
});









