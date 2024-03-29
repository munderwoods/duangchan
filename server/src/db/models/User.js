const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    roles: {
      type: DataTypes.STRING,
      allowNull: false
    },

    confirmationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },

    confirmationRequestedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }

  })

  User.associate = models => {
    User.hasMany(models.Review, {
      foreignKey: 'userId'
    })
  }

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.addHook('beforeCreate', user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
  })

  return User
}
