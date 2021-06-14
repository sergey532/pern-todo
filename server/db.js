const Sequelize = require("sequelize")

module.exports = new Sequelize("perntodo", "sysadmin", "syspassword", {
  dialect: "postgres",
  host: "localhost",
  define: {
        timestamps: false
    }
})