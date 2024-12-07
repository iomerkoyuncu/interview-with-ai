import axios from 'axios';
const service = {
	async get() {
		return 'Hello World';
	},
	postForm: async (url: string, data: { prompt: string }) => {
		try {
			const response = await axios({
				method: 'post',
				url: url,
				data: data,
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return response;
		} catch (error) {
			console.error('Error:', error);
		}
	},
};

export default service;
