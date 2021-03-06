var express = require("express");
var router = express.Router();
var db = require("../db/connection.js");

router.get("/", function(req, res, next) {
  return db("books")
    .select()
    .innerJoin("join", "books.id", "book_id")
    .innerJoin("authors", "author_id", "authors.id")
    .then(books => {
      var newBooks = [];
      for (var i = 0; i < books.length; i++) {
        books[i].authors = [];
        var obj = {
          name: "",
          authOrder: 1
        };
        var insert = true;
        for (var j = 0; j < newBooks.length; j++) {
          if (newBooks[j].book_id === books[i].book_id) {
            insert = false;
            obj.name = books[i].firstName + " " + books[i].lastName;
            obj.authOrder = books[i].author_id;
            newBooks[j].authors.push(obj);
          }
        }
        if (insert) {
          obj.name = books[i].firstName + " " + books[i].lastName;
          obj.authOrder = books[i].author_id;
          books[i].authors.push(obj);
          newBooks.push(books[i]);
        }
      }
      var bookData = newBooks;
      return bookData;
    })
    .then(bookData => {
      res.render("books", { bookData });
    });
});

router.get("/new", function(req, res, next) {
  return db
    .select()
    .from("authors")
    .then(authorData => {
      res.render("addBook", { authorData });
    });
});

var bookNumber;
router.post("/new", function(req, res, next) {
  let bookName = req.body.bookTitle;
  var author1 = Number(req.body.author1);
  var author2 = Number(req.body.author2);
  var author3 = Number(req.body.author3);
  return db
    .select()
    .from("books")
    .where("bookTitle", bookName)
    .then(book => {
      if (book.length === 0) {
        return db("books")
          .insert({
            bookTitle: req.body.bookTitle,
            bookGenre: req.body.bookGenre,
            bookDescription: req.body.bookDescription,
            bookCoverURL: req.body.bookCoverURL
          })
          .returning("id")
          .then(bookID => {
            var bookNumber = bookID[0];
            return db("join")
              .insert({
                book_id: bookNumber,
                author_id: author1
              })
              .returning("book_id");
          })
          .then(bookID => {
            var bookNumber = bookID[0];
            if (author2 > 0 && author2 !== author1) {
              return db("join")
                .insert({
                  book_id: bookNumber,
                  author_id: author2
                })
                .returning("book_id");
            } else {
              res.redirect("/books");
            }
          })
          .then(bookID => {
            var bookNumber = bookID[0];
            if (author3 > 0 && author3 !== author2 && author3 !== author1) {
              return db("join").insert({
                book_id: bookNumber,
                author_id: author3
              });
            } else {
              res.redirect("/books");
            }
          })
          .then(() => {
            res.redirect("/books");
          });
      } else {
        res.send("Sorry, that book already exists");
      }
    });
});

router.get("/:id/delete", function(req, res, next) {
  const id = req.params.id;
  return db("books")
    .where("id", id)
    .then(bookdata => {
      var bookData = bookdata[0];
      res.render("deletebook", { bookData });
    });
});

router.delete("/delete/:id", function(req, res, next) {
  const id = req.params.id;
  return db("books")
    .where("books.id", id)
    .del()
    .then(() => {
      res.redirect("/books");
    });
});

router.get("/update/:id", function(req, res, next) {
  const id = req.params.id;
  return db("books")
    .where("id", id)
    .then(bookdata => {
      var bookData = bookdata[0];
      res.render("editbook", { bookData });
    });
});

router.put("/update/:id", function(req, res, next) {
  var id = req.params.id;
  return db
    .table("books")
    .where("id", id)
    .update({
      bookTitle: req.body.bookTitle,
      bookGenre: req.body.bookGenre,
      bookCoverURL: req.body.bookCoverURL,
      bookDescription: req.body.bookDescription
    })
    .then(() => {
      res.redirect("/books");
    });
});

router.get("/:id", function(req, res, next) {
  const id = req.params.id;
  return db("books")
    .select()
    .innerJoin("join", "books.id", "book_id")
    .innerJoin("authors", "author_id", "authors.id")
    .then(books => {
      var newBooks = [];
      for (var i = 0; i < books.length; i++) {
        books[i].authors = [];
        var obj = {
          name: "",
          authOrder: 1
        };
        var insert = true;
        for (var j = 0; j < newBooks.length; j++) {
          if (newBooks[j].book_id === books[i].book_id) {
            insert = false;
            obj.name = books[i].firstName + " " + books[i].lastName;
            obj.authOrder = books[i].author_id;
            newBooks[j].authors.push(obj);
          }
        }
        if (insert) {
          obj.name = books[i].firstName + " " + books[i].lastName;
          obj.authOrder = books[i].author_id;
          books[i].authors.push(obj);
          newBooks.push(books[i]);
        }
      }
      var bookdata = newBooks;
      return bookdata;
    })
    .then(bookdata => {
      for (var i = 0; i < bookdata.length; i++) {
        if (bookdata[i].book_id == id) {
          var bookData = bookdata[i];
        }
      }
      res.render("onebook", { bookData });
    });
});

module.exports = router;
