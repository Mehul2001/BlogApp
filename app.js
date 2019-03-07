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

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { blogs });
        }
    })
})


app.listen(port, console.log(`App is listening on ${port}`));