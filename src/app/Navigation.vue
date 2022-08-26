<template>
  <div :class="['app-nav', isHomePage ? 'app-nav-full' : '', navigationCls]">
    <div class="navigation-main">
      <!-- <a class="layout-toggle" @click="handleChangeAppMode" v-show="showLayoutToggle">
        <i :class="[layoutToggleBtnCls]"></i>
      </a>-->
      <!-- {{ clientWidth }} -->
      <div class="navigation-avatar"></div>
      <div class="navigation-title">艾云的博客</div>
      <div class="navigation-title-en">Aiyun's Blog</div>
      <!-- {{ navigationCls }} -->
      <div class="navigation-menu">
        <router-link to="/">
          <i class="ay-icon-home"></i>
          <span>首页</span>
        </router-link>

        <router-link to="/blogs">
          <i class="ay-icon-list"></i>
          <span>我的博客</span>
        </router-link>

        <router-link to="/messageboard">
          <i class="ay-icon-message"></i>
          <span>留言板</span>
        </router-link>

        <router-link to="/aboutme">
          <i class="ay-icon-aboutme"></i>
          <span>关于我</span>
        </router-link>

        <a @click="handleAppThemeChange">
          <i :class="[themeToggleIcon]"></i>
          <span>切换主题</span>
        </a>

        <a @click="handleAppModeChange" v-show="showLayoutToggle">
          <i :class="[layoutToggleIcon]"></i>
          <span>切换排版</span>
        </a>
      </div>
      <div class="navigation-search">
        <el-input
          placeholder="搜你感兴趣的..."
          :value="inputValue"
          @input="handleInput"
          @change="handleSearch"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search navigation-search-btn"
            @click="handleSearch"
          ></i>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import _ from "lodash";
export default {
  name: "Navigation",
  components: {},
  data() {
    return {
      currentIndex: 1,
      maxIndex: 6,
      navigationCls: "navigation-bg-1",
      clientWidth: document.body.clientWidth
    };
  },
  created() {
    // console.log("create:", this.$route);
  },
  mounted() {
    const _this = this;

    //背景自动切换
    setInterval(function() {
      _this.navigationCls = `navigation-bg-${_this.currentIndex}`;
      // console.log(_this.navigationCls, _this.currentIndex);
      if (_this.currentIndex === _this.maxIndex) {
        _this.currentIndex = 1;
      } else {
        _this.currentIndex++;
      }
    }, 10000);

    //监听windowresize
    window.onresize = () => {
      return (() => {
        _this.clientWidth = document.body.clientWidth;
        if (document.body.clientWidth <= 1024) {
          _this.$store.dispatch("doSetAppMode", "topBottom");
        }
      })();
    };
  },
  updated() {
    // console.log("updated:", this.$route);
  },
  computed: {
    ...mapState(["inputValue", "searchText", "appMode", "appTheme"]),
    isHomePage: function() {
      return this.$route.path === "/" || this.$route.path === "/home";
    },
    layoutToggleIcon: function() {
      return this.appMode === "topBottom"
        ? "ay-icon-shouqi"
        : "ay-icon-zhankai";
    },
    themeToggleIcon: function() {
      return this.appTheme === "light" ? "el-icon-moon" : "el-icon-sunny";
    },
    showLayoutToggle: function() {
      return (
        this.$route.path !== "/" &&
        this.$route.path !== "/home" &&
        this.clientWidth > 1024
      );
    }
  },

  methods: {
    // ...mapActions(["fun"]), //对应 Actions中fun方法
    handleInput(value) {
      this.$store.dispatch("doSetInputValue", value);
    },
    handleSearch() {
      this.$router.push({ path: "/blogs" });
      this.$store.dispatch("doSetSearchText", this.inputValue);
    },
    handleAppModeChange() {
      this.$store.dispatch(
        "doSetAppMode",
        this.appMode === "topBottom" ? "leftRight" : "topBottom"
      );
    },
    handleAppThemeChange() {
      this.$store.dispatch(
        "doSetAppTheme",
        this.appTheme === "light" ? "dark" : "light"
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" src="./navigation.less"></style>
<style scoped></style>
