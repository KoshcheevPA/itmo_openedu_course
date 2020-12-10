export default function appSrc(express, bodyParser, createReadStream, crypto, http) {
  const app = express();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
    next();
  });

  app.use('/login/', (req, res) => res.send('pkoshcheev'));

  app.use('/code/', (req, res) => {
    let readStream = createReadStream(import.meta.url.substring(7));
    readStream.on('open', function () {
      readStream.pipe(res);
    });
  });

  app.use('/sha1/:input/', (req, res) => {
    res.send(crypto.createHash('sha1').update(req.params.input, "binary").digest("hex"))
  });

  app.use('/req/', (req, res) => {
    if(req.method === "GET") {
      res.send(http.get(req.query.addr));
    }

    if(req.method === "POST") {
      res.send(http.get(req.body.addr));
    }
  });

  app.all('*', (req, res) => res.send('pkoshcheev'));
  return app;
}
