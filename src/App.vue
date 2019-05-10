<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <h1>content:</h1>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  h1 {
    color: #42b983;
  }
  hr {
    height: 0px;
    margin-bottom: 20px;
  }
}
</style>
