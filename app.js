
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const compression = require("compression");
const helmet = require("helmet");
const path = require("path")

const connectDB = require("./config/db.config");

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

// Connection to DB
connectDB();

// Create the Express application object
const app = express();

// Set up cors to allow us to accept requests from our client
app.use(cors({
    origin: '*',
	optionsSuccessStatus: 200,
	methods: "GET, PUT"
}));

// Compress the HTTP response sent back to a client
app.use(compression()); //Compress all routes

// Use Helmet to protect against well known vulnerabilities
app.use(helmet());

// use Morgan dep in dev mode
app.use(morgan("dev"));

// Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "..", "client", "build")));

/**
 * -------------- ROUTES ----------------
 */
require("./routes/auth.route")(app);
require("./routes/post.route")(app);
require("./routes/user.route")(app);

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
// })

/**
 * -------------- SERVER ----------------
 */

// Specify the PORT which will the server running on
const PORT = process.env.PORT || 5000;

// Disabling Powered by tag
app.disable("x-powered-by");

app.listen(PORT, () => {
	console.log(`Server is running in ${process.env.NODE_ENV} mode, under port ${PORT}.`);
});
