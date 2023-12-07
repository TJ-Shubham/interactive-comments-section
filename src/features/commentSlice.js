import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name:"comments",
    initialState:{},
    reducers: {

        addComment: (state, action) => {
          state.comments.push(action.payload);
        },

        updateComment: (state, action) => {
          const { commentId, content } = action.payload;
          const existingComment = state.comments.find((c) => c.id === commentId);
          if (existingComment && existingComment.user.username === state.currentUser.username) {
            existingComment.content = content;
          }
        },

        deleteComment: (state, action) => {
          const commentId = action.payload;
          state.comments = state.comments.filter((c) => c.id !== commentId);
        },

        addReply: (state, action) => {
          const { commentId, reply } = action.payload;
          const existingComment = state.comments.find((c) => c.id === commentId);
          if (existingComment) {
            existingComment.replies.push(reply);
          }
        },

        updateReply: (state, action) => {
          const { commentId, replyId, content } = action.payload;
          const existingComment = state.comments.find((c) => c.id === commentId);
          const existingReply = existingComment.replies.find((r) => r.id === replyId);
          if (existingReply && existingReply.user.username === state.currentUser.username) {
            existingReply.content = content;
          }
        },

        deleteReply: (state, action) => {
          const { commentId, replyId } = action.payload;
          const comment = state.comments.find((c) => c.id === commentId);
          comment.replies = comment.replies.filter((r) => r.id !== replyId);
        },
    },
})

export const { addComment, updateComment, deleteComment, addReply, updateReply, deleteReply } = commentSlice.actions;

export default commentSlice.reducer;