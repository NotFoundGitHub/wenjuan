<template>
  <div class="questDeatil">
    <h4>题目详情</h4>
    <my-form :list="questList"></my-form>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import Api from "@/api/index";
import MyForm from "@/components/render/MyForm";

export default {
  name: "questDeatil",
  components: {
    MyForm
  },
  props: {},
  data() {
    return {
      spinShow: true,
      questList: []
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    let survey = this.$route.query._id;
    Api.getQuest({ survey })
      .then(res => {
        if (res.status == 1) {
          this.$Message.success(res.msg);
          console.log("req quest", res.data);
          this.questList = res.data;
          this.spinShow = false;
        } else {
          this.$Message.error(res.msg);
          this.spinShow = false;
        }
      })
      .catch(err => {
        this.$Message.error("请求错误或网络错误");
        this.spinShow = false;
      });
  }
};
</script>
<style lang="less" scoped>
.questDeatil {
}
</style>