const express = require('express');
const { render } = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const User = require('./models/user');
const FlashcardDeck = require('./models/flashcardDeck');

const dbURI = require('./hideme');
const { urlencoded } = require('express');

const app = express();
const port = 5000;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {

    app.listen(port);

    console.log(`connected to db on localhost:${port}`)
})
.catch(err => console.log('error',err))

app.set('view engine', 'ejs');



app.use(express.static('public'));
app.use(express.urlencoded({urlencoded:true}));
app.use(morgan('dev'));

app.get('/' , (req, res) => {
 res.redirect('/flashcards')
});
app.get('/about' , (req, res) => {
    res.render('about',  {title: 'About'})
});

//database test
app.get('/add-decks' , (req, res) => {
     const flashcardDeck = new FlashcardDeck({
         title: "Mock Deck 2",
         cards: [ 
             {prompt: "2Prompt1", response: "reponse 1"},
             {prompt: "2Prompt2", response: "reponse 2"},
             {prompt: "2Prompt3", response: "reponse 3"},
             {prompt: "2Prompt4", response: "reponse 4"}
            
            ]
     })
    flashcardDeck.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err)=> console.log(err));
});

app.get('/all-decks', (req, res) => {
    FlashcardDeck.find()
        .then(results => {
            res.send(results)
        })
        .catch(err => console.log (err));
});

app. get('/single-deck', (req, res) =>{
    FlashcardDeck.findById("6243602141a53714a5b6ce27")
    .then((result)=> {
        res.send(result)
    })
    .catch(err => console.log (err));
});
//end of test 


app.get('/login' , (req, res) => {
    res.render('login',  {title: 'Log in'})
});
app.get('/signup' , (req, res) => {
    res.render('signup',  {title: 'Sign Up'})
});


// flash cards routes


app.get('/flashcards' , (req, res) => {
    FlashcardDeck.find().sort({createdAt: -1})
    .then(results => {
        res.render('index',  {title: 'Home', flashcarddecks: results})
        
        })
        .catch(err => console.log(err)
        );
});
app.post('/flashcards', (req, res) => {

})
app.get('/add-cards' , (req, res) => {
    res.render('add-cards',  {title: 'Add Cards'})
});
app.get('/flashcards/create-deck' , (req, res) => {
    res.render('create',  {title: 'Create Deck'})
});

// 404 PAGE 
app.use((req, res)=> {
    res.render('404', {title: "404 Error"})
})