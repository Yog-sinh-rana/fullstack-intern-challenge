const express = require('express');
const sequelize = require('./config');
const app = express();

app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/store', require('./routes/store'));
app.use('/rating', require('./routes/rating'));

sequelize.sync().then(() => {
  app.listen(3001, () => console.log('Backend running on 3001'));
});