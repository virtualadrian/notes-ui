import noteService from '@/core/service/note.service';

export default {
  namespaced: true,
  state: {
    notes: [],
    note: {},
    tags: [],
    notesForTags: [],
    term: '',
    previewNote: {}
  },
  actions: {
    saveNote(context, noteBody) {
      context.state.note.noteBody = noteBody;

      return noteService.saveNote(context.state.note)
        .then(note => context.commit('setNote', note));
    },
    getNotes(context, term) {
      context.commit('setTerm', term);
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
      return noteService.shareNote(note)
        .then(() => {
          return noteService.getNotes(context.state.term)
            .then(notes => context.commit('setNotes', notes));
        });
    },
    duplicateNote(context, note) {
      return noteService.duplicateNote(note)
        .then(() => {
          return noteService.getNotes(context.state.term)
            .then(notes => context.commit('setNotes', notes));
        });
    },
    archiveNote(context, note) {
      return noteService.archiveNote(note).then(() => {
        return noteService.getNotes(context.state.term)
          .then(notes => context.commit('setNotes', notes));
      });
    },
    getNoteDetail(context, noteId) {
      return noteService.getNote(noteId)
        .then(detail => {
          context.commit('setNote', detail);
          return detail;
        });
    },
    getNoteTags(context) {
      return noteService.getNoteTags()
        .then(tags => {
          context.commit('setTags', tags);
          return tags;
        });
    },
    getNotesForTags(context, tags) {
      return noteService.getNotesForTags(tags)
        .then(notes => context.commit('setNotesForTags', notes));
    }
  },
  mutations: {
    setTerm(state, term) {
      state.term = term;
    },
    setNotes(state, notes) {
      state.notes = notes;
    },
    setTags(state, tags) {
      state.tags = tags;
    },
    setNotesForTags(state, tags) {
      state.notesForTags = tags;
    },
    setPreviewNote(state, detail) {
      state.previewNote = detail;
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
    noteListForTags(state) {
      return state.notesForTags.filter(note => !note.archivedTime);
    },
    currentNote(state) {
      return state.note;
    },
    noteTagList(state) {
      return state.tags;
    },
    getPreviewNote(state) {
      return state.previewNote;
    }
  }
};
