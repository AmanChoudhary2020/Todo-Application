const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const todoController = require('./controllers/todoController');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('./public'));

todoController(app);

app.listen(PORT);
console.log('You are listening to port ' + PORT);