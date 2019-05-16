<template>
  <div class="myForm">
    <Form>
      <FormItem v-for="(item,index) in list" :key="`${_uid}_${index}`" :required="item.required">
        <span class="title">
          <span v-if="item.required" style="color:red;font-size:20px;margin-right:4px;">*</span>
          {{+item.questIndex+1+'.'+item.title}}
        </span>
        <component v-model="item.value" :is="item.type" :type="item.kind?item.kind:null">
          <template v-if="item.children">
            <component
              v-for="(child,i) in item.children.list"
              :key="`${_uid}_${index}_${i}`"
              :is="item.children.type"
              :label="child.label?child.label:null"
              :value="child.value?child.value:null"
              class="item"
            >{{child.title}}</component>
          </template>
        </component>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="submit">提交</Button>
        <Button @click="reset" type="warning" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
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
  filters: {},
  methods: {
    submit() {
      for (const i in this.list) {
        const item = this.list[i];
        if (item.required && !item.value.toString().length) {
          this.$Message.error(`请输入第${+i + 1}问的值`);
          return;
        }
        let { questIndex, _id, value } = item;
        this.valueList[i] = { questIndex, _id, value };
      }
      console.log("submit", this.valueList);
      if (this.$route.name == "surveyPage") {
        this.$emit("submit", this.valueList);
      }
    },
    reset() {
      this.list.forEach(
        (item, index) => (item.value = this.oriList[index].value)
      );
    }
  },
  mounted() {
    this.oriList = clonedeep(this.list);
  }
};
</script>
<style lang="less" scoped>
.myForm {
  .title {
    font-size: 15px;
    font-weight: 600;
    display: flex;
    text-align: left;
    margin: 10px 2px;
  }
  .item {
    font-size: 16px;
    margin: 0 10px;
    // display: flex;
  }
}
</style>
