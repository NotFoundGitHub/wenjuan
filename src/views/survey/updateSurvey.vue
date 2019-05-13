<template>
  <div class="updateSur_box">
    <div class="box">
      <Form :model="form" :label-width="80">
        <FormItem label="问卷标题:">
          <Input v-model="form.title" placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="截止时间:">
          <DatePicker type="date" placeholder="Select date" v-model="form.date"></DatePicker>
        </FormItem>

        <FormItem label="是否发布:">
          <i-switch v-model="form.isPublished" size="large">
            <span slot="open">发布</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleUpdate">更新</Button>
          <Button style="margin-left: 8px" @click="handleCancle">取消更新</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index";
import moment from "moment";
export default {
  name: "updateSurvey",
  components: {},
  props: {},
  data() {
    return {
      form: {
        title: "",
        isPublished: false
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleUpdate() {
      let doc = {
        endTime: moment(this.form.date).valueOf(),
        title: this.form.title,
        isPublished: this.form.isPublished
      };
      let _id = this.$route.query._id;
      Api.updateSurvey({
        _id,
        doc
      })
        .then(res => {
          if (res.status == 1) {
            this.$Message.success(res.msg);
            this.$router.push({ name: "mySurvey" });
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          this.$Message.error("请求错误或网络错误");
        });
    },
    handleCancle() {
      this.$router.push({ name: "mySurvey" });
    }
  },
  created() {},
  mounted() {
    let _id = this.$route.query._id;

    Api.getSurvey({ _id })
      .then(res => {
        if (res.status == 1) {
          this.$Message.success(res.msg);
          this.form = res.data;
          this.form.date = new Date(this.form.endTime);
        } else {
          this.$Message.error(res.msg);
        }
      })
      .catch(err => {
        this.$Message.error("请求错误或网络错误");
      });
  }
};
</script>
<style lang="less" scoped>
@add_input_height: 30px;
.updateSur_box {
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
  }
}
</style>