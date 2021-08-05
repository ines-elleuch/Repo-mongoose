const express = require("express");
const connect = require("./config/connect");
const person = require("./model/person");
const group = require("./newgroup");
require("dotenv").config({ path: "./config/.env" });

const app = express();

app.use(express.json());

connect();

//1-Create and Save a Record of a Model

newperson = new person({
  Name: "Ines",
  Age: "26",
  FavoriteFoods: ["Lasagne", "Sushi"],
});

newperson.save(function (err, doc) {
  if (err) return console.error(err);
  console.log("Document instance created ", doc);
});

//2-Create Many Records with model.create()
(async () => {
  try {
    const result = await person.create([
      { Name: "Mehdi", Age: 23, FavoriteFoods: ["Lasagne"] },
      { Name: "Sahar", Age: 28, FavoriteFoods: ["Pizza"] },
      { Name: "Jihene", Age: 35, FavoriteFoods: ["Mloukhiya"] },
    ]);
    console.log("Multiple records added successfully");
  } catch (error) {
    console.log(error);
  }
})();

//3-Use model.find() to Search Your Database
(async () => {
  try {
    const result = await person.find({ name: "kais" });
    console.log("Result of search : ", result);
  } catch (error) {
    console.log(error);
  }
})();

//4-use model.findOne() to Return a Single Matching Document from Your Database

(async () => {
  try {
    const result = await person.findOne({ Name: "Mahdi" });
    console.log("Result of search with findone : ", result);
  } catch (error) {
    console.log(error);
  }
})();

//5-Use model.findById() to Search Your Database By _id--------------------

(async () => {
  try {
    const result = await person.findOne({ _id: "60fabe8c17e2743f20cb42a4" });
    console.log("Result of search with Id : ", result);
  } catch (error) {
    console.log(error);
  }
})();

//6-Perform Classic Updates by Running Find, Edit, then Save ---------------

(async () => {
  try {
    const result = await person.findOne({ _id: "60fabe8c17e2743f20cb42a4" });
    result.favoriteFoods.push("Pizza");
    result.markModified("favoriteFoods");
    await result.save();
  } catch (error) {
    console.log(error);
  }
})();

//7-Perform New Updates on a Document Using model.findOneAndUpdate()-------------

(async () => {
  try {
    const result = await person.findOneAndUpdate(
      { Name: "Mariem" },
      { $set: { age: 20 } },
      { new: true }
    );
    console.log("Result of findOneAndUpdate : ", result);
  } catch (error) {
    console.log(error);
  }
})();

//8-Delete One Document Using model.findByIdAndRemove------------------------

(async () => {
  try {
    const result = await person.findByIdAndRemove({
      _id: "60fabf0f6064770808257df6",
    });
    console.log("Result of findByIdAndRemove : ", result);
  } catch (error) {
    console.log(error);
  }
})();

//9-MongoDB and Mongoose - Delete Many Documents with model.remove()------------

(async () => {
  try {
    person.remove({ name: "Mary" }, function (err, res) {
      if (err) console.log(err);
      else console.log("Result of remove : ", res);
    });
  } catch (error) {
    console.log(error);
  }
})();

//10-Chain Search Query Helpers to Narrow Search Results--------------------

(async () => {
  try {
    await person
      .find({ favoriteFoods: "Mloukhiya" })
      .sort({ age: 1 })
      .limit(2)
      .select({ age: false })
      .exec()
      .then((doc) => console.log("The last result : ", doc))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
})();

//////////////////////////////////////////////////////////////////

const port = 8000;

app.listen(port, (err) => {
  err
    ? console.log("server could not connect")
    : console.log(`The server is running on ${port}`);
});
