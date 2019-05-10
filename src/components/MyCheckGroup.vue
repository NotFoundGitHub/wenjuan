<template>
  <div>
    {{value1}}
    <FormItem label="Checkbox">
      <CheckboxGroup v-model="value1">
        <Checkbox label="Eat"></Checkbox>
        <Checkbox label="Sleep"></Checkbox>
        <Checkbox label="Run"></Checkbox>
        <Checkbox label="Movie"></Checkbox>
      </CheckboxGroup>
    </FormItem>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // value1: []
    };
  },
  props: {
    value: {
      type: String
    },
    changeCheck: {
      type: Function
    }
  },
  computed: {
    value1: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        console.log("set", this.value1);
        this.$emit("changeCheck", this.value1);
        // this.$emit("mychange", value);
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
