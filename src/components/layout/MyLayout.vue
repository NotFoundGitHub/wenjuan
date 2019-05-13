<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <Icon type="ios-chatbubbles"/>校园问卷
          </div>
          <div class="layout-nav">
            <slot name="head_nav"></slot>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px' }">
        <Breadcrumb :style="{margin: '20px 0','display':'flex','font-size':'16px'}">
          <BreadcrumbItem
            v-for="(item,index) in $route.matched"
            :key="item.name+index"
          >{{item.meta.title}}</BreadcrumbItem>
        </Breadcrumb>
        <slot name="card_box"></slot>
      </Content>
    </Layout>
  </div>
</template>
<script>
import Api from "@/api/index";
import { mapState, mapMutations } from "vuex";

export default {
  name: "myLayout",
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
  // .ivu-card.ivu-card-bordered {
  //   min-width: 800px;
  //   max-width: 980px;
  //   margin: 0 auto;
  // }
  .ivu-layout-content {
    min-height: calc(100vh - 66px);
  }
}
</style>