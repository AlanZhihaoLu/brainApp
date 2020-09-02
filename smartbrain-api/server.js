const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors'); // Needed to enable CORS

const app = express();

app.use(express.json()); // REMEMBER TO HAVE THE APP PARSE THE REQUEST IN JSON, WHENEVER A REQUEST COMES IN
app.use(cors()) // ENABLE CORS

const database = { // makeshift database, for now
    // This is not that useful, for now, because the data does not persist (every time the server restarts, all of the new info that's added gets wiped)
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies', // In real life, you would NEVER store passwords as plain text. 
            // Instead, we would store passwords in hashes
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

// THE PLAN:
// '/' --> GET
// '/signin' --> POST = success/fail
// '/register' --> POST = user
// '/profile/:userId' --> GET = user
// '/image' --> PUT = [update user score] 

app.get('/', (req,res) => {
    res.json(database.users); // use .json to send json strings
})

app.post('/signin', (req,res) => {
    // bcrypt.compare("apples", '$2a$10$v6FAek6yK753YcK9R.eQY.cTpFTn4OiJhIoaGYEhd08npw23ym3rS', function(err, res) {
    //     console.log('first guess', res);
    // });
    // bcrypt.compare("veggies", '$2a$10$v6FAek6yK753YcK9R.eQY.cTpFTn4OiJhIoaGYEhd08npw23ym3rS', function(err, res) {
    //     console.log('second guess', res);
    // });
    if (req.body.email === database.users[0].email && // checking if the information in the body of the request matches the information in the database
        req.body.password === database.users[0].password) {
            res.json('success'); // respond with 'success'
        } else {
            res.status(400).json('error logging in'); // respond with 400 status code and 'error logging in'
        }
    res.json('signin'); // respond with 'signin'
})

app.post('/register', (req,res) => {
    const { email, name, password } = req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
        console.log(hash);
    });
});
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]) // REMEMBER TO SEND A RESPONSE, OR THE TRANSACTION WILL NEVER END
})

app.get('/profile/:id', (req,res) => { // This format means that id is provided as a parameter, not in the body or in some other place in the request
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(404).json('no such user'); // status code 404 not found
    }
}) 

app.post('/image', (req,res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++; // increment entries for that particular user
            return res.json(user.entries);
        } 
    })
    if (!found) {
        res.status(404).json('no such user'); // status code 404 not found
    }
})

app.listen(3000, ()=>{ // We can have a second function parameter in .listen(), which will run once the listen happens
    console.log('app is running on port 3000')
})
