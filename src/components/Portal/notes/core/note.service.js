import http from '@/services/http';
import environment from '@/services/environment';

const api = {
  getPublicNote: (id) => environment.getEndpoint(`note/public/${id}`),
  getNote: (id) => environment.getEndpoint(`note/${id}`),
  getNotes: () => environment.getEndpoint(`note`),
  getNotesPaged: (page, size) => environment.getEndpoint(`note/${page}/${size}`),
  searchNotesPaged: (term, page, size) => environment.getEndpoint(`note//search/${term}/${page}/${size}`),
  saveNote: () => environment.getEndpoint(`note`),
  deleteNote: (id) => environment.getEndpoint(`note/${id}`),
  createPinnedNote: () => environment.getEndpoint(`note/pin`),
  createFavoriteNote: () => environment.getEndpoint(`note/favorite`),
  archiveNote: () => environment.getEndpoint(`note/archive`),
  duplicateNote: () => environment.getEndpoint(`note/duplicate`),
  shareNote: () => environment.getEndpoint(`note`)
};

class NoteService {
  getNote(id) {
    return http.get(api.getNote(id));
  }

  getNotes() {
    http.get(api.getNotes())
      .then((result) => {
        this.notesResult = result.data;
      });
  }

  updateNote(note) {
    return http.put(api.saveNote(), note);
  }

  saveNote(note) {
    return http.post(api.saveNote(), note);
  }

  deleteNote(id) {
    return http.delete(api.deleteNote(id));
  }

  createPinnedNote(note) {
    return http.put(api.createPinnedNote(), note);
  }

  createFavoriteNote(note) {
    return http.put(api.createFavoriteNote(), note);
  }

  archiveNote(note) {
    return http.put(api.archiveNote(), note);
  }

  duplicateNote(note) {
    return http.post(api.duplicateNote(), note);
  }

  shareNote(note) {
    return http.put(api.shareNote(), note);
  }
}

export default new NoteService();
