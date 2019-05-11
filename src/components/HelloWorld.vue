<template>
  <div>
    <div class="hello">{{msg}}</div>
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
    msg() {
      let state = this.$store.state;
      console.log(state);
      return this.$store.state.num;
    }
    // ...mapState(["msg"])
  },
  methods: {
    add() {
      this.$store.commit("SET_NUM");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
