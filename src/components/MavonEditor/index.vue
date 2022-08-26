<template>
  <div class="my-mavon-editor">
    <mavon-editor
      :value="content"
      ref="mavon-editor"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :ishljs="true"
    ></mavon-editor>
  </div>
</template>
<script>
// :value="detailContent.content"：引入要转换的内容
// :subfield = "false"：开启单栏模式
// :defaultOpen = "'preview'"：默认展示预览区域
// :toolbarsFlag = "false"：关闭工具栏
// :editable="false"：不允许编辑
// scrollStyle="true"：开启滚动条样式(暂时仅支持chrome)
// :ishljs = "true"：开启代码高亮
// Local Registration
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "editor",
  components: { mavonEditor },
  props: {
    content: String
  }
};
</script>
<style></style>
<style lang="less" src="./index.less"></style>
