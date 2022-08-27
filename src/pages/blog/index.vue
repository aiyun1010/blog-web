<template>
  <div class="blogview">
    <div class="blogview-main">
      <h2 class="blog-title">{{ currentBlog.title }}</h2>
      <div class="blog-time">
        发布于：
        <time>{{ computCreateTime(currentBlog.createTime) }}</time>
      </div>
      <!-- <section v-html="currentBlog.content"></section> -->
      <mavon-editor :content="currentBlog.content" />
      <div class="blog-support">
        <a @click="handleSupport" :class="[supported ? 'blog-supported' : '']">
          <i class="ay-icon-dianzan"></i>
        </a>
        <div>
          <span>{{ supported ? "您已赞" : "给个赞再走呗!!" }}</span>
          &nbsp;丨&nbsp;共 {{ currentBlog.support || 0 }} 个赞
        </div>
      </div>
    </div>

    <div class="blog-comments-wrapper">
      <div class="blog-comments">评论列表&nbsp;({{ computTotalComments }})</div>
      <MessageList :articleId="currentBlog._id" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import MessageList from "../../components/MessageList";
import MavonEditor from "../../components/MavonEditor";
export default {
  name: "BlogView",
  components: { MessageList, MavonEditor },
  data() {
    return {
      supported: this.getLocalStorage(this.$route.params.id)
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    //通过url直接访问博客，则通过接口获取文章信息
    if (!this.currentBlog._id) {
      this.$store.dispatch("doGetBlogById", this.$route.params.id);
      this.$store.dispatch("doGetMessageList");
      this.$store.dispatch("doGetBlogList");
    }
  },
  computed: {
    ...mapState(["currentBlog", "messageList"]),
    computCreateTime: function(time) {
      return function(time) {
        return moment(time).format("YYYY-MM-DD HH:mm");
      };
    },
    computTotalComments: function() {
      return this.messageList.filter(v => v.articleId === this.currentBlog._id)
        .length;
    }
  },
  methods: {
    goBack: function() {
      this.$router.push({
        path: `/blogs`
      });
    },
    handleSupport: function() {
      const beforeSupport = Math.abs(parseInt(this.currentBlog.support) || 0);
      this.$store
        .dispatch("doUpdateBlog", {
          ...this.currentBlog,
          support: beforeSupport + (this.supported ? -1 : 1)
        })
        .then(res => {
          this.$store.dispatch("doGetBlogById", this.currentBlog._id);
          this.setLocalStorage([this.currentBlog._id], !this.supported);
          this.supported = !this.supported;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" src="./index.less"></style>
<style scoped></style>
