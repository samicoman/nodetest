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
		//response = {'profiles': [{ 'name': '1'},{'name': '2'}]};
		//console.log(response);

		var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.twitterFile)

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

