<template>
  <div class="quests">
    <my-layout>
      <div slot="head_nav"></div>
      <div slot="card_box">
        <Card :style="{'margin': '0 auto'}">
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

export default {
  name: "home",
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
  computed: {},
  methods: {},
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
  }
}
</style>