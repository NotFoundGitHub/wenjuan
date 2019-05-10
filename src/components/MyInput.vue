<template>
  <div>
    <FormItem label="Input">
      <i-input v-model="value1" placeholder="Enter something..."></i-input>
    </FormItem>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  //   model: {
  // prop: "value1"
  // event: "input1"
  //   },
  props: {
    name: {
      type: String,
      default: "Tim"
    },
    value: {
      type: String
    },
    mychange: {
      type: Function
    }
  },
  computed: {
    value1: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("input", value);
        // this.$emit("mychange", value);
      }
    }
  },

  methods: {}
};
</script>
<style lang="less" scoped>
</style>
