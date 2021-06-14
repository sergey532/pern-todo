const Sequelize = require("sequelize")
const db = require('../db')

const Todo = db.define("todo", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: false,
    
  }
  
})

module.exports = Todo