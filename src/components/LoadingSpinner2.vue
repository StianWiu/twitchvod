<template>
  <span class="loader"></span>
</template>

<script>
export default {
  name: "LoadingSpinner2",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
  border: 2px solid #e4f5ef;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}
.loader::after,
.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 2px solid #42b983;
  width: 38px;
  height: 38px;
  animation: rotationBack 1.5s linear infinite;
  transform-origin: center center;
}
.loader::before {
  width: 28px;
  height: 28px;
  border-color: #e4f5ef;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
