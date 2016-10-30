<?php

class Book implements JsonSerializable {

    private $id;
    private $title;
    private $author;
    private $description;

    public function __construct() {
        $this->id = -1;
        $this->title = '';
        $this->author = '';
        $this->description = '';
    }

    function getId() {
        return $this->id;
    }

    function getTitle() {
        return $this->title;
    }

    function getAuthor() {
        return $this->author;
    }

    function getDescription() {
        return $this->description;
    }

    function setTitle($title) {
        $this->title = $title;
    }

    function setAuthor($author) {
        $this->author = $author;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    public function create(mysqli $conn) {
        $result = $conn->query("INSERT INTO `Book`(title, author, description) "
                . "VALUES ('$this->title', '$this->author', '$this->description')");
        
        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function update(mysqli $conn, $id) {
        $newTitle = $this->getTitle();
        $newAuthor = $this->getAuthor();
        $newDescription = $this->getDescription();
        
        $result = $conn->query("UPDATE `Book` SET title='$newTitle', author='$newAuthor', description='$newDescription' WHERE id='$id'");
        
        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    static public function loadFromDB(mysqli $conn, $id = null) {
        if (!is_null($id)) {
            $result = $conn->query("SELECT * FROM `Book` WHERE id=$id");
        } else {
            $result = $conn->query("SELECT * FROM `Book`");
        }

        $bookList = [];

        if ($result && $result->num_rows > 0) {
            foreach ($result as $row) {
                $dbBook = new Book();
                $dbBook->id = $row['id'];
                $dbBook->author = $row['author'];
                $dbBook->title = $row['title'];
                $dbBook->description = $row['description'];
                $bookList[] = json_encode($dbBook); //klasa Book musi implementować interfejs, bo inaczej nie możemy przekazać do json
            }
        }
        return $bookList;
    }

    public function jsonSerialize() { //tu klasa ma metodę, która pozwala wyżej dodać $dbBook do json; funkcja ta wywoła się automatycznie
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'description' => $this->description,
        ];
    }

    static public function deleteFromDB(mysqli $conn, $id = null) {
        if (!is_null($id)) {
            $result = $conn->query("DELETE FROM `Book` WHERE id='$id'");
        }
        
        if ($result) {
            return true;
        } else {
            return false;
        }
    }

}
