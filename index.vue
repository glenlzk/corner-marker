<template>
  <div style="margin: 20px;">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button
    plain
    @click="open2">
    不会自动关闭
    </el-button>
    <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
      <el-button>上右</el-button>
    </el-tooltip>
    <drag-demo></drag-demo>
    <div style="margin-top: 30px;">
      <xui-corner-marker>
        <el-button
          plain
          slot="content"
          @click="open2">
          不会自动关闭
        </el-button>
        <i>hahhhahah</i>
      </xui-corner-marker>
    </div>
    <div style="margin-top: 30px;">
      <xui-corner-marker :content="'hahhahah'">
        <i>hahhhahah</i>
      </xui-corner-marker>
    </div>
    <div ref="testBox">呵呵呵呵呵呵</div>
    <div ref="dataBox">hahhahahah</div>
  </div>
</template>

<script>

import dragDemo from './dragDemo'
import xuiIcon from './icon'
import xuiIconGroup from './icon-group'
import xuiCornerMarker from './corner-marker'
import cornerMarker from './corner-marker/src/main.js'

export default {
  data() {
    return {
      input: 'Hello Element UI!',
      activeName: 'first',
      activeName2: 'first',
      dynamicTags: ['标签一', '标签二', '标签三'],
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
    };
  },
  componentName: 'glenComp',
  components: {
    dragDemo,
    xuiIcon,
    xuiIconGroup,
    xuiCornerMarker
  },
  props: {
    data: String,
    popData: Object
  },
  mounted() {
    cornerMarker({
      el: this.$refs.testBox,
      content: '尼玛。。。。。'
    })

    const h = this.$createElement;
    cornerMarker({
      el: this.$refs.dataBox,
      content: h('p', null, [
        h('span', null, '内容可以是 '),
        h('i', { style: 'color: teal' }, 'VNode')
      ])
    });
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    open2() {
      this.$notify({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0
      });
    },
    btnClick() {
      console.log('哈哈哈');
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    iconClick(val) {
      console.log(val);
      console.log(this.activeName);
    },
    handleTabsEdit(targetName, action) {
      console.log(targetName, action);
      if (action === 'add') {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  },
};
</script>
