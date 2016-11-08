$(function () {
    //pobieramy całą listę books z bazy i dodajemy na stronę

    $.ajax({
        url: 'api/books.php',
        type: 'GET',
        dataType: 'json',
    }).done(function (result) {

        for (i = 0; i < result.length; i++) {
            var book = JSON.parse(result[i]);

            var panelGroup = $('<div>');
            panelGroup.addClass('panel-group')

            var panelDefault = $('<div>');
            panelDefault.addClass('panel panel-default');

            var panelHead = $('<div>');
            panelHead.addClass('panel-heading clearfix');
            panelHead.html('<h4 class="panel-title" data-id="' + book.id + '"><a data-toggle="collapse" href="#desc' + book.id + '">' + book.title + '</a></h4>');

            panelDefault.append(panelHead);

            var panelCollapse = $('<div>');
            panelCollapse.addClass('panel-collapse collapse');
            panelCollapse.attr('id', 'desc' + book.id);

            var panelBody = $('<div>');
            panelBody.addClass('panel-body');

            var deleteButton = $('<button>');
            deleteButton.addClass('btn btn-warning pull-right');
            deleteButton.text('Delete Book');
            panelHead.append(deleteButton);


            panelCollapse.append(panelBody);
            panelDefault.append(panelCollapse);
            panelGroup.append(panelDefault);
            $('#bookList').append(panelGroup);
        }
    }).fail(function () {
        console.log('Error. Unable to load titles.');
    });


    $('#bookList').on('click', '.panel-heading > h4', function (e) {
        
        var h4 = $(e.target);
        var bookId = h4.attr('data-id');
        var form = '<form class="form-horizontal" action="api/books.php" method="PUT">\n\
                      <div class="form-group">\n\
                        <label class="control-label col-sm-2" for="title">Edit title:</label>\n\
                          <div class="col-sm-7">\n\
                            <input type="text" class="form-control" id="title">\n\
                          </div>\n\
                      </div>\n\
                      <div class="form-group">\n\
                        <label class="control-label col-sm-2" for="author">Edit author:</label>\n\
                          <div class="col-sm-7">\n\
                            <input type="text" class="form-control" id="author">\n\
                          </div>\n\
                      </div>\n\
                      <div class="form-group">\n\
                        <label class="control-label col-sm-2" for="description">Edit description:</label>\n\
                          <div class="col-sm-7">\n\
                            <input type="text" class="form-control" id="description">\n\
                          </div>\n\
                      </div>\n\
                      <div class="form-group">\n\
                        <div class="col-sm-offset-2 col-sm-10">\n\
                          <button type="submit" class="btn btn-default">Update</button>\n\
                        </div>\n\
                      </div>\n\
                    </form>';
        

        $.ajax({
            url: 'api/books.php',
            type: 'GET',
            data: 'id=' + bookId,
            dataType: 'json'
        }).done(function (result) {
            var book = JSON.parse(result[0]);
            h4.closest('.panel-heading').next('.panel-collapse').
                    html('<p><strong>Author:</strong> ' + book.author + '</p><p>' + book.description + 
                    '</p><p><strong>Edit form:</strong><br/>' + form + '</p>');
        }).fail(function (result) {
            console.log('Request failed.');
        });
    });
    
    $('#bookList').on('click', '.btn-warning', function(e) {
        
        var button = $(e.target);
        var bookId = button.prev('h4').attr('data-id');
        var message = confirm('Delete book?');
        
        if (message == true) {
        $.ajax({
           url: 'api/books.php',
           type: 'DELETE',
           data: 'id' + bookId,
        }).done(function(result) {
           console.log('Book removed.');
           location.reload();
        }).fail(function(result) {
            console.log('Request failed.')
        })
    }
    });
});


