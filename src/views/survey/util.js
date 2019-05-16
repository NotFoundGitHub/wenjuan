export default {
  initCharts(questList, answerList) {
    let questArr = [];
    questList.map((item) => {
      questArr.push({
        type: item.type,
        title: item.title,
        children: item.children,
        questIndex: item.questIndex
      })
    })
    let persons = answerList.length;

    questArr.sort((a, b) => {
      return a.questIndex > b.questIndex;
    })

    let answerArr = []
    answerList.map((item) => {
      item.answers.map(answer => {
        answerArr.push(answer)
      })
    })

    answerArr.sort((a, b) => {
      return a.questIndex - b.questIndex;
    })
    // 聚类
    let ansTemp = [];

    answerArr.map((item) => {
      if (!ansTemp[+(item.questIndex)]) {
        ansTemp[+(item.questIndex)] = [];
      }

      ansTemp[+(item.questIndex)].push(item)
    })
    answerArr = ansTemp;

    // 统计
    let list = [];
    answerArr.map(quest => {
      let obj = {};
      quest.map(item => {
        if (!obj[item.value]) {
          obj[item.value] = 1;
        } else {
          obj[item.value] = obj[item.value] + 1;
        }
      })
      list.push(obj)
    })


    let rowList = [];

    // 获得输入框
    let input = [];

    for (let i = 0; i < list.length; i++) {
      let row = [];
      let quest = questArr[i];
      let answer = list[i]

      if (quest.type == 'i-input') {
        input.push(i)
      }

      // 处理多选问题
      if (quest.type == 'CheckboxGroup') {
        for (let key in answer) {
          if (key.includes(',')) {
            let keys = key.split(',')
            keys.map(it => {
              if (!answer[it]) {
                answer[it] = 1
              } else {
                answer[it] = answer[it] + 1;
              }
            })
            delete answer[key];
          }
        }
      }
      // 格式化调整
      for (let key in answer) {
        if (key == '') {
          row.push({
            '选项': '空选',
            '人数': answer[key]
          })
        } else {
          let flag = false;
          quest.children.list.map(op => {
            if (op.value == key || op.label == key) {
              row.push({
                '选项': op.title,
                '人数': answer[key]
              })
              flag = true;
            }
          })
          if (!flag) {
            row.push({
              '选项': key,
              '人数': answer[key]
            })
          }

        }
      }
      rowList.push({
        quest: quest.title,
        showType: '',
        persons,
        row: {
          columns: ['选项', '人数'],
          rows: row
        }
      })
    }


    if (input.length) {
      input.map(i => {
        rowList[i].row.rows = [];
      })
    }
    return rowList;
  }
}
