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
            panelHead.addClass('panel-heading');
            panelHead.html('<h4 class="panel-title" data-id="' + book.id + '"><a data-toggle="collapse" href="#desc' + book.id + '">' + book.title + '</a></h4>');

            panelDefault.append(panelHead);

            var panelCollapse = $('<div>');
            panelCollapse.addClass('panel-collapse collapse');
            panelCollapse.attr('id', 'desc' + book.id);

            var panelBody = $('<div>');
            panelBody.addClass('panel-body');
            //panelBody.text(book.description);

            var deleteButton = $('<button>');
            deleteButton.addClass('btn btn-warning pull-right');
            deleteButton.text('Delete Book');

            panelBody.append(deleteButton);

            panelCollapse.append(panelBody);
            panelDefault.append(panelCollapse);
            panelGroup.append(panelDefault);
            $('#bookList').append(panelGroup);
        }
    }).fail(function () {
        console.log('Error. Unable to load titles.');
    });


    $('#bookList').on('click', $('.panel-default'), function (e) {
        
        var h4 = $(e.target);
        var bookId = $(e.target).closest('a').attr('data-id');
        //var panelBody = 

        $.ajax({
            url: 'api/books.php',
            type: 'GET',
            data: 'id=' + bookId,
            dataType: 'json'
        }).done(function (result) {
            var book = JSON.parse(result[0]);
            h4.next('#desc').html(book.description);
            //panelBody.text(book.description);
        }).fail(function () {
            console.log('Error.');
        });
    });
});