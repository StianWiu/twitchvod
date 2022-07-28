<template>
  <div v-if="downloading !== true" class="page">
    <h2>Enter twitch vod URL or ID here</h2>
    <input type="text" v-model="url" />
    <button v-if="this.url !== ''" @click="getVod">Get Vod</button>
  </div>
  <div v-else-if="this.finished == true" class="page">
    <h2>Vod finished downloading</h2>
    <button @click="this.download">Download</button>
    <h3>If download didn't automatically start press this sucker.</h3>
  </div>
  <div v-else class="page">
    <h2>Downloading Vod {{ this.vodId }}</h2>
    <div class="car">
      {{ this.loader1 }}
      <br />
      {{ this.loader2 }}
      <br />
      {{ this.loader3 }}
      <br />
      {{ this.loader4 }}
      <br />
    </div>
    <h3>Depending on the length of the VOD this can take a few minutes.</h3>
    <h3>
      Also please do not close the window as then you will have to restart
      (╯°□°）╯︵ ┻━┻
    </h3>
  </div>
  <div class="socials">
    You can find ways to contact me on my website.
    <a style="color: #42b983" href="https://stianwiu.me">https://stianwiu.me</a>
    <br />
    <br />
    And thanks for using my free service. Hope you find it useful.
    <br />
    <br />
    Consider donating if you like it.
    <a style="color: #42b983" href="https://ko-fi.com/stianwiu"
      >https://ko-fi.com/stianwiu</a
    >
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "App",
  data() {
    return {
      url: "",
      downloading: false,
      finished: false,
      vodId: "",
      loader1: "",
      loader2: "",
      loader3: "",
      loader4: "",
      loaderVersion: 0,
    };
  },
  methods: {
    async getVod() {
      this.downloading = true;
      // Keep only numbers from string
      this.vodId = this.url.match(/[0-9]+/g).join("");
      await axios
        .post("https://vod.astraea.dev/api/download/vod", {
          id: this.vodId,
        })
        .then(async () => {
          this.downloading = true;
          while (this.finished == false) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await axios
              .post("https://vod.astraea.dev/api/progress", {
                id: this.vodId,
              })
              .then((response) => {
                console.log(response);

                if (this.loaderVersion == 0) {
                  this.loader1 = "ㅤㅤㅤㅤ______";
                  this.loader2 = "ㅤㅤㅤ/|_||_\\`.__";
                  this.loader3 = "ㅤㅤ(ㅤㅤ_ㅤㅤ_ㅤ_\\";
                  this.loader4 = "ㅤㅤ=`-(_)--(_)-'";
                  this.loaderVersion++;
                } else if (this.loaderVersion == 1) {
                  this.loader1 = "ㅤㅤㅤㅤㅤㅤ______";
                  this.loader2 = "ㅤㅤㅤㅤㅤ/|_||_\\`.__";
                  this.loader3 = "ㅤㅤㅤㅤ(ㅤㅤ_ㅤㅤ_ㅤ_\\";
                  this.loader4 = "ㅤㅤㅤㅤ=`-(_)--(_)-'";
                  this.loaderVersion++;
                } else if (this.loaderVersion == 2) {
                  this.loader1 = "ㅤㅤㅤㅤㅤㅤㅤㅤ______";
                  this.loader2 = "ㅤㅤㅤㅤㅤㅤㅤ/|_||_\\`.__";
                  this.loader3 = "ㅤㅤㅤㅤㅤㅤ(ㅤㅤ_ㅤㅤ_ㅤ_\\";
                  this.loader4 = "ㅤㅤㅤㅤㅤㅤ=`-(_)--(_)-'";
                  this.loaderVersion++;
                } else if (this.loaderVersion == 3) {
                  this.loader1 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ______";
                  this.loader2 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤ/|_||_\\`.__";
                  this.loader3 = "ㅤㅤㅤㅤㅤㅤㅤㅤ(ㅤㅤ_ㅤㅤ_ㅤ_\\";
                  this.loader4 = "ㅤㅤㅤㅤㅤㅤㅤㅤ=`-(_)--(_)-'";
                  this.loaderVersion++;
                } else if (this.loaderVersion == 4) {
                  this.loader1 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ______";
                  this.loader2 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ/|_||_\\`.__";
                  this.loader3 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ(ㅤㅤ_ㅤㅤ_ㅤ_\\";
                  this.loader4 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ=`-(_)--(_)-'";
                  this.loaderVersion++;
                } else if (this.loaderVersion == 5) {
                  this.loader1 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ______";
                  this.loader2 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ/|_||_\\`.__";
                  this.loader3 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ(ㅤㅤ_ㅤㅤ_ㅤ_\\";
                  this.loader4 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ=`-(_)--(_)-'";
                  this.loaderVersion++;
                } else if (this.loaderVersion == 6) {
                  this.loader1 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ______";
                  this.loader2 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ/|_||_\\`.__";
                  this.loader3 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ(ㅤㅤ_ㅤㅤ_ㅤ_\\";
                  this.loader4 = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ=`-(_)--(_)-'";
                  this.loaderVersion = 0;
                }

                if (response.data == true) {
                  this.finished = true;
                  this.download();
                }
              });
          }
        });
    },
    async download() {
      // Download file from API
      axios({
        url: "https://vod.astraea.dev/api/download/file",
        method: "POST",
        data: {
          id: this.vodId,
        },
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fURL = document.createElement("a");

        fURL.href = fileURL;
        fURL.setAttribute("download", `${this.vodId} - vod.astraea.dev.mp4`);
        document.body.appendChild(fURL);

        fURL.click();
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap");

* {
  font-family: "Source Code Pro", monospace;
  color: #e4f5ef;
  text-align: center;
}

html {
  background-color: #304457;
}

input {
  background-color: #1d2935;
  border: none;
  border-radius: 5px;
  color: #42b983;
  font-size: 1.5rem;
  text-align: center;
  padding: 0.5rem;
}

button {
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  color: #1d2935;
  font-size: 1.5rem;
  text-align: center;
  padding: 0.5rem;

  transition: 0.2s;

  margin-top: 20px;
}

button:hover {
  color: #e4f5ef;
  cursor: pointer;
  transform: scale(1.1);
}

.page {
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
}

.car {
  text-align: initial;
}

.socials {
  margin-top: 100px;
}
</style>
