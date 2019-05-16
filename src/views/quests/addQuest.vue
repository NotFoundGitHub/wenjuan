<template>
  <div class="addQuest">
    <!-- 顶部按钮组 -->
    <div class="header">
      <Button type="success" shape="circle" icon="md-cloud-done" @click="handleSave">保存所有</Button>
      <!-- <Button type="primary" shape="circle" icon="md-add-circle" @click="handleAdd">增加题目</Button> -->
    </div>
    <!-- 题目卡片 -->
    <template v-if="questList.length">
      <Card
        :bordered="true"
        class="card"
        v-for="(card,cardIndex) in questList"
        :flag="card.questIndex=cardIndex"
        :index="cardIndex"
        :key="'card'+_uid+cardIndex"
      >
        <div slot="title" class="title">
          <label class="label">题目{{cardIndex+1}}:</label>
          <Input v-model="card.title" placeholder="输入题目" clearable/>
          <span class="delBtn" @click="handleDelete(cardIndex,card._id)">x</span>
        </div>
        <!-- 各项选择 -->
        <div class="body">
          <div class="setting">
            <div class="item">
              <label class="label">类型:</label>
              <Select
                v-model="card.type"
                clearable
                style="width:200px"
                @on-change="handleTypeChange(card.type,cardIndex)"
              >
                <Option
                  v-for="item in typeList"
                  :value="item.value"
                  :key="'type'+item.value"
                >{{ item.label }}</Option>
              </Select>
              <span v-if="card.type=='i-input'">
                <Select v-model="card.kind" clearable style="width:100px">
                  <Option value="text">单行文本框</Option>
                  <Option value="textarea">多行文本框</Option>
                </Select>
              </span>
            </div>
            <div class="item">
              <label class="label">是否必填:</label>
              <i-switch v-model="card.required"/>
            </div>
            <div class="item">
              <Button type="primary" @click="addOption(cardIndex)">
                <Icon type="md-add"/>增加选项
              </Button>
            </div>
          </div>
          <div class="options" v-if="card.type&&card.type!=='i-input'&&card.type!='Rate'">
            <div
              class="item"
              v-for="(item,index) in card.children.list"
              :key="'op'+_uid+cardIndex+index"
            >
              <div class="op">
                <label class="label">选项:</label>
                <Input
                  v-model.lazy="item.title"
                  placeholder="如..北京"
                  clearable
                  style="width: 200px"
                />
              </div>
              <div class="op">
                <label class="label">对应值:</label>
                <Input
                  v-if="card.type==='i-select'"
                  v-model.lazy="item.value"
                  placeholder="如..beijing"
                  clearable
                  style="width: 200px"
                />
                <Input
                  v-else
                  v-model.lazy="item.label"
                  placeholder="如..beijing1"
                  clearable
                  style="width: 200px"
                />
              </div>
              <div class="op">
                <Button type="error" @click="delOption(index,cardIndex)">
                  <Icon type="md-close-circle"/>删除
                </Button>
              </div>
            </div>
          </div>
        </div>
        <!-- 渲染结果 -->
        <Divider>渲染结果</Divider>
        <render-box :form="card"></render-box>
      </Card>
    </template>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Button type="primary" shape="circle" icon="md-add-circle" @click="handleAdd">增加题目</Button>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Api from "@/api/index";
import renderBox from "@/components/render/renderQuest";
export default {
  name: "addQuest",
  components: {
    renderBox
  },
  props: {},
  data() {
    return {
      spinShow: true,
      questList: [],
      typeList: [
        {
          value: "i-input",
          label: "输入框"
        },
        {
          value: "Rate",
          label: "评分"
        },
        {
          value: "radio-group",
          label: "单选框"
        },

        {
          value: "CheckboxGroup",
          label: "多选框"
        },
        {
          value: "i-select",
          label: "下拉选择"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleAdd() {
      this.questList.push({
        title: "输入题目",
        type: "",
        required: false,
        kind: "",
        value: "",
        questIndex: "",
        children: {
          type: "",
          list: [{}]
        }
      });
    },
    handleSave() {
      console.log("questList:", this.questList);
      let survey = this.$route.query._id;
      Api.addQuest({ survey, data: this.questList })
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
    handleDelete(cardIndex, _id) {
      Api.delQuest({ _id })
        .then(res => {
          if (res.status == 1) {
            this.$Message.success(res.msg);
            this.questList.splice(cardIndex, 1);
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          this.$Message.error("请求错误或网络错误");
        });
    },
    // 类型切换时
    handleTypeChange(value, index) {
      // console.log("value", value, "index:", index);
      let child = this.questList[index].children;
      switch (value) {
        case "i-input": {
          child.type = "";
          child.list.splice(0);
          break;
        }
        case "Rate": {
          child.type = "";
          this.questList[index].value = 0;
          child.list.splice(0);
          break;
        }
        case "radio-group": {
          child.type = "radio";

          child.list.splice(0);
          break;
        }
        case "CheckboxGroup": {
          child.type = "checkbox";
          this.questList[index].value = [];
          child.list.splice(0);
          break;
        }
        case "i-select": {
          child.type = "i-option";
          child.list.splice(0);
          break;
        }
      }
    },
    addOption(cardIndex) {
      let questList = this.questList[cardIndex];
      if (
        !questList.type ||
        questList.type == "i-input" ||
        questList.type == "Rate"
      ) {
        this.$Message.error("当前类型不支持多个选择，请重新选择");
      } else {
        let len = questList.children.list.length;

        if (
          len == 0 ||
          ((len > 0 && questList.children.list[len - 1].label) ||
            questList.children.list[len - 1].title)
        ) {
          questList.children.list.push({
            title: "",
            label: ""
          });
        } else {
          this.$Message.error("请先输入完整各个选项才可以增加");
        }
      }
    },
    // 删除选项时候
    delOption(index, cardIndex) {
      let questList = this.questList[cardIndex].children;
      this.$Message.warning("删除 " + questList.list[index].title);
      questList.list.splice(index, 1);
    }
  },
  created() {},
  mounted() {
    let survey = this.$route.query._id;
    Api.getQuest({ survey })
      .then(res => {
        if (res.status == 1) {
          this.$Message.success(res.msg);
          console.log("req quest", res.data);
          this.questList = res.data;
          this.spinShow = false;
        } else {
          this.$Message.error(res.msg);
          this.spinShow = false;
        }
      })
      .catch(err => {
        this.$Message.error("请求错误或网络错误");
        this.spinShow = false;
      });
  }
};
</script>
<style lang="less" scoped>
.addQuest {
  .header {
    margin-bottom: 20px;
  }
  .card {
    text-align: left;
    margin: 20px 0;
    .title {
      height: 40px;
      display: flex;
      align-items: center;
      .delBtn {
        font-size: 20px;
        height: 30px;
        width: 30px;
        color: #fff;
        border-radius: 30px;
        line-height: 30px;
        text-align: center;
        background: red;
        display: inline-block;
        position: absolute;
        right: -15px;
        top: -15px;
        cursor: pointer;
      }
      .item {
        flex: auto;
      }
    }
    .body {
      .setting {
        display: flex;
        align-items: center;

        .item {
          flex: auto;
        }
      }
      .options {
        .item {
          margin: 20px 10px 20px 0px;
          display: flex;
          .op {
            flex: auto;
          }
        }
      }
    }
  }
  .label {
    width: 60px;
    display: inline-block;
  }
}
</style>