<template>
  <div class="page-left">
    <div class="page-left-title">技术标签</div>
    <ul class="page-left-items">
      <li v-for="item in tagList" :key="item._id">
        <a @click="handleClick(item.name)">
          <i class="el-icon-medal-1"></i>
          {{ item.name }}
          <span>({{ computedRelatedArticles(item._id) }})</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PageLeft",
  props: {},
  components: {},
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("doGetTagList");
  },
  computed: {
    ...mapState(["tagList", "blogList"]),
    computedRelatedArticles: function(tagId) {
      return function(tagId) {
        return (
          this.blogList &&
          this.blogList.filter(v => v.tags.includes(tagId)).length
        );
      };
    }
  },
  methods: {
    handleClick: function(tag) {
      this.$store.dispatch("doSetSearchText", tag);
      this.$router.push("/blogs");
    }
  }
};
</script>
<style lang="less" src="./index.less"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
