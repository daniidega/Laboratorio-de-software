const Converter = require("csvtojson").Converter;
const converter = new Converter({ });

module.exports = () => {

};

converter.fromFile("../../uploads//qafacol_CP2.csv", function (err, result) {
  if (err) {
    console.log("An Error Has Occured");
    console.log(err);
  }
  var json = JSON.stringify(result);
  console.log(json);
});

module.exports = converter; 