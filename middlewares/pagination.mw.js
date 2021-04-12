module.exports = async (req, res, next) => {
  try {
    const {
      query: { limit, offset }
    } = req;

    req.pagination = {
      limit: !isNaN(Number(limit)) && (limit > 0 || limit < 5) ? limit : 5,
      offset: !isNaN(Number(offset)) && offset >= 0 ? offset : 0
    };

    next();
  } catch (err) {
    next(err);
  }
};
