const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');

const Ticket = require('./models/tickets');
const Roster = require('./models/tickets');


mongoose.connect('mongodb+srv://admin:TriskelioN12@cluster0.o9j4k.mongodb.net/wfht?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection open!');
    })
    .catch(() => {
    console.log('error');
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// routes

app.get('/', async (req, res) => {
    const roster = await Roster.find({})
    res.render('tickets/new', { roster });
})

app.get('/tickets', async (req, res) => {
    const tickets = await Ticket.find({})
    res.render('tickets/index', { tickets });
});

app.get('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const tickets = await Ticket.findById(id)
    res.render('tickets/show', { tickets })
})

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`port is at ${port}`);
});








