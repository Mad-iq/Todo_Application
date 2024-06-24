const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:12345@cluster0.vuepahp.mongodb.net/todos")
const todoSchema= mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);
module.exports={
    todo
}