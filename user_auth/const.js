require("dotenv").config()
const JWT_KEY = process.env.JWT_KEY;
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.USER_PORT;

module.exports = {
	JWT_KEY, MONGODB_URL, PORT
}
