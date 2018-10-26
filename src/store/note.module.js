import Vue from 'vue';
import Component from 'vue-class-component';

// import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { State, Mutation } from 'vuex-class';

@Component({
  namespaced: true
})
export class NoteModule extends Vue {
  @State notes;
  @State note;

  @Mutation
  setNotes(state, notes) {
    this.notes = notes;
  }
}
