const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const server = express();

hbs.registerPartials("./views/partials");
server.set("view engine", "hbs");

server.use((req, res, next) => {
	const now = new Date().toString();
	fs.appendFile("logs.txt", `${now}: ${req.method} - ${req.url}\n`);
	next();
});

server.use((req, res, next) => {
	res.render("maintenance.hbs")
});

server.use(express.static("./views"));

hbs.registerHelper("year", () => {
	return new Date().getFullYear();
});

server.get("/", (req, res) => {
	res.render("home.hbs", {
		title: "Home",
		message: "Welcome to ExpressJS!"
	});
});

server.get("/about", (req, res) => {
	res.render("about.hbs", {
		title: "About"
	});
});

server.listen(3000, () => {
	console.log("Server is running...");
});