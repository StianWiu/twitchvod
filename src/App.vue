<template>
  <div v-if="downloading !== true" class="page">
    <h2>Enter twitch vod URL or ID here</h2>
    <input type="text" v-model="url" />
    <button v-if="this.url && this.show !== ''" @click="getVod">Get Vod</button>
  </div>
  <div v-else-if="this.finished == true" class="page">
    <h2>Please wait while VOD is downloaded from the server.</h2>
    <LoadingSpinner2 />
    <br />
    <div v-if="this.downloadButton == true">
      <h3>
        Download is taking a while, if download doesn't start press this button.
      </h3>
      <button @click="this.download">Download</button>
    </div>
  </div>
  <div v-else class="page">
    <h2>Please wait while we download the vod to the server</h2>
    <h2>Vod ID: {{ this.vodId }}</h2>
    <LoadingSpinner></LoadingSpinner>
  </div>
</template>

<script>
import LoadingSpinner from "./components/LoadingSpinner.vue";
import LoadingSpinner2 from "./components/LoadingSpinner2.vue";
const axios = require("axios");
export default {
  name: "App",
  data() {
    return {
      url: "",
      downloading: false,
      finished: false,
      vodId: "",
      show: "1",
    };
  },
  methods: {
    async getVod() {
      this.show = "";
      // Keep only numbers from string
      this.vodId = this.url.match(/[0-9]+/g).join("");
      await axios
        .post("https://vod.astraea.dev/api/download/vod", {
          id: this.vodId,
        })
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          axios
            .post("https://vod.astraea.dev/api/progress", {
              id: this.vodId,
            })
            .then(() => {
              this.downloading = true;
            })
            .catch(() => {
              // Create popup
              alert("Could not find VOD");
            });
          while (this.finished == false) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await axios
              .post("https://vod.astraea.dev/api/progress", {
                id: this.vodId,
              })
              .then((response) => {
                console.log(response);
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

        this.url = "";
        this.downloading = false;
        this.finished = false;
        this.vodId = "";
        this.show = "1";
      });
      // Wait for 2 minutes
      await new Promise((resolve) => setTimeout(resolve, 120000));
      this.downloadButton = true;
    },
  },
  components: { LoadingSpinner, LoadingSpinner2 },
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

.socials {
  margin-top: 100px;
}
</style>
