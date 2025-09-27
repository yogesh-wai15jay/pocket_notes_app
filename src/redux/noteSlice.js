import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentActiveGroup: null,
  groups: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    changeCurrentActiveGroup: (state, action) => {
      state.currentActiveGroup = action.payload;
    },

    createGroup: (state, action) => {
      const { groupName, groupColor } = action.payload;

      const shortName = groupName
        .split(" ")
        .reduce((response, word) => response + word.slice(0, 1), "")
        .toUpperCase()
        .slice(0, 2);

      const newGroup = state.groups;
      newGroup.unshift({
        id: Date.now(),
        groupName: groupName.trim(),
        groupShortName: shortName,
        groupColor,
        notes: [],
      });

      state.currentActiveGroup = newGroup[0].id;
    },

    createNote: (state, action) => {
      const { content, groupId } = action.payload;
      const date = new Date();
      const time = date.toLocaleTimeString('en-IN');

      const group = state.groups.find((g) => g.id === groupId);
      group?.notes.unshift({
        id: Date.now(),
        content,
        date: date.toDateString().slice(4),
        time: time.slice(0, 5) + time.slice(-3),
      });
    },

    deleteNote: (state, action) => {
      const { noteId, groupId } = action.payload;

      const group = state.groups.find((g) => g.id === groupId);

      const notes = group.notes;
      notes.splice(
        notes.findIndex((note) => note.id === noteId),
        1
      );
    },

    editNote: (state, action) => {
      const { noteId, groupId, content } = action.payload;

      const group = state.groups.find((g) => g.id === groupId);
      const note = group.notes.find((note) => note.id === noteId);
      note.content = content;
    },

    deleteGroup: (state, action) => {
      const { groupId } = action.payload;

      state.groups.splice(
        state.groups.findIndex((grp) => grp.id === groupId),
        1
      );

      state.currentActiveGroup = null;
    },
  },
});

export const {
  changeCurrentActiveGroup,
  createGroup,
  createNote,
  deleteNote,
  editNote,
  deleteGroup,
} = noteSlice.actions;

export default noteSlice.reducer;
