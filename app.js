export default function appSrc(express, bodyParser, createReadStream, crypto, http, mongoose, User, Zombie) {
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
      http.get(req.query.addr,  (result) => {

        let rawData = '';
        result.on('data', (chunk) => { rawData += chunk; });
        result.on('end', () => {
            res.send(rawData);
        });
      })
    }

    if(req.method === "POST") {
      http.get(req.body.addr, (result) => {
        let rawData = '';
        result.on('data', (chunk) => { rawData += chunk; });
        result.on('end', () => {
          res.send(rawData);
        });
      });
    }
  });

  app.post('/insert/', async(req, res) => {
    const {password, login, URL} = req.body;
    const m = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    const newUser = new User({login, password});
    await newUser.save();

    res.send(result)

  });

  app.use('/test/', async(req, res) => {
    const page = new Zombie();
    await page.visit(req.query.URL);
    await page.pressButton('#bt');
    const result = await page.document.querySelector('#inp').value;
    res.send(result)
  });

  app.all('*', (req, res) => res.send('pkoshcheev'));
  return app;
}
