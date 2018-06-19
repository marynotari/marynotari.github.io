let Twitter   = require('twitter')
let json2csv  = require('json2csv');
let fs        = require("fs");
let express   = require('express');
let app       = express();
let server    = app.listen(3000);
let io        = require('socket.io')(server);

// Send index.html to client when an HTTP request is received
app.use(express.static('public'));
app.get('/', function(req, res) { //req = request, res = response, all have methods
    res.sendFile(__dirname + '/index.html'); // __dirname = current directory
});

let fields = ['id_str','created_at','text', 'user.screen_name','user.lang','coordinates.coordinates'];
let newLine= "\r\n";

//DYSTOPIA
let client1 = new Twitter({
  consumer_key:         '4sZ1jEU8ewVxTWzDnJOb6WNOv',
  consumer_secret:      'Z2kQiFQIgUcj33bM5Ky72ngi2Oz8LXyPZaYOmTtEjWtGr9jbte',
  access_token_key:     '17403706-H1lh1VVxbOysoEMKcoLbXZ9TY2RRA52wNKkZWlf0p',
  access_token_secret:  '0z8rbyTMhXuOJ8QPI2z8AZOt0u2kAzHny3xg5CzredD0T',
})

// Track "dystopia"
client1.stream('statuses/filter', {
        track: 'dystopia',
    }, function(tweetStream) {

        tweetStream.on('data', function(tweet) {
            futureTweet(tweet);
            let toCSV = { data: tweet, fields: fields, hasCSVColumnTitle: false };
            fs.stat('dystopiaTweets.csv', function (err, stat) {
                if (err == null) {
                    console.log('File exists');
                    let csv = json2csv(toCSV) + newLine;
                    console.log(csv);
                    fs.appendFile('dystopiaTweets.csv', csv, function (err) {
                        if (err) throw err;
                        console.log('The "data to append" was appended to file!');
                    });
                }
                else {
                    console.log('New file, just writing headers');
                    fields = (fields + newLine);

                    fs.writeFile('dystopiaTweets.csv', fields, function (err, stat) {
                        if (err) throw err;
                        console.log('file saved');
                    });
                }
            });
        });
});

// Track "utopia"
// client1.stream('statuses/filter', {
//   track: 'utopia',
// }, function(tweetStream) {
//
//     tweetStream.on('dataUtopia', function(tweet) {
//         futureTweet(tweet);
//         let toCSV = { data: tweet, fields: fields, hasCSVColumnTitle: false };
//         // fs.stat('dystopiaTweets.csv', function (err, stat) {
//         fs.stat('utopiaTweets.csv', function (err, stat) {
//             if (err == null) {
//                 console.log('File exists');
//                 let csv = json2csv(toCSV) + newLine;
//                 console.log(csv);
//                 fs.appendFile('utopiaTweets.csv', csv, function (err) {
//                     if (err) throw err;
//                     console.log('The "data to append" was appended to file!');
//                 });
//             }
//             else {
//                 console.log('New file, just writing headers');
//                 fields = (fields + newLine);
//
//                 fs.writeFile('utopiaTweets.csv', fields, function (err, stat) {
//                     if (err) throw err;
//                     console.log('file saved');
//                 });
//             }
//         });
//     });
// });

// // Track "futurism"
// client1.stream('statuses/filter', {
//       track: 'futurism'
//     }, function(tweetStream) {
//
//     tweetStream.on('data', function(tweet) {
//         futureTweet(tweet);
//         let toCSV = { data: tweet, fields: fields, hasCSVColumnTitle: false };
//         fs.stat('dystopiaTweets.csv', function (err, stat) {
//             if (err == null) {
//                 console.log('File exists');
//                 let csv = json2csv(toCSV) + newLine;
//                 console.log(csv);
//                 fs.appendFile('dystopiaTweets.csv', csv, function (err) {
//                     if (err) throw err;
//                     console.log('The "data to append" was appended to file!');
//                 });
//             }
//             else {
//                 console.log('New file, just writing headers');
//                 fields = (fields + newLine);
//
//                 fs.writeFile('dystopiaTweets.csv', fields, function (err, stat) {
//                     if (err) throw err;
//                     console.log('file saved');
//                 });
//             }
//         });
//     });
// });


function futureTweet(data){
  io.sockets.emit('mysocket', data);
}
