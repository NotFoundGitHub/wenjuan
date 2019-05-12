<template>
  <div>
    <div class="hello">首页</div>
    <button @click="add">add</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      // msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    // ...mapState(["msg"])
  },
  methods: {
    add() {
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
