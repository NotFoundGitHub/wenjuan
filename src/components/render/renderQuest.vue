<script>
export default {
  name: "renderBox",
  props: ["form"],
  render(h) {
    return h(
      "div",
      {
        on: {},
        style: {},
        class: "render"
      },
      [
        h("div", { class: "header" }, [
          h("div", { class: "title" }, [
            this.form.required ? h("span", { class: "require" }, "(*)") : "",
            h("span", this.form.questIndex + 1 + ". " + this.form.title)
          ]),

          h(
            this.form.type,
            {
              class: "content",
              props: {
                type:
                  this.form.kind && this.form.type === "i-input"
                    ? this.form.kind
                    : null
              }
            },
            this.form.children.list.map(item => {
              let opType = this.form.children.type;
              if (opType) {
                return h(
                  opType,
                  {
                    class: "item",
                    props: {
                      title: item.title,
                      label: opType != "i-option" ? item.label : null,
                      value: opType == "i-option" ? item.label : null
                    }
                  },
                  item.title
                );
              }
            })
          )
        ]),
        h("div", {})
      ]
    );
  },
  mounted() {
    // console.log("form:", this.form);
  },
  updated() {
    // console.log("update form:", this.form);
  }
};
</script>
<style lang="less" scoped>
.render {
  .header {
    .title {
      font-weight: 600;
      font-size: 16px;
      .require {
        color: red;
      }
    }
    .content {
      margin-top: 16px;
      width: 300px;

      .item {
        font-size: 14px;
        margin-right: 18px;
      }
    }
  }
}
</style>