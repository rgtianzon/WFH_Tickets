const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');


const methodOverride = require('method-override');

const Ticket = require('./models/tickets');
const Roster = require('./models/roster');


mongoose.connect('mongodb+srv://admin:TriskelioN12@cluster0.o9j4k.mongodb.net/wfht?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection open!');
    })
    .catch(() => {
    console.log('error');
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({ secret: 'notagoodsecret' }));

let ids;


// routes

// adding tickets
app.get('/', async (req, res) => {
    const roster = await Roster.find({})
    const tickets = await Ticket.find({})
    res.render('tickets/new', { roster, tickets });
    console.log(tickets[tickets.length - 1].ticketID + 1)
})

app.post('/tickets', async (req, res) => {
    const tickets = await Ticket.find({})
    req.body.ticketID = tickets[tickets.length - 1].ticketID + 1
    req.body.status = "Open"
    const newTicket = new Ticket(req.body);
    console.log(newTicket);
    await newTicket.save()
        .then(() => {
            res.redirect(`/tickets/${newTicket._id}`)
        })
})

// Showing a ticket
app.get('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const tickets = await Ticket.findById(id)
    res.render('tickets/show', { tickets })
})

//below are admin functions

// add user
app.get('/adduser', (req, res) => {
    res.render('tickets/adduser');
})

app.post('/adduser', async (req, res) => {
    const { empID, name, email, password, manEmail, Account } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new Roster({
        empID,
        name,
        email,
        password: hash,
        manEmail,
        Account
    })
    await user.save();
    res.send(hash);
})
// end add user

// log in to tickets
app.get('/admin', (req, res) => {
    res.render('tickets/admadmin')
});

app.post('/admin', async (req, res) => {
    const { email, password } = req.body;
    const user = await Roster.findOne({ email });
    const validPW = await bcrypt.compare(password, user.password);
    if (validPW) {
        req.session.user_id = user._id;
        res.redirect('/tickets');
    } else {
        res.send("ERROR");
    }
})

// Showing all tickets
app.get('/tickets', async (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/admin')
    } else {
        const tickets = await Ticket.find({}).sort({created_at: -1});
        res.render('tickets/index', { tickets });
    }
});

// updating a ticket
app.get('/tickets/:id/edit', async (req, res) => {
    const { id } = req.params;
    const tickets = await Ticket.findById(id);
    res.render('tickets/edit', { tickets });
})

app.put('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect(`/tickets/${ticket._id}`);
})

// logout
app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/admin');
})


const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`port is at ${port}`);
});








