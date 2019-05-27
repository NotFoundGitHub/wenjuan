<template>
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
      <Card :style="{'min-width': '800px','margin': '0 auto'}">
        <div style="min-height: 400px;">
          <router-view></router-view>
        </div>
      </Card>
    </div>
  </my-layout>
</template>
<script>
import Api from "@/api/index";
import MyLayout from "@/components/layout/MyLayout";

import { mapState, mapMutations } from "vuex";

export default {
  name: "survey",
  data() {
    return {};
  },
  components: {
    MyLayout
  },
  computed: {
    ...mapState(["username", "nickname"])
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    // 退出登录
    logout() {
      this.$router.push({ name: "login" });
      window.localStorage.removeItem("username");
      this.SET_USER("");
    }
  },
  mounted() {
    let user = window.localStorage.getItem("username");
    if (user) {
      this.SET_USER(user);
    } else {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style lang="less" scoped>
</style>