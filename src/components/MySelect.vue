<template>
  <div>
    <FormItem label="Select">
      <Select v-model="value2">
        <Option value="beijing">beijing</Option>
        <Option value="shanghai">shanghai</Option>
        <Option value="shenzhen">shenzhen</Option>
      </Select>
    </FormItem>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: String
    }
  },
  computed: {
    value2: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("input", value);
        // this.$emit("mychange", value);
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
