<template>
  <div class="container">
    <my-form :list="formList"></my-form>
  </div>
</template>
<script>
import MyInput from "./MyInput";
import MySelect from "./MySelect";
import MyCheckGroup from "./MyCheckGroup";
import MyForm from "./MyForm";

export default {
  components: {
    MyInput,
    MySelect,
    MyCheckGroup,
    MyForm
  },
  data() {
    return {
      formList: [
        {
          name: "name",
          type: "i-input",
          label: "姓名",
          value: ""
        },
        {
          name: "sex",
          type: "radio-group",
          label: "性别",
          value: 1,
          children: {
            type: "radio",
            list: [{ label: 1, title: "男" }, { label: 2, title: "女" }]
          }
        },
        {
          name: "hobby",
          type: "CheckboxGroup",
          label: "爱好",
          value: [],
          children: {
            type: "checkbox",
            list: [
              { label: 1, title: "node" },
              { label: 2, title: "python" },
              { label: 3, title: "Java" },
              { label: 4, title: "PHP" },
              { label: 5, title: "C#" }
            ]
          }
        },
        {
          name: "city",
          type: "i-select",
          label: "城市",
          value: "",
          children: {
            type: "i-option",
            list: [
              { value: "shanxi", title: "陕西" },
              { value: "beijing", title: "北京" },
              { value: "shanghai", title: "上海" },
              { value: "nanjing", title: "南京" }
            ]
          }
        },
        {
          name: "idea",
          type: "i-input",
          kind: "textarea",
          value: "",
          label: "意见"
        }
      ]
    };
  },
  methods: {
    updateName(val) {
      this.name = val;
    },
    changeInfo(val) {
      this.likeArr = val;
      console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 380px;
  margin: auto;
  padding: 10px;
  border: 1px solid salmon;
}
</style>

