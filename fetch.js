import fs from "fs";
import fetch from "node-fetch";

const USERNAME = "avechuu";
const API_KEY = "YOUR_LASTFM_API_KEY";

const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

async function run() {
  const response = await fetch(url);
  const data = await response.json();

  const track = data.recenttracks.track[0];

  const output = {
    name: track.name,
    artist: track.artist["#text"],
    image: track.image[2]["#text"],
    nowPlaying: track["@attr"]?.nowplaying === "true",
    timestamp: track.date?.uts || null
  };

  fs.writeFileSync("latest.json", JSON.stringify(output, null, 2));
}

run();
