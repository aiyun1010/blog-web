<template>
  <el-form ref="postForm" :model="postForm" :loading="loading" class="new-message-form">
    <el-form-item>
      <el-input v-model="postForm.name" name="name" placeholder="好汉留名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="postForm.content"
        name="content"
        type="textarea"
        :rows="textareaRow"
        placeholder="说点什么吧..."
      ></el-input>
    </el-form-item>
    <el-form-item style="text-align:right">
      <el-button
        type="primary"
        :disabled="submitBtnDisabled"
        :loading="loading"
        @click="handleSubmit"
      >{{submitBtnText}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CreateMessage",
  props: { sendType: String, onSend: Function, articleId: String, pId: String },
  created() {
    // console.log(localStorage.getItem("ayblogusername"));
  },
  data() {
    return {
      loading: false,
      postForm: {
        content: "", // 文章内容
        name: this.getLocalStorage("userName") || ""
      }
    };
  },
  methods: {
    //不能在子组件修改props数据，应触发事件让父组件处理
    handleSubmit() {
      // this.$emit("onSend", this.postForm);
      this.loading = true;
      this.$store
        .dispatch("doCreateMessage", {
          ...this.postForm,
          pId: this.pId,
          articleId: this.articleId
        })
        .then(res => {
          this.$notify({
            message: res.message,
            type: res.success ? "success" : "error",
            duration: 2000
          });
          this.setLocalStorage("userName", this.postForm.name);
          this.postForm.content = "";
          this.loading = false;
        });
    }
  },
  computed: {
    textareaRow: function() {
      return this.sendType === "new" ? 3 : 1;
    },
    submitBtnText: function() {
      return this.sendType === "new" ? "写新留言" : "回复";
    },
    submitBtnDisabled: function() {
      return !this.postForm.name || !this.postForm.content;
    }
  }
};
</script>
<style lang="less" src="./index.less"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
