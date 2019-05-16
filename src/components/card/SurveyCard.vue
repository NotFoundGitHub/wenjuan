<template>
  <div>
    <div class="card">
      <!-- de2a18 7a7374 7e1671 -->
      <span class="badge" @click="handleDel">x</span>
      <div class="up" :style="{'background': pub?'#40a070':'#7a7374'}" @click="handleJump">
        <div class="header">
          <div class="createAt">{{createAt}}</div>
          <span class="pubState">截止：{{endAt}}</span>
          <span class="del"></span>
        </div>
        <div class="title">{{title}}</div>
      </div>
      <div class="down">
        <div class="footer">
          <span class="item" @click="handleUpdate">编辑</span>

          <span class="item" @click="handleViewData">数据</span>
          <Tooltip :content="pageUrl" theme="light" max-width="200" class="shareUrl">
            <span class="item">链接</span>
          </Tooltip>
          <span class="item setPub">
            <i-switch size="large" v-model="pub" @on-change="changePub">
              <span slot="open">发布</span>
              <span slot="close">未发</span>
            </i-switch>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SurveyCard",
  components: {},
  props: {
    createAt: {
      type: String,
      required: true
    },
    endAt: {
      type: String,
      required: true
    },
    isPub: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pub: false
    };
  },
  watch: {},
  computed: {
    status() {
      return this.pub ? "发布" : "未发布";
    },
    pageUrl() {
      return window.location.host + "/#/surveyPage?_id=" + this.id;
    }
  },
  methods: {
    // 发布按钮
    changePub() {
      let _id = this.id;
      let isPublished = this.pub;
      this.$emit("changePubStatus", { _id, isPublished });
    },
    handleUpdate() {
      this.$emit("updateSur", this.id);
    },
    handleDel() {
      this.$emit("delSur", { _id: this.id, index: this.index });
    },
    handleJump() {
      this.$emit("toQuests", { _id: this.id });
    },
    handleViewData() {
      this.$emit("viewData", this.id);
    }
  },
  created() {},
  mounted() {
    this.pub = this.isPub;
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 310px;
  border: 1px solid #dcdcdc;
  height: 190px;

  /* padding: 15px; */
  margin-top: 20px;
  background: #fff;
  box-shadow: 0px 0px 6px #dcdcdc;
  transition: all 0.5s ease;
  position: relative;
  .badge {
    position: absolute;
    /* left: 0; */
    right: -10px;
    top: -10px;
    color: white;
    background: #da4010;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    cursor: pointer;
  }

  .up {
    // background-color: rgb(192, 44, 56);
    // /* 荷叶绿 */
    // background-color: rgb(64, 160, 112);
    // /* 草黄 */
    // background-color: rgb(210, 180, 44);
    // /* 佛手黄 */
    // background-color: rgb(254, 215, 26);
    // /* 向日葵黄 */
    // background-color: rgb(254, 204, 17);
    // /* Zn灰 */
    // background-color: rgb(122, 115, 116);
    // /* 中灰驼 */
    // background-color: rgb(96, 61, 48);
    // /* 桃红 */
    // background-color: rgb(240, 173, 160);
    // /* 夕阳红 */
    // background-color: rgb(222, 42, 24);
    // /* 釉蓝 */
    // background-color: rgb(23, 129, 181);
    // /* 芝兰紫 */
    // background-color: rgb(126, 22, 113);
    // /* 兔眼红 */
    // background-color: rgb(236, 78, 138);

    background-color: #c02c38;
    background-color: #40a070;
    background-color: #d2b42c;
    background-color: #fed71a;
    background-color: #fecc11;
    background-color: #7a7374;
    background-color: #603d30;
    background-color: #f0ada0;
    background-color: #de2a18;
    background-color: #1781b5;
    background-color: #7e1671;
    background-color: #ec4e8a;

    color: #fff;
    padding: 10px 20px;
    height: 64%;
    cursor: pointer;
    overflow: hidden;

    .header {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }

    .title {
      margin-top: 20px;
    }
  }
  .down {
    padding: 0 20px;
    position: relative;
    height: calc(50% - 20px);

    .footer {
      position: absolute;
      bottom: 20px;

      .item {
        margin-left: 10px;
        font-size: 14px;
        cursor: pointer;
        &.setPub {
          // position: absolute;
          margin-left: 80px;
        }
      }
      .shareUrl {
        word-break: break-all;
      }
    }
  }
}
// .card::after {
//   content: "x";
//   position: absolute;
//   /* left: 0; */
//   right: -10px;
//   top: 10px;
//   color: white;
//   background: #da4010;
//   width: 30px;
//   height: 30px;
//   line-height: 30px;
//   border-radius: 30px;
// }
.card:hover {
  box-shadow: 0px 0px 6px #dcdcdc;
  // border: 0px solid #2672ff;
  box-shadow: 0px 0px 3px #838383;
  transform: scale(1.05);
}
</style>