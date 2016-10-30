<?php

//ten plik będzie pytany przez ajax

$dir = dirname(__FILE__);
include($dir . '/src/Database.php'); //tu używamy include, bo w require nie można podawać zmiennych
include($dir . '/src/Book.php');

$conn = DB::connect();
header('Content-type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (isset($_GET['id']) && intval($_GET['id']) > 0) { //parsujemy do inta, by zabezpieczyć przed wstrzyknięciem sql
        $books = Book::loadFromDB($conn, intval($_GET['id']));
    } else {
        $books = Book::loadFromDB($conn);
    }
    
    echo json_encode($books);
    
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    if (isset($_POST['title']) &&
        isset($_POST['author']) &&
        isset($_POST['description'])) {
            $newBook = new Book();
            $newBook->setTitle($_POST['title']);
            $newBook->setAuthor($_POST['author']);
            $newBook->setDescription($_POST['description']);
            $newBook->create($conn);
            header('Location: ../index.php');
        }
} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    
    parse_str(file_get_contents("php://input"), $put_vars);
    
    $id = $put_vars['id'];
    $title = $put_vars['title'];
    $author = $put_vars['author'];
    $description = $put_vars['description'];
    $bookToEdit = new Book();
    $bookToEdit->setTitle($title);
    $bookToEdit->setAuthor($author);
    $bookToEdit->setDescription($description);
    $bookToEdit->update($conn, $id);
    header('Location: ../index.php');
    
} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $del_vars);
    $id = $del_vars['id'];
    Book::deleteFromDB($conn, $id);
    header('Location: ../index.php');
}

