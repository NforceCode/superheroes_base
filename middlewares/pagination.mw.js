module.exports = async (req, res, next) => {
  try {
    const {
      query: { limit, offset }
    } = req;

    req.pagination = {
      limit: limit > 0 || limit < 50 ? limit : 10,
      offset: offset >= 0 ? offset : 0
    };

    next();
  } catch (err) {
    next(err);
  }
};
