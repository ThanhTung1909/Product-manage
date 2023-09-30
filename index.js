const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const multer  = require('multer');
require('dotenv').config();

const database = require("./config/database.js");
const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();

const app = express()
const port = process.env.PORT;

app.use(methodOverride("_method"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Flash
app.use(cookieParser('FHDHGJHMHG'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

// Route
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});