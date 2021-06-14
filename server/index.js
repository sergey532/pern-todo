const express = require("express");
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize")
const db = require("./db")
const Todo = require("./models/Todo")

// Test подключения к базе данных
db.authenticate()
	.then(() => console.log('Database connected...'))
	.catch(err => console.log('Error:' + err))

db.sync(/*{force:true}*/).then(()=>{
  console.log("Tables have been created")
}).catch(err=>console.log(err)); 


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await Todo.create({description})
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await Todo.findAll()
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    res.json(todo);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await Todo.update({description, id}, {where: {id: id}});

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.destroy({where: {id: id}})
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});