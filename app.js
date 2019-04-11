const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { projects } = require("./data.json");

const app = express();

// Init Parsing of Req Body & Cookies
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use('/static', express.static('public'))

// Setup Pug
app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const projectRoutes = require('./routes/project');

app.use(mainRoutes);
app.use('/project', projectRoutes);

app.use((req, res, next) => {
    const err = new Error(`Page not found!`);
    err.status = 404;
    console.error(err.message);
    return next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', {
        err: err
    });
});

app.listen(3000, () => {
    console.log(`The application is now running on localhost:3000!`);
});