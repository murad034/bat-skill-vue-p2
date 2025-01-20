import { createStore } from "vuex";
import moment from "moment";

const postModule = {
  // state(){
  //     return {
  //         userName: "Rafiqul Islam Murad"
  //     }
  // },
  namespaced: true,
  state: {
    userName: "Rafiqul Islam Murad",
    posts: [
      {
        id: 1,
        title: "Post 1",
        content:
          "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        likes: 0,
        comments: [
          {
            id: 1,
            content: "This is a comment.",
            user: "John Doe",
            date: "2024-05-24 11:00:00",
          },
        ],
        newComment: "",
        commentSection: true,
        date: "2024-05-24 11:00:00",
      },
      {
        id: 2,
        title: "Post 2",
        content:
          "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        likes: 0,
        comments: [],
        commentSection: false,
        newComment: "",
        date: "2023-05-24 11:00:00",
      },
      {
        id: 3,
        title: "Post 3",
        content:
          "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        likes: 3,
        comments: [],
        commentSection: true,
        newComment: "",
        date: "2022-05-24 11:00:00",
      },
    ],
    postTitle: "",
    postContent: "",
  },

  getters: {
    getPosts(state) {
      return state.posts;
    },
    getPostTitle(state) {
      return state.postTitle;
    },
    getPostContent(state) {
      return state.postContent;
    },
  },

  mutations: {
    // createPost(state, { title, content }) {
    createPost(state) {
      const post = {
        id: state.posts.length + 1,
        // title: title,
        title: state.postTitle,
        // content: content,
        content: state.postContent,
        likes: 0,
        comments: [],
        newComment: "",
        commentSection: true,
        //date: new Date(),
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      state.posts.push(post);
      state.postTitle = "";
      state.postContent = "";
    },
    // async addComment(state, payload) {
    async addComment(state, { postId, comment }) {
      //   const postId = payload.postId;
      //   const comment = payload.comment;
      const post = state.posts.find((post) => post.id === postId);
      //   console.log(comment, state.userName);
      post.comments.push(comment);
      post.commentSection = true;
    },
    updatePostTitle(state, title) {
      console.log("title");
      console.log(title);
      state.postTitle = title;
    },
    updatePostContent(state, content) {
      state.postContent = content;
    },
  },

  actions: {
    async addComment({ state, rootState, commit }, { postId, comment }) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      comment.user = rootState.userName;
      commit("addComment", {
        postId: postId,
        comment: comment,
      });
    },
  },
};

export default postModule;
