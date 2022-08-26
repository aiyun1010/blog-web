export const setAppMode = (state, payload) => {
  state.appMode = payload.appMode;
};
export const setAppTheme = (state, payload) => {
  state.appTheme = payload.appTheme;
};
export const setSearchText = (state, payload) => {
  state.searchText = payload.searchText;
};
export const setInputValue = (state, payload) => {
  state.inputValue = payload.inputValue;
};
export const setCurrentBlog = (state, { type, payload }) => {
  state.currentBlog = payload;
};
export const setBlogCurrentPage = (state, { type, payload }) => {
  state.blogCurrentPage = payload;
};
export const setBlogList = (state, { type, payload }) => {
  state.blogList = payload;
};

export const setMessageList = (state, { type, payload }) => {
  state.messageList = payload;
};

export const setTagList = (state, { type, payload }) => {
  state.tagList = payload;
};
