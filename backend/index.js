const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
//admin
const user = require("./realstir/routes/admin");
const userdata = require("./realstir/routes/user");
const additionalfurnishing = require("./realstir/routes/additionalfurnishing");
const overlooking = require("./realstir/routes/overlooking");
const additionalrooms = require("./realstir/routes/additionalrooms");
const amenities = require("./realstir/routes/amenities");
const propertytype = require("./realstir/routes/propertytype");
const properties = require("./realstir/routes/properties");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json( { limit: '50MB' }));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());
app.get("/admin_pictures/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "reactapp/uploads/admin_pictures/"+req.params.filename));
});

//admin
app.use("/",user)
app.use("/user",userdata)
app.use("/additional_furnishing",additionalfurnishing)
app.use("/overlooking",overlooking)
app.use("/additional_rooms",additionalrooms)
app.use("/amenities",amenities)
app.use("/propertytype",propertytype)
app.use("/properties",properties)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});