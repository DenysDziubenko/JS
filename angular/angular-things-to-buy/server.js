let bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	express = require("express"),
	app = express(),
    path = require('path'),
    thingToBuySchema = new mongoose.Schema({
    name: String,
    description: { type: String, default: 'add some description' },
    scores: { type: Number, default: 0 }
  }),
	ThingToBuy = mongoose.model("ThingToBuy", thingToBuySchema);

mongoose.connect("mongodb://localhost/angular-things-to-buy");
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 8090);

app.get("/api/things", (req, res) => {
	let query = req.query.name ? {"name" : {$regex : ".*" + req.query.name + ".*"}} : {};
  ThingToBuy.find( query , (err, things) => {
    let sortedThings = things.sort((thingA, thingB) =>{ return thingB.scores - thingA.scores});
    return err ? logErr(err) : res.send(sortedThings)
  });
});

app.get("/api/things/:id", (req, res) => {
  ThingToBuy.findById(req.params.id, (err, foundThing) => { return err ? logErr(err) : res.send(foundThing) });
});

app.post("/api/things", (req, res) => {
  ThingToBuy.create(req.body, (err, newThing) => { return err ? logErr(err) : res.send(newThing) });
});

app.put("/api/things", (req, res) => {
	let updates = { $set: { name: req.body.name, description: req.body.description, scores: req.body.scores } };
  ThingToBuy.findByIdAndUpdate(req.body._id, updates, (err, updatedThing) => {
		return err ? logErr(err) : res.send(updatedThing);
	});
});

app.delete("/api/things/:id", (req, res) => {
  ThingToBuy.findByIdAndRemove(req.params.id, (err) => {
		return err ? logErr(err) : res.json({ ok: true });
	});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

let logErr = (err) => {
	console.log(err);
	return err;
};

app.listen(app.get('port'), () => {console.log("App is running on the port " + app.get('port'))});

