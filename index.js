// Server Dependencies
const express = require('express');
const mongoose = require('mongoose');
const visitorRoutes = require("./routes/visitor");
const viewRoutes = require("./routes/view");
const cors = require('cors');

// Server Setup
const app = express();

// Environment Setup
const port = 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect("mongodb+srv://joG:admin123@b295.gdrdocw.mongodb.net/capstone1-formInputs?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);

let db = mongoose.connection;

db.on('error', console.error.bind(console,'Connection error'));
db.once('open', () => console.log('Connected to MongoDB Atlas.'));

// Backend Route
app.use("/visitors", visitorRoutes);
app.use("/views", viewRoutes);

// Server Gateway Response

if(require.main === module) {
	app.listen(process.env.PORT || port, () => { console.log(`Server is now running in port ${process.env.PORT || port}.`)});
};

module.exports = {app, mongoose};