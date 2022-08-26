<template>
  <div class="app">
    <div :class="[appModeCls, appScrollCls]">
      <el-backtop></el-backtop>
      <Navigation></Navigation>
      <div v-show="!isHomePage" class="app-main">
        <div class="page-main">
          <div
            class="page-main-title"
            v-if="
              !(
                appMode === 'topBottom' &&
                this.$route.path.indexOf('/blog/') > -1
              )
            "
          >
            <router-link to="/blogs" v-if="pageTitle">
              <i class="el-icon-d-arrow-left"></i>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <span>{{ pageTitle }}</span>
          </div>
          <router-view class="page-router" />
        </div>
        <div>
          <PageLeft v-if="appMode === 'topBottom'" />
          <PageRight v-if="appMode === 'topBottom'" />
        </div>
        <!-- <div>
          <PageRight v-if="appMode === 'topBottom'" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import PageLeft from "@/components/PageLeft";
import PageRight from "@/components/PageRight";
import { mapState } from "vuex";
import { debounce } from "lodash";
export default {
  name: "App",
  data() {
    return {
      scrollTop: 0
      // screenWidth: document.body.clientWidth
    };
  },
  components: { Navigation, PageLeft, PageRight },
  created() {
    document.addEventListener("scroll", this.handleScroll, true);
  },
  mounted() {
    // this.mouseClickAnimation();
  },
  computed: {
    ...mapState(["appMode", "currentBlog"]),
    isHomePage: function() {
      return this.$route.path === "/" || this.$route.path === "/home";
    },
    pageTitle: function() {
      if (this.$route.path === "/blogs") {
        return "我的博客";
      } else if (this.$route.path === "/messageboard") {
        return "留言板";
      } else if (this.$route.path.indexOf("/blog/") > -1) {
        return this.currentBlog.title;
        // return this.currentBlog && this.currentBlog.title;
      } else if (this.$route.path === "/aboutme") {
        return "关于我";
      }
      return "标题";
    },
    appModeCls: function() {
      return this.appMode === "topBottom" ? "app-top-bottom" : "app-left-right";
    },
    appScrollCls: function() {
      return this.scrollTop > 340 && this.appMode === "topBottom"
        ? "app-scrolled"
        : "";
    }
  },
  methods: {
    handleScroll: debounce(function() {
      this.scrollTop = document.documentElement.scrollTop;
    }, 0),
    mouseClickAnimation: function() {
      // 我们首先检查浏览器是否支持Web Animations API
      if (document.body.animate) {
        // 如果支持，我们在body上添加一个点击监听器
        // document.querySelectorAll("a").addEventListener("click", pop);
        document.body.addEventListener("click", pop);
        // 每次点击都会调用 pop() 函数
        function pop(e) {
          // 循环一次生成30个粒子I
          if (e.target.tagName === "A" || e.target.tagName === "I") {
            for (let i = 0; i < 30; i++) {
              // 我们将鼠标坐标传递给 createParticle() 函数
              createParticle(e.clientX, e.clientY);
            }
          }
        }
        function createParticle(x, y) {
          // 创建自定义粒子元素
          const particle = document.createElement("particle");
          // 将元素添加道body中
          document.body.appendChild(particle);
          // 计算从5px到25px的随机大小
          const size = Math.floor(Math.random() * 20 + 5);
          // 将大小应用于每个粒子
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          // 在蓝色/紫色调色板中生成随机颜色
          particle.style.background = `hsl(${Math.random() * 90 +
            180}, 70%, 60%)`;
          // 在距离鼠标75像素的范围内生成随机的x和y目标
          const destinationX = x + (Math.random() - 0.5) * 2 * 75;
          const destinationY = y + (Math.random() - 0.5) * 2 * 75;

          // 将动画存储在变量中，因为稍后我们将需要它
          const animation = particle.animate(
            [
              {
                // 设置粒子的原点位置
                // 我们将粒子偏移一半大小，以使其围绕鼠标居中
                transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
                opacity: 1
              },
              {
                // 我们将最终坐标定义为第二个关键帧
                transform: `translate(${destinationX}px, ${destinationY}px)`,
                opacity: 0
              }
            ],
            {
              // 将随机持续时间设置为500到1500ms
              duration: 500 + Math.random() * 1000,
              easing: "cubic-bezier(0, .9, .57, 1)",
              // 将每个粒子延迟从0ms到200ms的随机值
              delay: Math.random() * 200
            }
          );

          // 动画结束后，从DOM中删除元素
          animation.onfinish = () => {
            particle.remove();
          };
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      scrollTo(0, this.appMode === "topBottom" ? 352 : 0);

      //如果是上下布局则滚动至322px处
      // console.log(to.path, from.path);

      // clearTimeout(this.timer);
      // this.timer = setTimeout(() => {
      //   console.log(this.appMode, to);
      //   scrollTo(0, this.appMode === "topBottom" ? 332 : 0);
      // }, 0);

      //监听路由变化，如果不是博客列表页则清空全局搜索框的值
      // if (to && to.path !== "/bloglist") {
      //   this.$store.dispatch("doSetSearchText", "");
      // }
    }
  }
};
</script>

<style lang="less" src="./index.less"></style>
