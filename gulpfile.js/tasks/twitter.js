var TwitterLib 	 = require('twitter-rest-lite')
var gulp   		 = require('gulp')
var config		 = require('../config')
var path         = require('path')
var fs           = require('fs')

var keys = {
    "consumer_key": "z5RSRR7CXrUtHSYX7PUgvdAsD",
    "consumer_secret": "wxZy9EaHrgNwx4Ob9I7YCsZtHhdyjXT137kgj9Rupe5RiurKef",
    "token": "2768611209-xwwMtJETCHqJj3eDu2geZ1sko9NIhLfuwRS71oy",
    "token_secret": "YA23CNsXBALlrQvprWtVncNp5zAdrhvAluvjo3Az0cAyX",
    "callback": "http://localhost:3000/twitter.html"
  }

var getFollowers = function(){
	var connection = new TwitterLib.API(keys);

	var params = {
		"count": 5,
		"screen_name": 'samicoman'
	};

	connection.get('/followers/list.json', params, function (err, response) {
		var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.twitterFile)
		var graphPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.graphFile)

		var graphData = {
			"name": "graphData",
			"children": []
		};

		for (var i = 0; i < response.users.length; i++) {
			graphData.children.push({"name": response.users[i].name, "size": response.users[i].followers_count, "color": "#"+response.users[i].profile_background_color});
		};

		fs.unlink(graphPath);
		fs.writeFile(graphPath, JSON.stringify(graphData));

		fs.unlink(dataPath);
		fs.writeFile(dataPath, JSON.stringify(response));

		return dataPath;

		// gulp.src(dataPath)
		// 	.pipe(insert.append(JSON.stringify(response)))
		// 	.pipe(gulp.dest(function(dataPath){
		// 		return dataPath.base;
		// 	}));

	});
}

gulp.task('twitter', getFollowers)
module.exports = getFollowers;

