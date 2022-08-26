<template>
  <div>
    <CreateMessage sendType="new" :articleId="articleId" />
    <div id="messagelist-anchor"></div>
    <div class>
      <div v-for="item in pageList" :key="item._id">
        <MessageItem :messageInfo="item" />
      </div>
    </div>
    <div style="text-align:center" class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="allList.length"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        hide-on-single-page
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import CreateMessage from "../CreateMessage";
import MessageItem from "../MessageItem";
import { mapState } from "vuex";
export default {
  name: "MessageList",
  props: { articleId: String },
  components: { CreateMessage, MessageItem },
  data() {
    return {
      pageSize: 10,
      currentPage: 1
    };
  },
  created() {
    // console.log(this.list);
  },
  methods: {
    handleCurrentChange: function(e) {
      const scrollTop = document.documentElement.scrollTop;
      const boundingClientRect = document
        .getElementById("messagelist-anchor")
        .getBoundingClientRect();

      scrollTo(
        0,
        scrollTop +
          boundingClientRect.top +
          (this.appMode === "topBottom" ? -120 : -70)
      );
      this.currentPage = e;
    }
  },
  computed: {
    ...mapState(["appMode", "messageList"]),
    allList: function() {
      return this.articleId
        ? this.messageList.filter(v => v.articleId === this.articleId)
        : this.messageList;
    },
    pageList: function() {
      return this.allList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  }
};
</script>
<style scoped></style>
