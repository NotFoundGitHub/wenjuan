<template>
  <Form :label-width="80">
    <FormItem v-for="(item,index) in list" :label="item.label" :key="`${_uid}_${index}`">
      <component v-model="item.value" :is="item.type" :type="item.kind">
        <template v-if="item.children">
          <component
            v-for="(child,i) in item.children.list"
            :key="`${_uid}_${index}_${i}`"
            :is="item.children.type"
            :label="child.label"
            :value="child.value"
          >{{child.title}}</component>
        </template>
      </component>
    </FormItem>

    <FormItem>
      <Button type="primary" @click="up">Submit</Button>
      <Button @click="reset" type="warning" style="margin-left: 8px">Cancel</Button>
    </FormItem>
  </Form>
</template>
<script>
import clonedeep from "clonedeep";
export default {
  data() {
    return {
      valueList: [],
      oriList: []
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    up() {
      this.list.map((item, i) => {
        // console.log(item.value);
        this.valueList[i] = item.value;
      });
      console.log(this.valueList);
      window.localStorage.setItem("value", JSON.stringify(this.valueList));
    },
    reset() {
      console.log(this.list);
      console.log("this.oriList", this.oriList);
      this.list.forEach(
        (item, index) => (item.value = this.oriList[index].value)
      );
    }
  },
  mounted() {
    this.oriList = clonedeep(this.list);
    let value = window.localStorage.getItem("value");
    console.log("mounted", value);
    //   console.log(value)
    if (value) {
      this.valueList = JSON.parse(value);
      this.list.forEach((item, index) => {
        item.value = this.valueList[index];
      });
      console.log("getItem", this.list);
    }
  }
};
</script>
