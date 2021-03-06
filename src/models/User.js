const auth = require('../utils/auth')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: async (user) => {
        if(user.password){
          user.password = await auth.encryptPassword(user.password)
        }
      }
    }
  })

  User.associate = (models) => {
    User.hasMany(models.Property, { foreignKey: 'user_id', as: 'properties' })
    User.belongsToMany(models.Property, { foreignKey: 'user_id', through: models.Favorite, as: 'favorites' })
    User.belongsToMany(models.Property, { foreignKey: 'user_id', through: models.Rental, as: 'rentals' })
  }

  return User
}