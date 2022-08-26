import * as API from "../api";

export const doSetAppMode = ({ commit }, appMode) => {
  commit({
    type: "setAppMode",
    appMode
  });
};
export const doSetAppTheme = ({ commit }, appTheme) => {
  commit({
    type: "setAppTheme",
    appTheme
  });
};

export const doSetInputValue = ({ commit }, inputValue) => {
  commit({
    type: "setInputValue", //对应mutation.js中的getMsg方法
    inputValue
  });
};
export const doSetSearchText = ({ commit, dispatch }, searchText) => {
  commit({
    type: "setSearchText", //对应mutation.js中的getMsg方法
    searchText
  });
  dispatch("doSetInputValue", searchText);
};

//记录当前博客列表页num
export const doSetBlogCurrentPage = ({ commit }, currentPage) => {
  commit({
    type: "setBlogCurrentPage",
    payload: currentPage
  });
};

//获取博客列表
export const doGetBlogList = ({ commit }, params) => {
  return API.doGetBlogList(params).then(res => {
    if (res && Array.isArray(res.data)) {
      commit({
        type: "setBlogList",
        payload: res.data
      });
      return res.data;
    }
    return false;
  });
};

//根据id获取博客
export const doGetBlogById = ({ commit }, id) => {
  API.doGetBlogById(id).then(res => {
    if (res && res.data) {
      commit({
        type: "setCurrentBlog",
        payload: res.data
      });
    }
  });
};

//创建博客
export const doCreateBlog = ({ commit, dispatch }, req) => {
  return API.doCreateBlog(req).then(res => {
    if (res && res.success) {
      // dispatch("doGetBlogById", req._id);
      return res;
    }
  });
};
//更新博客
export const doUpdateBlog = ({ commit, dispatch }, req) => {
  return API.doUpdateBlog(req).then(res => {
    if (res && res.success) {
      // dispatch("doGetBlogById", req._id);
      return res;
    }
  });
};

export const doGetMessageList = ({ commit }, params) => {
  return API.doGetMessageList(params).then(res => {
    if (res && Array.isArray(res.data)) {
      //将message分类
      let newList = [];
      res.data.forEach(item => {
        const parent = newList.find(v => v._id === item.pId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(item);
        } else {
          newList.push(item);
        }
      });
      commit({
        type: "setMessageList",
        payload: newList.reverse()
      });
      return res.data;
    }
    return false;
  });
};

export const doCreateMessage = ({ dispatch }, params) => {
  return API.doCreateMessage(params).then(res => {
    dispatch("doGetMessageList");
    return res;
  });
};

//更新message
export const doUpdateMessage = ({ commit, dispatch }, req) => {
  API.doUpdateMessage(req).then(res => {
    if (res && res.success) {
      dispatch("doGetMessageList");
    }
  });
};

/**
 * 标签
 */
export const doGetTagList = ({ commit, rootState }) => {
  API.doGetTagList().then(res => {
    if (res && Array.isArray(res.data)) {
      const data = res.data;
      data.forEach(item => {
        item.relatedArticles = rootState.blogList.filter(
          v => Array.isArray(v.tags) && v.tags.includes(item.name)
        ).length;
      });
      commit({
        type: "setTagList",
        payload: data.slice(0, 8) //最多显示8个标签
      });
      return data;
    }
    return false;
  });
};

export const doCreateTag = ({ commit, dispatch }, req) => {
  return API.doCreateTag(req).then(res => {
    if (res) {
      dispatch("doGetTagList");
      return res.success;
    }
    return false;
  });
};

export const doUpdateTag = ({ commit, dispatch }, req) => {
  return API.doUpdateTag(req).then(res => {
    if (res) {
      dispatch("doGetTagList");
      return res.success;
    }
    return false;
  });
};
export const doDeleteTag = ({ commit, dispatch }, req) => {
  return API.doDeleteTag(req).then(res => {
    if (res) {
      dispatch("doGetTagList");
      return res.success;
    }
    return false;
  });
};
