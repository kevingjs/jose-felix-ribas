const News = require("../models/newsModel");

const newsCtrl = {
	getNews: async (req, res) => {
		try {
			const news = await News.find().select("-by -updatedAt -__v").sort({ createdAt: -1 });

			if (news.length < 1) return res.json({
				status: 400,
				success: false,
				content: "Aun no hay noticias disponibles."
			});

			return res.json({
				status: 200,
				success: true,
				content: news
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

module.exports = newsCtrl;