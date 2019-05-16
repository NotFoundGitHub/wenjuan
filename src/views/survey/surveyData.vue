<template>
  <div class="surveyData">
    <div class="item" v-for="(item,index) in rowList">
      <Card :bordered="false">
        <div slot="title">
          <div class="header">
            <span class="title">{{+index+1+'. '+item.quest}}</span>
            <span class="info">(共有{{item.persons}}个人参与了问卷)</span>
          </div>
        </div>

        <div class="helpInfo" v-if="item.row.rows.length===0">暂无数据</div>
        <div class="chart" v-else>
          <ve-pie v-if="item.showType=='pie'" :data="item.row"></ve-pie>
          <ve-bar v-else :data="item.row"></ve-bar>

          <div class="change">
            <Button type="primary" @click="changeBar(index)">切换条形图</Button>
            <Button type="primary" @click="changePie(index)">切换饼图</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import VeBar from "v-charts/lib/bar.common";
import VePie from "v-charts/lib/pie.common";
import Api from "@/api/index";
import util from "./util";

export default {
  name: "surveyData",
  components: {
    VeBar,
    VePie
  },
  props: {},
  data() {
    return {
      showType: "bar",
      rowList: "",
      chartSettings: {
        // metrics: ["访问用户", "下单用户"],
        // dimension: ["日期"]
      },
      chartData: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    changeBar(i) {
      this.rowList[i].showType = "bar";
    },
    changePie(i) {
      this.rowList[i].showType = "pie";
    }
  },
  created() {},
  mounted() {
    let survey = this.$route.query._id;
    Api.getHandleArr({ survey })
      .then(res => {
        if (res.status == 1) {
          this.$Message.success(res.msg);
          let { questList, answerList } = res.list;
          let rowList = util.initCharts(questList, answerList);
          this.rowList = rowList;
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
.surveyData {
  .item {
    background: #fff;
    margin-bottom: 10px;
    border: 1px solid #e1e1e1;
    .header {
      margin-bottom: 10px;
      padding: 10px;
      position: relative;
      .title {
        position: absolute;
        left: 0;
      }
      .info {
        position: absolute;
        right: 0;
        color: #ed4014;
      }
    }
    .chart {
      max-width: 600px;
      margin: 0 auto;
    }
  }
}
</style>