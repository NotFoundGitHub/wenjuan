<template>
  <div class="quests">
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
            <router-view></router-view>
          </div>
        </Card>
      </div>
    </my-layout>
  </div>
</template>

<script>
import Api from "@/api/index";
import MyLayout from "@/components/layout/MyLayout";
import { mapState, mapMutations } from "vuex";

export default {
  name: "quests",
  components: {
    MyLayout
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState(["username", "nickname"])
  },
  methods: {
    // 退出登录
    logout() {
      this.$router.push({ name: "login" });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.quests {
}
</style>