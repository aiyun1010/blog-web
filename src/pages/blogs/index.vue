<template>
  <div class="ay-blog-list" v-loading="loading">
    <div v-if="currentPageList.length===0" class="blog-list-empty">
      <i class="ay-icon-kulian"></i>
      <p>
        没有找到&nbsp;
        <b>{{searchText}}</b>&nbsp;相关的文章
      </p>
      <a @click="handleBackList">回到列表</a>
    </div>
    <div class="ay-blog-list-item" v-for="(item,index) in currentPageList" v-bind:key="item.id">
      <div class="ay-blog-list-item-main">
        <div class="ay-blog-list-item-left">
          <h3 class="ay-blog-list-item-title">
            <a @click="handleViewBlog(item._id)">{{ item.title }}</a>
          </h3>
          <section
            @click="handleViewBlog(item._id)"
            class="ay-blog-list-item-content"
            v-html="item.description"
          >{{ item.description }}</section>
        </div>
        <div class="ay-blog-list-item-right" @click="handleViewBlog(item._id)">
          <img
            :src="require(`../../assets/suoluetu/blog-00${index<6?index+1:index%6+1}.jpg`)"
            alt="图片加载失败"
          />
        </div>
      </div>

      <p class="ay-blog-list-item-time">
        <time>{{ computCreateTime(item.updateTime) }}</time> 发布 丨
        <a @click="handleViewBlog(item._id)">{{ articleComments(item._id) }} 条评论</a>
      </p>
    </div>
    <div class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="filterList.length"
        :page-size="pageSize"
        :current-page="blogCurrentPage"
        @current-change="handleCurrentChange"
        hide-on-single-page
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import moment from "moment";
// import "./bloglist.less";
export default {
  name: "BlogList",
  data() {
    return {
      loading: false,
      pageSize: 10
    };
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch("doGetBlogList", { status: "published" }).then(res => {
      this.loading = false;
    });
    this.$store.dispatch("doGetMessageList");
    this.$store.dispatch("doGetTagList");
    // this.doGetBlogList();
  },

  computed: {
    ...mapState([
      "searchText",
      "blogList",
      "tagList",
      "appMode",
      "blogCurrentPage"
    ]),
    articleComments: function(id) {
      return function(id) {
        return this.$store.state.messageList.filter(v => v.articleId === id)
          .length;
      };
    },
    computCreateTime: function(time) {
      return function(time) {
        return moment(time).format("YYYY年MM月DD日 HH:mm");
      };
    },
    filterList: function() {
      if (!this.searchText) {
        return this.blogList;
      }
      return this.blogList.filter(blog => {
        const titleMatch =
          blog.title &&
          blog.title.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
        const contentMatch =
          blog.content &&
          blog.content.toLowerCase().indexOf(this.searchText.toLowerCase()) >
            -1;
        const tagMatch = blog.tags.find(tagId => {
          const tagItem = this.tagList.find(tag => tag._id === tagId);
          return (
            tagItem &&
            tagItem.name.toLowerCase() === this.searchText.toLowerCase()
          );
        });
        return titleMatch || contentMatch || tagMatch;
      });
    },
    currentPageList: function() {
      return this.filterList.slice(
        (this.blogCurrentPage - 1) * this.pageSize,
        this.blogCurrentPage * this.pageSize
      );
    }
  }, //对应getters.js中的msg
  methods: {
    handleBackList: function() {
      this.$store.dispatch("doSetSearchText", "");
      this.$router.push({
        path: `/blogs`
      });
    },
    handleViewBlog: function(id) {
      this.$store.dispatch("doGetBlogById", id).then(res => {
        this.$router.push({
          path: `/blog/${id}`
        });
      });
    },
    handleCurrentChange: function(e) {
      scrollTo(0, this.appMode === "topBottom" ? 352 : 0); //如果是上下布局则滚动至321px处
      this.$store.dispatch("doSetBlogCurrentPage", e);
    }
    // ...mapActions(['doGetBlogList'])//可以通过辅助函数将action映射至此，也可直接使用store.dispatch调用action
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" src="./index.less"></style>
<style lang="less" scoped></style>
