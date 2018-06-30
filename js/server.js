const http = require('http');

let app = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  let resObject = {
    posts: [
      {
        firstname: "Unknown",
        lastname: "User",
        userimage: "",
        message: "I ate apple today",
        likes: 4,
        time: "09:55"
      },
      {
        firstname: "David",
        lastname: "Beckham",
        userimage: "",
        message: "I ate apple today",
        likes: 0,
        time: "11:23"
      },
      {
        firstname: "Leonel",
        lastname: "Messi",
        userimage: "https://cdn.images.express.co.uk/img/dynamic/67/590x/Barcelona-news-team-Lionel-Messi-885979.jpg",
        message: "Good bye world cup 2018",
        likes: 5,
        time: "12:34",
        postimage: "https://www.davar1.co.il/wp-content/uploads/2017/04/090417_soccer-688x387.jpg"
      },
      {
        firstname: "Becky",
        lastname: "Hosgun",
        userimage: "https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-1/p40x40/26992702_10213578644514950_3193940428532612544_n.jpg?_nc_cat=0&oh=d6af27545c83f67f741a4458ef48fe85&oe=5BBBA7C2",
        message: "I ate apple today",
        likes: 10,
        time: "14:38"
      },
      {
        firstname: "Becky",
        lastname: "Hosgun",
        userimage: "https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-1/p40x40/26992702_10213578644514950_3193940428532612544_n.jpg?_nc_cat=0&oh=d6af27545c83f67f741a4458ef48fe85&oe=5BBBA7C2",
        message: "I ate apple today",
        likes: 50,
        time: "15:08",
        postimage: "https://www.islands.com/sites/islands.com/files/styles/380_4x3/public/islands-homepage-grid-beach.jpg?itok=MFnibsJe"
      },
      {
        firstname: "Cristiano",
        lastname: "Ronaldo",
        userimage: "http://www.parisfans.fr/wp-content/uploads/2015/07/Mercato-Ronaldo-aurait-fix%C3%A9-sa-condition-pour-rejoindre-le-PSG.jpg",
        message: "Good bye world cup 2018 too",
        likes: 10,
        time: "15:55"
      }
    ]
  };

  res.end(JSON.stringify(resObject));
});

app.listen(3000, '127.0.0.1');
console.log('Server is running');