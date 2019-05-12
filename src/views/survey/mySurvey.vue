<template>
  <div class="mySurvey">
    <div class="box">
      <survey-card
        class="item"
        v-for="(item,index) in surveyList"
        :key="'sur'+index"
        :title="item.title"
        :isPub="item.isPublished"
        :id="item._id"
        :endAt="item.endTime | toLocalTime"
        :createAt="item.createAt | toLocalTime"
        @changePubStatus="handleUpdatePub"
      ></survey-card>


    </div>
  </div>
</template>

<script>
import SurveyCard from "@/components/card/SurveyCard";
import Api from "@/api/index";
import moment from "moment";

export default {
  name: "addSurvey",
  components: {
    SurveyCard
  },
  props: {},
  data() {
    return {

      surveyList: []
    };
  },
  watch: {},
  computed: {

  },
  filters: {
    toLocalTime(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  },
  methods: {

    handleUpdatePub(data) {
      console.log("my-data:", data);
      Api.updateSurvey({
        _id: data._id,
        doc: { isPublished: data.isPublished }
      })
        .then(res => {
          if (res.status == 1) {
            this.$Message.success(res.msg);
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          this.$Message.error("请求错误或网络错误");
        });
    }
  },
  created() {},
  mounted() {
    Api.getSurvey()
      .then(res => {
        if (res.status == 1) {
          this.$Message.success(res.msg);
          this.surveyList = res.data;
          console.log("surveyList:", res.data);
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
.mySurvey {
  display: flex;
  justify-content: center;
  .box {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin: 15px;
    }
  }
}
</style>