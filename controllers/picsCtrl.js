const Pic = require('../models/picModel');

const picsCtrl = {
	getPics: async (req, res) => {
		try {
			const pics = await Pic.find().select('url').sort({ createdAt: -1 });

			if (pics.length < 1) {
				const error = {
					status: 400,
					success: false,
					content: "Aun no hay fotos disponibles."
				};
				return res.json(error);
			};

			return res.json({
				status: 200,
				success: true,
				content: pics
			});
		} catch (err) {
			const { message } = err;
			const error = {
				status: 500,
				success: false,
				content: message
			};

			console.error(error);
			return res.json(error);
		};
	}
};

module.exports = picsCtrl;