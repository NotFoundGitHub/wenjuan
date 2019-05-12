<template>
  <div class="survey_box">
    <div class="box">
      <div class="title">
        <span class="label">输入问卷名称:</span>
        <Input v-model="title" placeholder="输入名称" clearable class="input_name"></Input>
      </div>
      <div class="switch">
        <span>是否立即发布:</span>
        <i-switch v-model="isPublished"></i-switch>
      </div>
      <Button type="primary" shape="circle" long class="btn" @click="handleAdd">
        <Icon type="md-add-circle"/>创建
      </Button>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index";
export default {
  name: "addSurvey",
  components: {},
  props: {},
  data() {
    return {
      title: "",
      isPublished: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleAdd() {
      let { title, isPublished } = this;
      if (title) {
        Api.addSurvey({ title, isPublished })
          .then(res => {
            if (res.status == 1) {
              this.$Message.success(res.msg);
              this.$router.push({ name: "mySurvey" });
            } else {
              this.$Message.error(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
            this.$Message.error("请求错误或网络错误");
          });
      } else {
        this.$Message.error("请输入完整信息");
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
@add_input_height: 30px;
.survey_box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    margin: 20px 0;
    padding: 40px;
    width: 80%;
    max-width: 640px;
    .title {
      display: flex;
      .label {
        width: 130px;
        height: @add_input_height;
        line-height: @add_input_height;
        font-size: @add_input_height*0.5;
        margin-right: 20px;
      }
      .input_name {
        width: 100%;
      }
    }
    .switch {
      display: flex;
      margin-top: 30px;
      span {
        margin-right: 25px;
      }
    }
    .btn {
      margin-top: 40px;
    }
  }
}
</style>