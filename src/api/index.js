import request from "../utils/request";
const query = { page: 1, limit: 20 };
export const doGetBlogList = query => {
  return request({
    url: "/api/blog/list",
    method: "get",
    params: query
  });
};
export const doGetBlogById = id => {
  return request({
    url: "/api/blog/get",
    method: "get",
    params: { id }
  });
};
export const doCreateBlog = data => {
  return request({
    url: "/api/blog/create",
    method: "post",
    data
  });
};
export const doUpdateBlog = data => {
  return request({
    url: "/api/blog/update",
    method: "put",
    data
  });
};
export const doGetMessageList = () => {
  return request({
    url: "/api/message/messageList",
    method: "get"
  });
};

export const doCreateMessage = data => {
  return request({
    url: "/api/message/createMessage",
    method: "post",
    data
  }).then(res => {
    return res;
  });
};

export const doUpdateMessage = data => {
  return request({
    url: "/api/message/updateMessage",
    method: "put",
    data
  });
};

export const doGetTagList = () => {
  return request({
    url: "/api/tag",
    method: "get"
  });
};
export const doCreateTag = tagName => {
  return request({
    url: "/api/tag",
    method: "post",
    data: { name: tagName }
  });
};
export const doUpdateTag = tag => {
  return request({
    url: "/api/tag",
    method: "put",
    data: tag
  });
};
export const doDeleteTag = id => {
  return request({
    url: "/api/tag",
    method: "delete",
    data: { id }
  });
};
