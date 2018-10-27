import http from '@/global/services/http';
import environment from '@/global/services/environment';

const api = {
  getPublicNote: (id) => environment.getEndpoint(`note/public/${id}`),
  getNote: (id) => environment.getEndpoint(`note/${id}`),
  getNotes: (term) => environment.getEndpoint(`note/filter/${term}`),
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
    return http.get(api.getNote(id)).then(res => res.data);
  }

  getNotes(term) {
    return http.get(api.getNotes(term)).then(res => res.data);
  }

  saveNote(note) {
    const save = (note.id >= 0)
      ? http.put(api.saveNote(), note)
      : http.post(api.saveNote(), note);

    return save
      .then(response => { return response.data; });
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
