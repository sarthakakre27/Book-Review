const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Book = require("./models/book");
const BookReview = require("./models/bookReview");
const book = require("./models/book");
const joi = require("joi");
const { bookSchemaCheck, bookReviewSchemaCheck } = require("./serverSidevalidation");
const CustomError = require("./utils/CustomError");

mongoose.connect("mongodb://localhost:27017/book-review");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'assets')));

const datavalidation_book = (req, res, next) => {
  const { error } = bookSchemaCheck.validate(req.body);
  if (error) {
    console.log("error in book validation\n");
    console.log(error);
    throw new CustomError("error in Book Validation --> improper fields given",400);
  } else {
    next();
  }
};

const datavalidation_bookReview = (req, res, next) => {
  const { error } = bookReviewSchemaCheck.validate(req.body);
  if (error) {
    //err msg
    console.log("error in book validation\n");
    throw new CustomError("error in BookReview Validation --> improper fields given",400);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
//   res.render("home");
    res.render("home");
});

app.get("/books", async (req, res, next) => {
  try {
    let books = await Book.find({});
    res.render("books/index1.ejs", { books });
  } catch (err) {
    next(err);
  }
});

app.get("/books/new", (req, res) => {
  res.render("books/new1");
});

app.post("/books", datavalidation_book, async (req, res, next) => {
  try {
    let book = new Book(req.body.book);
    await book.save();
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

app.get("/books/:id", async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id).populate("reviews");
    let books = await Book.find({});

    let rev_1 = 0,rev_2 = 0,rev_3 = 0,rev_4 = 0,rev_5 = 0;
    for(let review of book.reviews)
    {
      switch(review.rating)
      {
        case 1: {
          rev_1 += 1;
          break;
        }
        case 2: {
          rev_2 += 1;
          break;
        }
        case 3: {
          rev_3 += 1;
          break;
        }
        case 4: {
          rev_4 += 1;
          break;
        }
        case 5: {
          rev_5 += 1;
          break;
        }
      }
    }
    let avg_rating = (rev_1*1 + rev_2*2 + rev_3*3 + rev_4*4 + rev_5*5)/(book.reviews.length);
    avg_rating = Math.floor(avg_rating*100)/100;
    rev_1 = Math.floor((rev_1*100)/book.reviews.length);
    rev_2 = Math.floor((rev_2*100)/book.reviews.length);
    rev_3 = Math.floor((rev_3*100)/book.reviews.length);
    rev_4 = Math.floor((rev_4*100)/book.reviews.length);
    rev_5 = Math.floor((rev_5*100)/book.reviews.length);
    // console.log("found book");
    if (!book) {
      //err message
      // console.log("in not book");
      throw new CustomError("No Book Found",404);
    }
    res.render("books/show1", { book , books , rev_1, rev_2, rev_3, rev_4, rev_5, avg_rating});
  } catch (err) {
    // console.log("in catch block");
    next(err);
  }
});

app.get("/books/:id/edit", async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      //err message
    }
    res.render("books/edit1", { book });
  } catch (err) {
    next(err);
  }
});

app.put("/books/:id", datavalidation_book, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, { ...req.body.book });
    res.redirect(`/books/${book._id}`);
  } catch (err) {
    next(err);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

app.post("/books/:id/book-review", datavalidation_bookReview, async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      // console.log(req.body);
      const review = new BookReview(req.body.review);
      book.reviews.push(review);
      // console.log(review);
      await review.save();
      await book.save();
      res.redirect(`/books/${book._id}`);
    } catch (err) {
      next(err);
    }
  }
);

app.delete("/books/:id/reviews/:reviewId", async (req, res) => {
  const { id, reviewId } = req.params;
  await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await BookReview.findByIdAndDelete(reviewId);
  res.redirect(`/books/${id}`);
});

app.all('*', (req, res, next) => {
    next(new CustomError('Page Not Found', 404));
});


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something Went Wrong!"
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
  console.log("listening on port 3000");
});
