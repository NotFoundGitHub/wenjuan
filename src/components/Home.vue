<template>
  <div class="container">
    <my-layout>
      <div slot="head_nav">
        <MenuItem name="1" :to="{name:'mySurvey'}">
          <Icon type="ios-keypad"></Icon>我的问卷
        </MenuItem>
        <MenuItem name="2" :to="{name:'addSurvey'}">
          <Icon type="ios-navigate"></Icon>增加问卷
        </MenuItem>
        <Dropdown>
          <a href="javascript:void(0)" style="color:#fff;">
            {{nickname}}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>{{username}}</DropdownItem>
            <DropdownItem @click.native="logout">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div slot="card_box">
        <Card :style="{'min-width': '800px','max-width': '980px','margin': '0 auto'}">
          <div style="min-height: 400px;">
            <!-- <my-form :list="formList2"></my-form> -->
            <!-- <router-view></router-view> -->
          </div>
        </Card>
      </div>
    </my-layout>
  </div>
</template>
<script>
// import MyForm from "./MyForm";

import Api from "@/api/index";
import MyLayout from "@/components/layout/MyLayout";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    MyForm,
    MyLayout
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
      ],
      formList2: [
        {
          title: "爱好",
          type: "CheckboxGroup",
          required: true,
          kind: "",
          value: [],
          children: {
            type: "checkbox",
            list: [
              { title: "node", label: "node" },
              { title: "java", label: "java" },
              { title: "产品", label: "PM" },
              { title: "web", label: "web" }
            ]
          },
          questIndex: 0
        },
        {
          title: "吃了么",
          type: "radio-group",
          required: false,
          kind: "",
          value: "",
          children: {
            type: "radio",
            list: [
              { title: "吃了", label: "yes" },
              { title: "还没呢", label: "no" }
            ]
          },
          questIndex: 1
        },
        {
          title: "喜欢什么口味",
          type: "i-select",
          required: true,
          kind: "",
          value: "",
          children: {
            type: "i-option",
            list: [
              { title: "辣的", label: "", value: "1" },
              { title: "不辣的", label: "", value: "2" },
              { title: "酸的", label: "", value: "3" }
            ]
          },
          questIndex: 2
        },
        {
          title: "反馈意见",
          type: "i-input",
          required: true,
          kind: "textarea",
          value: "",
          children: { type: "", list: [] },
          questIndex: 3
        },
        {
          title: "你喜欢什么花",
          type: "i-input",
          required: true,
          value: "",
          children: { type: "", list: [] },
          questIndex: 4
        },
        {
          title: "输入题目",
          type: "Rate",
          required: true,
          kind: "",
          value: 0,
          questIndex: 5,
          children: { type: "", list: [] }
        }
      ]
    };
  },
  computed: {
    ...mapState(["username", "nickname"])
  },

  methods: {
    updateName(val) {
      this.name = val;
    },
    changeInfo(val) {
      this.likeArr = val;
      console.log(val);
    },
    logout() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  // width: 380px;
  // margin: auto;
  // padding: 10px;
  // border: 1px solid salmon;
}
</style>

