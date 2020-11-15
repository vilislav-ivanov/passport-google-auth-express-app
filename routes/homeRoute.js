module.exports = (app) => {
  app.get('/', (req, res) => {
    return res.json({ msg: 'Hello' });
  });
};
