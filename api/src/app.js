$(function () {
    $.ajax({
        url: 'api/books.php',
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {

        for (var i = 0; i < result.length; i++) {
            var book = JSON.parse(result[i]);

            //tworzymy diva z daną książką
            var bookDiv = $('<div>');
            bookDiv.addClass('singleBook');
            var titleDiv = $('<div>');
            titleDiv.addClass('panel-heading').addClass('clearfix');
            var title = $('<h3>');
            title.addClass('panel-title');
            title.attr('data-id', book.id);
            title.attr('style', 'display: inline-block');
            title.html('<a class="bookTitle " data-toggle="collapse" data-parent="#bookList" href="#desc'
                    + book.id + '">' + book.title + '</a>');
            var deleteBtn = $('<button> <span>').addClass('btn btn-danger pull-right deleteBook').addClass('glyphicon glyphicon-trash');
            deleteBtn.text(' Delete');
            titleDiv.append(title);
            titleDiv.append(deleteBtn);
            bookDiv.append(titleDiv);
            

            var descDiv = $('<div>');
            descDiv.attr('id', 'desc' + book.id);
            descDiv.addClass('panel-collapse').addClass('collapse');
            var desc = $('<div>').addClass("panel-body").addClass('description');

            descDiv.append(desc);
            bookDiv.append(descDiv);

            $('#bookList').append(bookDiv);
        }

    }).fail(function (result) {
        console.log('Error - Can not load titles');
    });

    $('#bookList').on('click', $('.bookTitle'), function (e) {


        var target = $(e.target);
        var bookTitle = $(e.target).closest('.singleBook').find('.bookTitle');

        if (target[0] == bookTitle[0]) {

            var desc = target.closest('.singleBook').find('.description');

            var bookId = target.closest('.singleBook').find('.panel-title').attr('data-id');

            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                data: 'id=' + bookId,
                dataType: 'json'

            }).done(function (result) {
                var book = JSON.parse(result[0]);

                var form = '<form class="form-inline editingForm " action="api/books.php" method="PUT">\n\
                    <div class="form-group">\n\
                        <label for="title">Correct title:</label>\n\
                        <input type="text" class="form-control input-sm" name="title">\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <label for="author">Correct author:</label>\n\
                        <input type="text" class="form-control input-sm" name="author">\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <label for="desc">Correct description:</label>\n\
                        <input type="text" class="form-control input-sm" name="desc">\n\
                    </div>\n\
                    <button type="submit" class="btn btn-success" id="editBook">Edit <span class="glyphicon glyphicon-upload"></span></button>\n\
                </form>';

                desc.html('<p>Author:</p><p>' + book.author + '</p><p>Description: </p><p>'
                        + book.description + '</p>' + form);

            }).fail(function (result) {
                console.log('Error - nie mogę wczytać opisu');
            });

        }

    });


    $('#bookList').on('click', $('.deleteBook'), function (e) {

        var target = $(e.target);
        var deleteBtn = $(e.target).closest('.singleBook').find('.deleteBook');

        if (target[0] == deleteBtn[0]) {

            var bookId = $(e.target).prev().attr('data-id');

            $.ajax({
                url: 'api/books.php',
                type: 'DELETE',
                data: 'id=' + bookId,
                
            }).done(function (result) {
                console.log('The book has been removed successfully');
                location.reload();
            }).fail(function (result) {
                console.log('Error - you can not remove a book');
            });

        }

    });

    $('#bookList').on('click', $('#editBook'), function (e) {

        e.preventDefault();

        var target = $(e.target);
        var editBtn = $(e.target).closest('.singleBook').find('#editBook');

        if (target[0] == editBtn[0]) {
            var bookId = $(e.target).closest('div.panel-collapse').prev().find('h4').attr('data-id');
            var newTitle = $(e.target).parent().find('input[name="title"]').val();
            var newAuthor = $(e.target).parent().find('input[name="author"]').val();
            var newDesc = $(e.target).parent().find('input[name="desc"]').val();

            $.ajax({
                url: 'api/books.php',
                type: 'PUT',
                data: 'id=' + bookId + '&title=' + newTitle + '&author=' + newAuthor + '&desc=' + newDesc,
            }).done(function (result) {
                console.log('The book was successfully update');
                location.reload();
            }).fail(function (result) {
                console.log('Error - you can not update the book');
            });
        }

    });


});