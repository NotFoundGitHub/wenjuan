<template>
  <div class="login_container">
    <div class="box">
      <header>
        <router-link :to="{ name: 'login'}" tag="span" active-class="active">登录</router-link>
        <router-link :to="{ name: 'regist'}" tag="span" active-class="active">注册</router-link>
      </header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="less" scoped>
@login_color: #453356;
@head_color :  #6d4a70;
@shadow_color: #240427;

@ver_dis :2px;
@hor_dis :2px;
@shadow_radius: 10px;
@header_h : 80px;
@form_width: 400px;

.login_container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: @login_color;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    -moz-box-shadow: @ver_dis @hor_dis @shadow_radius @shadow_color;
    -webkit-box-shadow: @ver_dis @hor_dis @shadow_radius @shadow_color;
    box-shadow: @ver_dis @hor_dis @shadow_radius @shadow_color;
    header {
      width: @form_width;
      height: @header_h;
      line-height: @header_h;
      background: @head_color;
      font-size: @header_h*0.3;
      color: #dedede;
      text-align: center;
      span {
        color: #ccc;
        font-size: @header_h*0.25;
        cursor: pointer;
        margin-left: 20px;
        user-select: none;
      }
      span.active {
        color: #fff;
        font-size: @header_h*0.3;
        pointer-events: none;
      }
      span:hover {
        font-size: @header_h*0.3;
      }
    }
  }
}
</style> 