const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3000;

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// RESTful ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs")
})

//INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { blogs });
        }
    })
})

//NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
})

//CREATE Route
app.post("/blogs", (req, res) => {
    // create blog
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs")
        }
    })
})

//SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundblog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", { foundblog })
        }
    })
})




app.listen(port, console.log(`App is listening on ${port}`));