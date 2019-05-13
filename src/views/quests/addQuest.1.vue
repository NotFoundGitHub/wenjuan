<template>
  <div class="addQuest">
    <Card :bordered="true" class="card">
      <div slot="title" class="title">
        <label class="label">题目:</label>
        <Input v-model="form1.title" placeholder="输入题目" clearable/>
      </div>
      <div class="body">
        <div class="setting">
          <div class="item">
            <label class="label">类型:</label>
            <Select v-model="form1.type" clearable style="width:200px">
              <Option
                v-for="item in typeList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <span v-if="form1.type=='i-input'">
              <Select v-model="form1.kind" clearable style="width:100px">
                <Option value="text">单行文本框</Option>
                <Option value="textarea">多行文本框</Option>
              </Select>
            </span>
          </div>
          <div class="item">
            <label class="label">是否必填:</label>
            <i-switch v-model="form1.required"/>
          </div>
          <div class="item">
            <Button type="primary" @click="addOption">
              <Icon type="md-add"/>增加选项
            </Button>
          </div>
        </div>
        <div class="options" v-if="form1.type!=='i-input'&&form1.type!='Rate'">
          <div class="item" v-for="(item,index) in opList">
            <div class="op">
              <label class="label">选项:</label>
              <Input v-model.lazy="item.title" placeholder="如..北京" clearable style="width: 200px"/>
            </div>
            <div class="op">
              <label class="label">对应值:</label>
              <Input
                v-model.lazy="item.label"
                placeholder="如..beijing"
                clearable
                style="width: 200px"
              />
            </div>
            <div class="op">
              <Button type="error" @click="delOption(index)">
                <Icon type="md-close-circle"/>删除
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Divider>渲染结果</Divider>
      <render-box :form="form1" :opList="opList"></render-box>
    </Card>
  </div>
</template>

<script>
import renderBox from "@/components/render/renderQuest";
export default {
  name: "addQuest",
  components: {
    renderBox
  },
  props: {},
  data() {
    return {
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
      ],
      form1: {
        title: "爱好",
        type: "i-input",
        required: false,
        kind: "",
        children: {
          type: ""
        }
      },
      opList: [
        {
          title: "",
          label: ""
        }
      ],
      form: [
        {
          title: ""
        }
      ]
    };
  },
  watch: {
    "form1.type"(value) {
      switch (value) {
        case "i-input": {
          this.form1.children.type = "";
          this.opList.splice(0);
          break;
        }
        case "Rate": {
          this.form1.children.type = "";
          this.opList.splice(0);
          break;
        }
        case "radio-group": {
          this.form1.children.type = "radio";
          this.opList.splice(0);
          break;
        }
        case "CheckboxGroup": {
          this.form1.children.type = "checkbox";
          this.opList.splice(0);
          break;
        }
        case "i-select": {
          this.form1.children.type = "i-option";
          this.opList.splice(0);
          break;
        }
      }
    }
  },
  computed: {},
  methods: {
    addOption() {
      if (
        !this.form1.type ||
        this.form1.type == "i-input" ||
        this.form1.type == "Rate"
      ) {
        this.$Message.error("当前类型不支持多个选择，请重新选择");
      } else {
        let len = this.opList.length;

        if (
          len == 0 ||
          ((len > 0 && this.opList[len - 1].label) ||
            this.opList[len - 1].title)
        ) {
          this.opList.push({
            title: "",
            label: ""
          });
        } else {
          this.$Message.error("请先输入完整各个选项才可以增加");
        }
      }
    },
    delOption(index) {
      this.$Message.warning("删除 " + this.opList[index].title);
      this.opList.splice(index, 1);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.addQuest {
  .card {
    text-align: left;
    .title {
      height: 40px;
      display: flex;
      align-items: center;
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