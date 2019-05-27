<template>
  <div class="publishQuest">
    <h2 class="title">发布网址</h2>
    <div>
      <div class="url">
        <Input v-model="value" style="width: 300px"/>
        <Button
          type="primary"
          v-clipboard:copy="value"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制到粘贴板</Button>
        <Button type="primary">
          <router-link
            style="color:#fff"
            target="_blank"
            :to="{name:'surveyPage',query:{'_id':$route.query._id}}"
          >打开</router-link>
        </Button>
      </div>
      <img :src="qrcodeUrl" alt="二维码" width="300px;">
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "publishQuest",
  components: {},
  props: {},
  data() {
    return {
      qrcodeUrl: "",
      value: "http://localhost:8080/#/user/login"
    };
  },
  watch: {},
  computed: {},
  methods: {
    handle() {
      // let clipBoardContent = "http://localhost:8080/#/user/login";
      // window.Clipboard.setData("Text", clipBoardContent);
    },
    onCopy() {
      this.$Message.success("复制成功");
    },
    onError() {
      this.$Message.error("复制失败");
    },
    makeQRCode(value) {
      QRCode.toDataURL(value)
        .then(url => {
          this.qrcodeUrl = url;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  created() {},
  mounted() {
    let _id = this.$route.query._id;
    let url =
      "http://" + window.location.host + "/#/home/surveyPage?_id=" + _id;
    this.value = url;
    this.makeQRCode(url);
  }
};
</script>
<style lang="less" scoped>
.publishQuest {
  .title {
    margin: 20px;
  }
}
</style>