<template>
  <div>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="60"
      class="form"
    >
      <FormItem label="邮箱" prop="username">
        <Input v-model="formValidate.username" placeholder="输入邮箱">
          <Icon type="md-mail" slot="prefix"/>
        </Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="formValidate.password" placeholder="输入密码" type="password">
          <Icon type="md-key" slot="prefix"/>
        </Input>
      </FormItem>

      <ButtonGroup shape="circle" class="footer" size="large">
        <Button type="primary" @click="handleSubmit('formValidate')">
          <Icon type="ios-arrow-back"></Icon>登录
        </Button>
        <Button @click="handleLostPass">
          忘记密码
          <Icon type="ios-arrow-forward"></Icon>
        </Button>
      </ButtonGroup>
    </Form>
  </div>
</template>

<script>
import Api from "@/api/index";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "login",
  data() {
    return {
      formValidate: {
        username: "",
        password: ""
      },
      ruleValidate: {
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          { type: "email", message: "输入正确邮箱格式", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState(["username"])
  },
  methods: {
    ...mapMutations(["SET_USER", "SET_NICKNAME"]),
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 登录
          Api.login(this.formValidate)
            .then(res => {
              if (res.status == 1) {
                this.SET_USER(this.formValidate.username);
                this.$Message.success(res.msg);
                // 查找用户信息
                Api.getUser().then(user => {
                  if (user.status == 1) {
                    this.SET_NICKNAME(user.data.nickname);
                    this.$Message.success(user.msg);
                    // 两个方法都执行成功才可以跳转路由
                    this.$router.push({ name: "survey" });
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
              } else {
                this.$Message.error(res.msg);
              }
            })
            .catch(err => {
              this.$Message.error("请求错误或网络错误");
            });
        } else {
          this.$Message.error("输入数据错误");
        }
      });
    },
    handleLostPass() {
      this.$router.push({ name: "updatePass" });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
@form_width: 400px;
.form {
  width: @form_width;
  padding: 20px 20px;
  background: #dfdfdf;
  .footer {
    display: flex;
    align-items: center;
    margin-top: 40px;
    button {
      flex: 1;
    }
  }
}
</style>