<template>
  <div class="page-right">
    <div class="page-right-title">博主推荐</div>
    <!-- <div class="page-right-title">
      <i class="el-icon-time" />&nbsp;&nbsp;热点文章
    </div>-->
    <!-- <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="(item,index) in hotArticles" :key="item.id">
        <div class="page-hotarticles-item">
          <img :src="require(`../../assets/suoluetu/blog-00${index+1}.jpg`)" alt="图片加载失败" />
        </div>
      </el-carousel-item>
    </el-carousel>-->

    <ul class="page-right-items">
      <li
        class="page-right-item"
        v-for="(item, index) in calcRecommendArticles"
        :key="item._id"
      >
        <i :class="calcIconClass(index)"></i>
        <div>
          <a>{{ item.title }}</a>
          <p>
            <time>{{ calcTime(item.createTime) }}</time>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "PageRight",
  props: {},
  components: {},
  data() {
    return {
      hotArticles: [
        {
          id: 1,
          img: "",
          title: "第一篇热点",
          src: ""
        },
        {
          id: 2,
          title: "第2篇热点"
        },
        {
          id: 3,
          title: "第3篇热点"
        }
      ]
    };
  },
  computed: {
    ...mapState(["blogList"]),
    calcRecommendArticles: function() {
      return this.blogList.filter(v => v.importance === 5);
    },
    calcTime: function(time) {
      return function(time) {
        return moment(time).format("YYYY-MM-DD HH:mm");
      };
    },
    calcIconClass: function(index) {
      return function(index) {
        switch (index) {
          case 0:
            return "ay-icon-guanjun gold-color";
          case 1:
            return "ay-icon-yajun gainsboro-color";
          case 2:
            return "ay-icon-jijun rosybrown-color";
          default:
            return "";
        }
      };
    }
  },
  methods: {
    handleClick: function() {}
  }
};
</script>
<style lang="less" src="./index.less"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
