const { Schema, model } = require('mongoose');

const picSchema = new Schema({
	public_id: {
		type: String,
		required: true,
		unique: true
	},
	url: {
		type: String,
		required: true,
		unique: true
	},
	by: {
		type: Object,
		required: true
	},
	code: {
		type: String
	},
	post: {
		type: Object
	}
}, {
	timestamps: true
});

module.exports = model('Pics', picSchema);