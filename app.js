const express = require('express');
const { render } = require('express/lib/response');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

app.listen(5000);

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/' , (req, res) => {
    const userOne ={
        username: 'Karen',
        password: 'test123',
        flashcardDeck: [{title: "first deck", cards:[]},{title: "third deck", cards:[]},{title: "second deck", cards:[]}]
    }

    res.render('index', {title: 'Home', userOne})
});
app.get('/about' , (req, res) => {
    res.render('about',  {title: 'About'})
});
app.get('/add-cards' , (req, res) => {
    res.render('add-cards',  {title: 'Add Cards'})
});
app.get('/create-deck' , (req, res) => {
    res.render('create',  {title: 'Create Deck'})
});
app.get('/login' , (req, res) => {
    res.render('login',  {title: 'Log in'})
});
app.get('/signup' , (req, res) => {
    res.render('signup',  {title: 'Sign Up'})
});
app.use((req, res)=> {
    res.render('404', {title: "404 Error"})
})