module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    price: DataTypes.FLOAT,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    area: DataTypes.FLOAT,
    place: DataTypes.INTEGER,
    type: DataTypes.STRING
  })

  Property.associate = (models) => {
    Property.belongsTo(models.Property, { foreignKey: 'user_id', as: 'user' })
    Property.belongsToMany(models.Property, { foreignKey: 'property_id', through: models.Favorite, as: 'favorite_users' })
    Property.belongsToMany(models.Property, { foreignKey: 'property_id', through: models.Rental, as: 'rental_user' })
    Property.hasMany(models.Image, { foreignKey: 'property_id', as: 'images' })
  }

  return Property
}