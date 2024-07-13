import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  switch (action.type) {
    case "DELETE_POST":
      newPostList = currPostList.filter(
        (post) => post.id !== action.payload.postId
      );
      break;
    case "ADD_POST":
      newPostList = [action.payload, ...currPostList];
      break;
    case "ADD_INITIAL_POST":
      newPostList = action.payload.posts;
      break;
    default:
      break;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions,
        userId,
        tags,
      },
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: { posts },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, addInitialPosts }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
