<!DOCTYPE html>
<html lang="pl-PL">
    <head>
        <meta charset="UTF-8">
        <title>Books</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/app.js"></script>
    </head>
    <body>
        <div class="container">
         <h3>Add Book:</h3>
         <form class="form-horizontal" action="api/books.php" action="POST">
           <div class="form-group">
             <label class="control-label col-sm-2" for="title">Title:</label>
               <div class="col-sm-7">
                 <input type="text" class="form-control" id="title">
               </div>
           </div>
           <div class="form-group">
             <label class="control-label col-sm-2" for="author">Author:</label>
               <div class="col-sm-7">
                 <input type="text" class="form-control" id="author">
               </div>
           </div>
           <div class="form-group">
             <label class="control-label col-sm-2" for="description">Description:</label>
               <div class="col-sm-7">
                 <input type="text" class="form-control" id="description">
               </div>
           </div>
           <div class="form-group">
             <div class="col-sm-offset-2 col-sm-10">
               <button type="submit" class="btn btn-default">Add</button>
             </div>
           </div>
         </form>
         <br/>
          
         <div id="bookList">
           <h3>Book List:</h3>
             
         </div>
        </div>
    </body>
</html>

<?php


