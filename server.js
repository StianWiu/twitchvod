console.clear();
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 4443;

const fs = require('fs');

// Allow anyone to send request
var cors = require('cors')
app.use(cors())

// Database

const { Database } = require('simpl.db');
const config = {
  autoSave: true,
  tabSize: 2,
}
const db = new Database(config);

// Downloading dependencies
const twitch = require("twitch-m3u8");
var m3u8ToMp4 = require("m3u8-to-mp4");


// Receive data from client
app.post('/api/download/vod', async function (req, res) {
  const id = req.body.id;
  // If id is not a number, return error
  if (isNaN(id)) {
    res.send({
      error: "Invalid id"
    });
    return;
  }
  res.status(200).send("request received");
  twitch.getVod(id).then(async function (data) {
    db.set("videos." + id, { finished: false })
    let url = data[0].url;
    var converter = new m3u8ToMp4();
    await converter
      .setInputFile(url)
      .setOutputFile(`./downloads/${id}.mp4`)
      .start();
    // Get current time
    console.log(`${id}.mp4 finished downloading at ${new Date()}`);
    db.set("videos." + id, { finished: true })
    // Write down date finished in number form
    let date = new Date();
    // Make date milliseconds
    let dateMilliseconds = date.getTime();
    // Write date to database
    db.set("videos." + id + ".date", dateMilliseconds)
  }).catch(function (err) {
    console.log(err);
  });
});

app.post('/api/progress', async function (req, res) {
  const id = req.body.id;
  let progress = db.get("videos." + id + ".finished");
  if (progress !== undefined) {
    res.status(200).send(`${progress}`);
  } else {
    res.status(404).send("Could not find file");
  }
});

app.post('/api/download/file', async function (req, res) {
  const id = req.body.id;

  // Check if file exists, if it exists send it.
  let file = fs.existsSync(`./downloads/${id}.mp4`);
  if (file) {
    res.status(200).download(`./downloads/${id}.mp4`);
  }
});

// Start server
app.listen(port, function () {
  console.log(`Server listening on port ${port} | ${new Date()}`);

  // Check if any downloaded files are older than 24 hours if so delete them and remove them from data base
  setInterval(async function () {
    let files = db.get("videos");
    for (let file in files) {
      let date = files[file].date;
      if (date === undefined) {
        return;
      }
      let dateMilliseconds = date;
      let now = new Date();
      let nowMilliseconds = now.getTime();
      let difference = nowMilliseconds - dateMilliseconds;
      console.log(difference)
      if (difference > 21600000) {
        console.log(`Deleted file ${file} at ${new Date()}`);
        fs.unlinkSync(`./downloads/${file}.mp4`);
        db.delete("videos." + file);
      }
    }
  }
    , 1000 * 60 * 60 * 6);
});