<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <Icon type="ios-chatbubbles"/>校园问卷
          </div>
          <div class="layout-nav">
            <MenuItem name="1" :to="{name:'mySurvey'}">
              <Icon type="ios-keypad"></Icon>我的问卷
            </MenuItem>
            <MenuItem name="2" :to="{name:'addSurvey'}">
              <Icon type="ios-navigate"></Icon>增加问卷
            </MenuItem>
            <!-- <MenuItem name="3" :to="{name:'updateSurvey'}">
              <Icon type="ios-analytics"></Icon>发布问卷
            </MenuItem>-->
            <!-- <MenuItem name="4">
              <Icon type="md-person"></Icon>
              {{nickname}}
            </MenuItem>-->
            <Dropdown>
              <a href="javascript:void(0)" style="color:#fff;">
                <!-- 下拉菜单 -->
                {{nickname}}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>{{username}}</DropdownItem>
                <DropdownItem @click.native="logout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0','display':'flex'}">
          <BreadcrumbItem>问卷</BreadcrumbItem>
          <BreadcrumbItem>{{itemTitle}}</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: 400px;">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
import Api from "@/api/index";
import { mapState, mapMutations } from "vuex";

export default {
  name: "survey",
  data() {
    return {};
  },
  computed: {
    ...mapState(["username", "nickname"]),
    itemTitle() {
      return this.$route.meta.title;
    }
  },
  methods: {
    // 退出登录
    logout() {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  .layout-logo {
    height: 30px;
    color: #41da94;
    font-size: 22px;

    float: left;
    position: relative;
  }
  .layout-nav {
    width: 550px;
    margin: 0 auto;
    margin-right: 5px;
  }

  .ivu-layout-content {
    min-height: calc(100vh - 66px);
  }
}
</style>