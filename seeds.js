const mongoose = require('mongoose');
const Roster = require('./models/roster');


mongoose.connect('mongodb+srv://admin:TriskelioN12@cluster0.o9j4k.mongodb.net/wfht?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection open!');
    })
    .catch(() => {
    console.log('error');
    })

const p = new Roster({
    empID: '1234598',
    name: 'Raquel Avilino',
    email: 'raquelt@xtendops.us',
    manEmail: 'marlan@xtendops.us',
    Account: 'Smashtech',
})
p.save()
    .then(p => {
        console.log(p)
    })