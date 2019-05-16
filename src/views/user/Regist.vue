<template>
  <div>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="60"
      class="form"
    >
      <FormItem label="昵称" prop="nickname">
        <Input v-model="formValidate.nickname" placeholder="输入昵称" clearable>
          <Icon type="md-person" slot="prefix"/>
        </Input>
      </FormItem>
      <FormItem label="邮箱" prop="username">
        <Input v-model="formValidate.username" placeholder="输入邮箱" clearable>
          <Icon type="md-mail" slot="prefix"/>
        </Input>
      </FormItem>
      <FormItem label="验证码" prop="vericode">
        <Input v-model="formValidate.vericode" placeholder="输入验证码" style="width:68%;">
          <Icon type="md-mail-open" slot="prefix"/>
        </Input>
        <Button shape="circle" @click="handleVerify">发送验证码</Button>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="formValidate.password" placeholder="输入密码" clearable>
          <Icon type="md-key" slot="prefix"/>
        </Input>
      </FormItem>

      <ButtonGroup shape="circle" class="footer" size="large">
        <Button type="primary" @click="handleSubmit('formValidate')">注册</Button>
      </ButtonGroup>
    </Form>
  </div>
</template>

<script>
import Api from "@/api/index";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "regist",
  data() {
    return {
      formValidate: {
        nickname: "",
        username: "",
        vericode: "",
        password: ""
      },
      ruleValidate: {
        nickname: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        username: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          { type: "email", message: "输入正确邮箱格式", trigger: "blur" }
        ],
        vericode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["username"])
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Api.regist(this.formValidate)
            .then(res => {
              if (res.status == 1) {
                this.SET_USER(this.formValidate.username);
                this.$Message.success(res.msg);
                window.localStorage.setItem(
                  "username",
                  this.formValidate.username
                );
                this.$router.push({ name: "survey" });
              } else {
                this.$Message.warning(res.msg);
              }
            })
            .catch(err => {
              this.$Message.error("请求错误或网络错误");
            });
        } else {
          this.$Message.error("格式错误");
        }
      });
    },
    handleVerify() {
      let username = this.formValidate.username.trim();
      if (username) {
        Api.getVerify({ username })
          .then(res => {
            if (res.status == 1) {
              this.$Message.success(res.msg);
            } else {
              this.$Message.warning(res.msg);
            }
          })
          .catch(err => {
            this.$Message.error("请求错误或网络错误");
          });
      } else {
        this.$Message.info("请输入邮箱账号");
      }
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