/*------------------------importing all the modules that are required for backend------------------------------*/
const express = require("express"); //main framework for rendering, routing, etc.
const path = require("path"); //to join path of the file with it's base location
const ejsMate = require("ejs-mate"); //
const methodOverride = require("method-override"); //for PUT / DELETE requests
const mongoose = require("mongoose"); //for database connection
const Book = require("./models/book"); //Book model in our database
const BookReview = require("./models/bookReview"); //BookReview model in our database
const joi = require("joi"); //for server side validations of the models
const { bookSchemaCheck, bookReviewSchemaCheck } = require("./serverSidevalidation"); //requiring the validation schemas
const CustomError = require("./utils/CustomError"); //for throwing our Custom Error
const { Router } = require("express");
/*-------------------------------------------------------------------------------------------------------------*/

/*------------------------------- Connect to database----------------------------------------------------------*/
mongoose.connect("mongodb://localhost:27017/book-review"); //connecting to database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); //on db connection error print error message
db.once("open", () => {
  console.log("Database connected"); //on db connection success print connected
});
/*-------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------- app settings -------------------------------------------------------*/
const app = express();
app.set("view engine", "ejs"); //setting the front-end rendering to ejs(embedded JS)
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views")); //for setting the absolute path of views dir
app.use(express.urlencoded({ extended: true })); //for parsing the req body
app.use(methodOverride("_method")); //for PUT / DELETE requests
app.use(express.static(path.join(__dirname, 'assets'))); //serving the assests directory publicly

/*-------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------- validation middlewares --------------------------------------------*/
//middleware for book Model validation
const datavalidation_book = (req, res, next) => {
  const { error } = bookSchemaCheck.validate(req.body); //validating request body and returning error if any
  //on a error log it to server console as well as throw CustomError to be handled and shown to the client
  if (error) {
    console.log("error in book validation\n");
    console.log(error);
    throw new CustomError("error in Book Validation => improper fields given", 400);
  } else {
    next(); //else go ahead
  }
};

//middleware for Book Review Model validation
const datavalidation_bookReview = (req, res, next) => {
  const { error } = bookReviewSchemaCheck.validate(req.body); //validating request body and returning error if any
  if (error) { //on a error log it to server console as well as throw CustomError to be handled and shown to the client
    //err msg
    console.log("error in book validation\n");
    throw new CustomError("error in BookReview Validation => improper fields given",400);
  } else {
    next(); //else go ahead
  }
};
/*-------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------- REST routes for app -----------------------------------------------*/

app.get("/", (req, res) => {
    res.redirect("/books"); //redirect to home page /books
});

//READ page for viewing all the books
// GET route
app.get("/books", async (req, res, next) => {
  try {
    let books = await Book.find({}); //find all books from database
    res.render("books/index2", { books }); //pass the array to render on index page
  } catch (err) { // catch any errors in database data retrieval or page rendering
    next(err); //call error handler middleware
  }
});

//GET route for form to render to accept a new Book
app.get("/books/new", (req, res) => {
  res.render("books/new2");
});

//POST request to add a book, validate the request body and then save
app.post("/books", datavalidation_book, async (req, res, next) => {
  try {
    let book = new Book(req.body.book);
    await book.save();
    res.redirect("/books");
  } catch (err) {
    next(err);// catch any errors in database data storage
  }
});

//GET route for a specific book (w.r.t. id)
app.get("/books/:id", async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id).populate("reviews");// find book by id and populate it's reviews
    let books = await Book.find({}); //find all books to display

    let rev_1 = 0,rev_2 = 0,rev_3 = 0,rev_4 = 0,rev_5 = 0; //vars for no. of reviews of diff ratings
    for(let review of book.reviews) // calculate ratings
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
    let avg_rating = (rev_1*1 + rev_2*2 + rev_3*3 + rev_4*4 + rev_5*5)/(book.reviews.length); //calc avg. rating
    avg_rating = Math.floor(avg_rating*100)/100;
    if(avg_rating)
    {
      book.avgRating = avg_rating; // store the avg rating calculated
      book.save();
    }
    else
    {
      book.avgRating = 0;
      book.save();
    }
    //ratings for rating statistics
    rev_1 = Math.floor((rev_1*100)/book.reviews.length);
    rev_2 = Math.floor((rev_2*100)/book.reviews.length);
    rev_3 = Math.floor((rev_3*100)/book.reviews.length);
    rev_4 = Math.floor((rev_4*100)/book.reviews.length);
    rev_5 = Math.floor((rev_5*100)/book.reviews.length);

    if (!book) { // if no book found throw not found error
      throw new CustomError("No Book Found",404);
    }
    res.render("books/show1", { book , books , rev_1, rev_2, rev_3, rev_4, rev_5, avg_rating});
  } catch (err) {
    next(err); // catch the error and call the error handler middleware
  }
});

//GET route for book edit form
app.get("/books/:id/edit", async (req, res) => {
  try {
    let book = await Book.findById(req.params.id); // find book by id(req params)
    if (!book) { // if no book found throw not found error
      throw new CustomError("No Book Found",404);
    }
    res.render("books/edit2", { book }); // else render the form
  } catch (err) {
    next(err); // catch the error and call the error handler middleware
  }
});

//PUT route for updating book, validate the book schema in req.params
app.put("/books/:id", datavalidation_book, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, { ...req.body.book }); //find book by id and update
    res.redirect(`/books/${book._id}`); // redirect to book show page
  } catch (err) {
    next(err); // catch the error and call the error handler middleware
  }
});

//DELETE route for deleting book 
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params; // get id in req.params and delete by id
    await Book.findByIdAndDelete(id);
    res.redirect("/books"); // redirect to books index page
  } catch (err) {
    next(err); // catch the error and call the error handler middleware
  }
});

//POST route for creating a book-review, validate schema first using middleware
app.post("/books/:id/book-review", datavalidation_bookReview, async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id); // find the book by id
      const review = new BookReview(req.body.review);// create a book-review object
      book.reviews.push(review); // add to reviews array of the book
      await review.save(); // save the review
      await book.save(); //save the book after update
      res.redirect(`/books/${book._id}`); //redirect to book show page
    } catch (err) {
      next(err); // catch the error and call the error handler middleware
    }
  }
);

//DELETE route for book-review
app.delete("/books/:id/reviews/:reviewId", async (req, res) => {
  const { id, reviewId } = req.params;
  await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // get book by it's id and get the book in array with it's id, remove it
  await BookReview.findByIdAndDelete(reviewId); // find the book review and delete it in it's collection
  res.redirect(`/books/${id}`); // redirect to book show page
});

// for all the routes other than these, show 404 page
app.all('*', (req, res, next) => {
    next(new CustomError('Page Not Found', 404));
});
/*-------------------------------------------------------------------------------------------------------------*/

/*------------------------------------ Error handler middleware -----------------------------------------------*/
//error handler middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something Went Wrong!" //default error message
    res.status(statusCode).render('error', { err }) //render error page
})
/*-------------------------------------------------------------------------------------------------------------*/

//lsiten for requests on port 300
app.listen(3000, () => {
  console.log("listening on port 3000");
});
