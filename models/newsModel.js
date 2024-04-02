const { Schema, model } = require('mongoose');

const newsSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	body: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	image: {
		type: Schema.Types.ObjectId,
		ref: 'Pics'
	},
	by: {
		type: Object,
		required: true
	},
	code: {
		type: String
	},
	featured: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

function autoPopulate(next) {
	this.populate({ path: 'image', select: 'public_id url' });
	next();
};

newsSchema.pre('find', autoPopulate);
newsSchema.pre('findOne', autoPopulate);

module.exports = model('News', newsSchema);