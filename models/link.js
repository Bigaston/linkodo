'use strict';
module.exports = (sequelize, DataTypes) => {
	const Link = sequelize.define('Link', {
		short: {
			type: DataTypes.STRING,
			unique: true
		},
		long: DataTypes.STRING,
		nb: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {});

	Link.associate = function(models) {
	
	};
	return Link;
};