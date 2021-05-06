//const bodyParser = require('body-parser');
//const urlencodedParser = bodyParser.urlencoded({extended:false});
const mongoose = require('mongoose');

const uri = 'mongodb+srv://test:test@todo.cqrnb.mongodb.net/todo?retryWrites=true&w=majority';

const client = async () => {
    await mongoose.connect(uri,{ useNewUrlParser: true });
    console.log('db connected');
}

client();
const todoSchema = new mongoose.Schema({
    item: String
});

const Todo = mongoose.model('Todo',todoSchema);


let data = [{item:'get milk'},{item:'walk dog'},{item:'code'}];


module.exports = function(app) {
    app.get('/todo', function(req,res) {
        Todo.find({},(err,data) => {
            if(err) throw err;
            res.render('todo',{todos:data});
        })
    });

    app.post('/todo', function(req,res) {
        const newTodo = Todo(req.body).save((err,data) => {
            if(err) throw err;
            res.json({todos:data});
        });
    });

    app.delete('/todo/:item', function(req,res) {
        Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteOne((err, data) => {
            if(err) throw err;
            res.json({todos:data});
        });
    });
};