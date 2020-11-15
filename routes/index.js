module.exports = (app) => {
  require('./homeRoute')(app);
  require('./authRoute')(app);
};
