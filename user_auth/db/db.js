const mongoose = require('mongoose')

function connect(port) {
	mongoose.connect(port, {
		useNewUrlParser: true,
	})
}

module.exports = {
	connect
};
