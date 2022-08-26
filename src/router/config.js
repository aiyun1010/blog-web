//appWeb
import Blogs from "@/pages/blogs";
import BlogView from "@/pages/blog";
import MessageBoard from "@/pages/messageBoard";
import AboutMe from "@/pages/aboutMe";

const routes = {
  home: {
    path: "/",
    name: "home",
    component: Blogs
  },
  blogs: {
    path: "/blogs",
    name: "Blogs",
    component: Blogs
  },
  blog: {
    path: "/blog/:id",
    name: "BlogView",
    component: BlogView
  },
  messageBoard: {
    path: "/messageboard",
    name: "MessageBoard",
    component: MessageBoard
  },
  aboutMe: {
    path: "/aboutme",
    name: "AboutMe",
    component: AboutMe
  }
};

export default routes;
