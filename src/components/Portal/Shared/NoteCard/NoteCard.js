import {Emit, Prop, Component, Vue} from 'vue-property-decorator';
import striphtml from '@/shared/filter/striphtml';

@Component({
  filters: {striphtml}
})
export default class NoteCard extends Vue {
  @Prop({
    type: Object,
    default: () => { return {}; }
  })
  note;

  @Emit()
  createCardsFromNote(note) {
    console.log('createCardsFromNote');
  }

  @Emit()
  editNote(note) {}

  @Emit()
  deleteNote(note) {}

  @Emit()
  viewNote(note) {}

  @Emit()
  pinNote(note) {}

  @Emit()
  createSnippetFromNote(note) {}

  @Emit()
  createFavoriteNote(note) {}

  @Emit()
  shareNote(note) {}

  @Emit()
  duplicateNote(note) {}

  @Emit()
  archiveNote(note) {}
}
