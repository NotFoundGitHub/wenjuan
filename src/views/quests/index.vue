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
        <div
          class="step_box"
          :style="{'margin': '20px auto','min-width': '800px','max-width': '980px'}"
        >
          <Button type="primary" @click="handlePre" :disabled="current===0">上一步</Button>
          <Steps :current="current" class="step">
            <Step title="编辑"></Step>
            <Step title="预览"></Step>
            <Step title="发布"></Step>
          </Steps>

          <Button type="primary" @click="handleNext" :disabled="current===2">下一步</Button>
        </div>
        <Card
          :style="{'min-width': '800px','max-width': '980px','margin': '0 auto','background': current===0?'#e8eaec':'#fff'}"
        >
          <div style="min-height: 400px;">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
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
    return {
      // spinShow: true
      // current: 0
    };
  },
  watch: {},
  computed: {
    ...mapState(["username", "nickname"]),
    current: {
      get() {
        return this.$route.meta.index;
      },
      set(value) {
        return value;
      }
    }
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    // 退出登录
    logout() {
      this.$router.push({ name: "login" });
      window.localStorage.removeItem("username");
      this.SET_USERNAME("");
    },
    handlePre() {
      let pre = this.$route.meta.pre;

      if (this.current == 0) {
        this.current = 0;
      } else {
        this.current -= 1;
        if (pre) {
          this.$router.push({
            name: pre,
            query: { _id: this.$route.query._id }
          });
        }
      }
    },
    handleNext() {
      let next = this.$route.meta.next;
      if (this.current == 2) {
        this.current = 2;
      } else {
        if (next) {
          this.$router.push({
            name: next,
            query: { _id: this.$route.query._id }
          });
        }

        this.current += 1;
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.quests {
  .step_box {
    background: #fff;
    display: flex;
    padding: 20px;
    margin-bottom: 30px;
    .step {
      // padding: 15px;
      // background: #fff;
    }
  }
}
</style>