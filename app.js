const express = require('express');
const { render } = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const User = require('./models/user');
const dbURI = require('./hideme')

const app = express();


mongoose.connect(dbURI)
.then((result) => {
    app.listen(5000);
    console.log('conntected to db')
})
.catch(err => console.log('error',err))

app.set('view engine', 'ejs');



app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/' , (req, res) => {
    const user ={
        username: 'Your',
        password: 'test123',
        flashcardDeck: [{title: "Sample deck", cards:[]},{title: "Sample deck", cards:[]},{title: "Sample deck", cards:[]}]
    }

    res.render('index', {title: 'Home', user})
});
app.get('/about' , (req, res) => {
    res.render('about',  {title: 'About'})
});

//database test
app.get('/all-users' , (req, res) => {
    // const user = new User({
    //     username: 'Emily',
    //     password: 'test123',
    //     flashcardDeck: [{title: "e first deck", cards:[]},{title: "e third deck", cards:[]},{title: "e second deck", cards:[]}]
    // })

    
    User.find()
    .then((result)=> {
       res.send(result)
    })
    .catch(err => console.log(err))
    
});
app.get('/login' , (req, res) => {
    res.render('login',  {title: 'Log in'})
});
app.get('/signup' , (req, res) => {
    res.render('signup',  {title: 'Sign Up'})
});
app.get('/:username' , (req, res) => {
  
    User.findOne(req.body)
    .then((user)=> {
        
       console.log(user)
       
      
     
        res.render('dashboard', {title: 'Home', user})
    
    })
    .catch(err => console.log(err))
});
app.get('/add-cards' , (req, res) => {
    res.render('add-cards',  {title: 'Add Cards'})
});
app.get('/create-deck' , (req, res) => {
    res.render('create',  {title: 'Create Deck'})
});


app.use((req, res)=> {
    res.render('404', {title: "404 Error"})
})