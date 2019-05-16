<template>
  <div>
    <div class="thanks">
      <div class="box">感谢填写问卷</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "thanks",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.thanks {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("~@/static/img/nw.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(10px);

    z-index: 2;
  }
  .box {
    position: absolute;
    height: 200px;
    font-size: 60px;
    color: #504f4f;
    z-index: 10;
  }
}
</style>