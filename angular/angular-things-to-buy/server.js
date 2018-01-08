let bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	express = require("express"),
	app = express(),
  thingToBuySchema = new mongoose.Schema({
    name: String,
    description: { type: String, default: 'add some description' },
    scores: { type: Number, default: 0 }
  }),
	ThingToBuy = mongoose.model("ThingToBuy", thingToBuySchema);

mongoose.connect("mongodb://localhost/angular-things-to-buy", {
  useMongoClient: true
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 8090);

app.get("/things", (req, res) => {
	let query = req.query.name ? {"name" : {$regex : ".*" + req.query.name + ".*"}} : {};
  ThingToBuy.find( query , (err, things) => {
    let sortedThings = things.sort((thingA, thingB) =>{ return thingB.scores - thingA.scores});
    return err ? logErr(err) : res.send(sortedThings)
  });
});

app.get("/things/:id", (req, res) => {
  ThingToBuy.findById(req.params.id, (err, foundThing) => { return err ? logErr(err) : res.send(foundThing) });
});

app.post("/things", (req, res) => {
  ThingToBuy.create(req.body, (err, newThing) => { return err ? logErr(err) : res.send(newThing) });
});

app.put("/things", (req, res) => {
	let updates = { $set: { name: req.body.name, description: req.body.description, scores: req.body.scores } };
  ThingToBuy.findByIdAndUpdate(req.body._id, updates, (err, updatedThing) => {
		return err ? logErr(err) : res.send(updatedThing);
	});
});

app.delete("/things/:id", (req, res) => {
  ThingToBuy.findByIdAndRemove(req.params.id, (err) => {
		return err ? logErr(err) : res.json({ ok: true });
	});
});

let logErr = (err) => {
	console.log(err);
	return err;
};

app.listen(app.get('port'), () => {console.log("App is running on the port " + app.get('port'))});

