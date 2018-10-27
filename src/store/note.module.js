import noteService from '@/core/service/note.service';

export default {
  namespaced: true,
  state: {
    notes: [],
    note: {}
  },
  actions: {
    saveNote(context, noteBody) {
      context.state.note.noteBody = noteBody;

      return noteService.saveNote(context.state.note)
        .then(note => context.commit('setNote', note));
    },
    getNotes(context, term) {
      return noteService.getNotes(term)
        .then(notes => context.commit('setNotes', notes));
    },
    clearNote(context) {
      context.commit('setNote', {});
    },
    pinNote(context, note) {
      return noteService.createPinnedNote(note)
        .then((res) => {
          note.pinIndex = res.data.pinIndex;
        });
    },
    createFavoriteNote(context, note) {
      return noteService.createFavoriteNote(note)
        .then((res) => {
          note.favoriteIndex = res.data.favoriteIndex;
        });
    },
    shareNote(context, note) {
      return noteService.shareNote(note).then(() => this.getNotes());
    },
    duplicateNote(context, note) {
      return noteService.duplicateNote(note).then(() => this.getNotes());
    },
    archiveNote(context, note) {
      return noteService.archiveNote(note).then(() => this.getNotes());
    },
    getNoteDetail(context, noteId) {
      return noteService.getNote(noteId)
        .then(detail => {
          context.commit('setNote', detail);
          return detail;
        });
    }
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    setNote(state, detail) {
      state.note = detail;
    },
    setNoteTags(state, tags) {
      state.note.hasChanges = true;
      state.note.noteTags = tags.join(',');
    }
  },
  getters: {
    noteList(state) {
      return state.notes.content;
    },
    currentNote(state) {
      return state.note;
    }
  }
};
