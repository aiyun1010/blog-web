<template>
  <div class="messageboard-item">
    <h3 class="messageboard-item-name">{{ messageInfo.name }}</h3>
    <div class="messageboard-item-time">
      <time>{{ computCreateTime(messageInfo.createTime) }}</time>&nbsp;&nbsp;在&nbsp;
      <span
        class="messageboard-item-location"
      >{{ messageInfo.location || "未知地" }}</span>&nbsp;说：
    </div>
    <div class="messageboard-item-content">{{ messageInfo.content }}</div>
    <div class="messageboard-item-rate">
      <a @click="handleSupport" :class="[supported?'message-supported':'']">
        <i class="ay-icon-dianzan"></i>
        {{supported?"已赞":"点赞"}} ({{ messageInfo.support || 0 }})
      </a>
      <!-- <a>
        <i class="ay-icon-cai"></i>
        反对 ({{ messageInfo.oppose || 0 }})
      </a>-->
      <a @click="handleShowReply">
        <i class="ay-icon-reply"></i>
        评论 ({{ (messageInfo.children && messageInfo.children.length) || 0 }})
        <i
          :class="[showReply ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"
        ></i>
      </a>
    </div>
    <div v-if="showReply" class="messageboard-replylist">
      <div v-for="(item, index) in messageInfo.children" :key="item._id" class="replylist-item">
        <div>
          <span class="replylist-item-num">{{ index + 1 }}楼&nbsp;</span>
          <span class="replylist-item-name">{{ item.name }}</span>
          <span class="replylist-item-time">
            <time>{{ item.createTime }}</time>&nbsp;&nbsp; 在&nbsp;
            <span class="replylist-item-location">{{ item.location || "未知地" }}</span>&nbsp;回复：
          </span>
        </div>

        <div class="replylist-item-content">{{ item.content }}</div>
      </div>
      <CreateMessage :pId="messageInfo._id" />
    </div>
  </div>
</template>

<script>
import CreateMessage from "../../components/CreateMessage";

import moment from "moment";
export default {
  name: "MessageItem",
  props: { messageInfo: Object },
  components: { CreateMessage },
  data() {
    return {
      showReply: false,
      supported: this.getLocalStorage(this.messageInfo._id),
    };
  },
  methods: {
    //不能在子组件修改props数据，应触发事件让父组件处理
    // handleSend() {
    //   this.$emit("onSend", this.postForm);
    // },
    // handleReply() {
    //   console.log(this.messageInfo._id, this.postForm);
    // },
    handleShowReply() {
      this.showReply = !this.showReply;
    },
    handleSupport() {
      let beforeSupport = Math.abs(parseInt(this.messageInfo.support) || 0);
      this.$store
        .dispatch("doUpdateMessage", {
          ...this.messageInfo,
          support: beforeSupport + (this.supported ? -1 : 1),
        })
        .then((res) => {
          this.setLocalStorage([this.messageInfo._id], !this.supported);
          this.supported = !this.supported;
        });
    },
  },
  computed: {
    getSendBtnText: function () {
      return this.sendType === "new" ? "写新留言" : "回复";
    },
    computCreateTime: function (time) {
      return function (time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      };
    },
  },
};
</script>
<style lang="less" src="./index.less"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
