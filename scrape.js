
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

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
        
        console.dir(json); 

/*        $('.star-box-giga-star').filter(function() {
            var data = $(this);
            rating = data.text();

            json.rating = rating;
        });*/
    }
	else console.log("Error parsing response.");
	
    // To write to the system we will use the built in 'fs' library.
    // In this example we will pass 3 parameters to the writeFile function
    // Parameter 1 :  output.json - this is what the created filename will be called
    // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
    // Parameter 3 :  callback function - a callback function to let us know the status of our function

/*    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {

        console.log('File successfully written! - Check your project directory for the output.json file');

    });
*/


});