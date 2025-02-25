const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },

    price: {
    type: DataTypes.DECIMAL(10,2), 
    allowNull: false,
        validate: {
            min: 0
        }
    },

    category: {
        type: DataTypes.STRING,
        allowNull: false, 
    },

    isStock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

module.exports = Product;
