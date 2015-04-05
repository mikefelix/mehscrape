
var request = require('request');
var cheerio = require('cheerio');
var exec = require('child_process').exec;

url = 'http://meh.com';

var trim = function(str){
  return str.replace(/^\s*(.*)\s*$/, "$1");
};

request(url, function(error, response, html) {
    if (!error) {
        var $ = cheerio.load(html);
        var json = {};
        json.images = [];

        $('.buy-button').filter(function() {
            var price = $(this).text();
            var match;
            if (match = price.match(/\$\d+/)){
              json.price = match[0];
            }
		});

        $('.features').filter(function() {
            var title = $(this).children().first().text();
            json.name = trim(title);
        });

        $('.photos .photo').filter(function() {
            json.images.push($(this).attr('data-src'));
        });
        
        json.name = json.name.replace(/"/, '\\"');
        var cmd = 'echo "' + json.name + ' for \\' + json.price + '" | /usr/bin/mail -s "Today\'s Meh deal" michael.felix@gmail.com'
            console.log(cmd);
        exec(cmd, function callback(error, stdout, stderr){
            if (error)
              console.log("Failed to mail. " + error);
        });
    }
	else console.log("Error parsing response.");

});
