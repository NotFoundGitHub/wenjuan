<template>
  <div class="mySurvey">
    <div class="box">
      <!-- card组件 -->
      <survey-card
        class="item"
        v-for="(item,index) in surveyList"
        :key="item._id"
        :title="item.title"
        :isPub="item.isPublished"
        :id="item._id"
        :endAt="item.endTime | toLocalTime"
        :createAt="item.createAt | toLocalTime"
        :index="index"
        @changePubStatus="handleUpdatePub"
        @updateSur="handleUpdate"
        @delSur="handleDel"
        @toQuests="handleDetail"
      ></survey-card>
      <!-- 删除提醒弹框 -->
      <Modal v-model="isDel" @on-ok="sureDel" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除提醒</span>
        </p>
        <div style="text-align:center;color:#de2a18;">
          <h3>您确定要删除么</h3>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import SurveyCard from "@/components/card/SurveyCard";
import Api from "@/api/index";
import moment from "moment";

export default {
  name: "mySurvey",
  components: {
    SurveyCard
  },
  props: {},
  data() {
    return {
      surveyList: [],
      isDel: false,
      delItem: {
        _id: "",
        index: -1
      }
    };
  },
  watch: {},
  computed: {},
  filters: {
    toLocalTime(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  },
  methods: {
    handleUpdatePub(data) {
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
    },
    handleUpdate(_id) {
      this.$router.push({ name: "updateSurvey", query: { _id } });
    },
    sureDel() {
      Api.delSurvey({ _id: this.delItem._id })
        .then(res => {
          if (res.status == 1) {
            this.$Message.success(res.msg);
            this.surveyList = this.surveyList.filter((item, i) => {
              return i !== this.delItem.index;
            });
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          this.$Message.error("请求错误或网络错误");
        });

      this.isDel = false;
    },
    handleDel(data) {
      this.delItem = data;
      this.isDel = true;
    },
    handleDetail(data) {
      this.$router.push({ name: "addQuest", query: { _id: data._id } });
    }
  },
  created() {},
  mounted() {
    Api.getSurvey()
      .then(res => {
        if (res.status == 1) {
          this.$Message.success(res.msg);
          this.surveyList = res.data;
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
      position: relative;
    }
  }
}
</style>