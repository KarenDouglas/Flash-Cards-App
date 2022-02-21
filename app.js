const express = require('express');
const { render } = require('express/lib/response');

const app = express();

app.set('view engine', 'ejs');

app.listen(5000);

app.get('/' , (req, res) => {
    res.render('index')
});
app.get('/about' , (req, res) => {
    res.render('about')
});
app.get('/add-cards' , (req, res) => {
    res.render('add-cards')
});
app.get('/create-deck' , (req, res) => {
    res.render('create')
});