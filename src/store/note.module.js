import Vue from 'vue';
import Component from 'vue-class-component';
import noteService from '@/core/service/note.service';

// import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { State, Mutation, Action, Getter, namespace } from 'vuex-class';

const name = namespace('note');

@Component()
export default class NoteModule extends Vue {
  @name.State notes;
  @name.State note;

  @name.Action
  saveNote() {
    return noteService.saveNote(this.note)
      .then(res => res.data)
      .then(note => this.setNote(note));
  }

  @name.Action
  getNotes() {
    return noteService.getNotes()
      .then(res => res.data)
      .then(notes => this.setNotes(notes));
  }

  @name.Mutation
  setNotes(notes) {
    this.notes = notes;
  }

  @name.Mutation
  setNote(note) {
    this.note = note;
  }

  @name.Getter
  noteList() {
    return this.notes;
  }
}
