const Medicine = require("./Medicine");
const { Op } = require("sequelize");

const findByQuery = async (query) => {
  return await Medicine.findAll({
    where: {
      [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
    },
  });
};

module.exports = {
  findByQuery,
};
