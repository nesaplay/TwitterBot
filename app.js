const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config);

let params = {
	q: '#ios',
	count: 5
	// result_type: 'recent'
};

T.get('search/tweets', params, (err, data, response) => {
	if (!err) {
		if (data.statuses.length === 0) {
			console.log('No tweets found!');
		}
		for (let i = 0; i < data.statuses.length; i++) {
			console.log(data.statuses[i].text);
			console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
			
			let id = { id: data.statuses[i].id_str };

			// Favorite Tweet by ID
			T.post('favorites/create', id, (err, response) => {
				if (!err) {
					let username = response.user.screen_name;
					let tweetId = response.id_str;
					console.log(
						'Favorited: ',
						`https://twitter.com/${username}/status/${tweetId}`
					);
				} else {
					console.log(err);
				}
			});

			// Retweet by ID
			T.post('statuses/retweet', id, (err, response) => {
				if (!err) {
					let username = response.user.screen_name;
					let tweetId = response.id_str;
					console.log(
						'Retweeted: ',
						`https://twitter.com/${username}/status/${tweetId}`
					);
				} else {
					console.log(err);
				}
			});
		}
	} else {
		console.log(err);
	}
});
