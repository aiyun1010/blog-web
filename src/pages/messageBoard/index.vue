<template>
  <div class="messageboard" v-loading="loading">
    <MessageList />
  </div>
</template>

<script>
import MessageList from "../../components/MessageList";
import { mapState } from "vuex";
export default {
  name: "MessageBoard",
  data() {
    return {
      loading: false
    };
  },
  components: { MessageList },
  computed: {
    ...mapState(["appMode"])
  },
  created() {
    this.loading = true;
    this.$store.dispatch("doGetMessageList").then(res => {
      this.loading = false;
    });
  }
};
</script>

<style lang="less" src="./index.less"></style>
<style scoped></style>
