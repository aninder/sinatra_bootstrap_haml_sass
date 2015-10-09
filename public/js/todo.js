$(function(){
    $('.addtodo').click(function(e){
        $('#home').hide();
        $('#add').show();
    });
    $('#clearalltodo').click(function(e){
        if(confirm('are you sure')) {
            localStorage.removeItem('todos');
            //localStorage.removeItem('lastid');
            jQuery.event.trigger('redraw_todo_list');
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
        $('#editform').submit();
    });
    $('#editform').submit(function(){
        var name = $('#todoeditname').val();
        var date = $('#todoeditdate').val();
        if (name == "" || date == "" ) {
            alert('name and date cannot be blank');
            return false ;
        }
        var toupdateid = $('#hidden_id').val();
        var arr = JSON.parse(localStorage.getItem('todos'));
        $.each(arr,function(index,item){
            if(item['id'] == toupdateid ){
                item['name'] = name;
                item['date'] = date;
                //alert('item updates, with values '+item['name']+" and "+item['date']+"!!");
            }
        });
        localStorage.setItem('todos',JSON.stringify(arr));
        $('#home').show();
        $('#edit').hide();
        jQuery.event.trigger('redraw_todo_list');
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
        jQuery.event.trigger('redraw_todo_list');
    });
    $(document).bind('redraw_todo_list', function (e, param) {
        var todoarr = JSON.parse(localStorage.getItem('todos')) || [] ;
        if(param){
            var refine_list = [];
            $.each(todoarr, function(index,item){
                if(item['name'].search(param) != -1){
                    refine_list.push(item);
                }
            });
            todoarr = refine_list;
        }
        $('#listtodos').html('');
        $.each(todoarr, function(index, item){
            $('#listtodos').append("<li class='list-group-item' id="+item['id']+" name="+item['name']+" date="+item['date']+">"+item['name']+" "+item['date']+"<span class='glyphicon glyphicon-pencil pull-right'</span</li>");
        });
    });
    $('#home').show(function(){
        jQuery.event.trigger('redraw_todo_list');
    });
    $('#listtodos').delegate('li','click', (function(event){
        $('#home').hide();
        $('#edit').show();
        $('#todoeditname').val($(event.target).attr('name'));
        $('#todoeditdate').val($(event.target).attr('date'));
        $('#hidden_id').val($(event.target).attr('id'));
    }));
    $('#search').keyup(function(event){
        jQuery.event.trigger('redraw_todo_list', $(this).val());
    })
});









