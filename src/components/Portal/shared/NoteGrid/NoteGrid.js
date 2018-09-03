import {Emit, Prop, Component, Vue} from 'vue-property-decorator';
import NoteCard from '@/components/Portal/shared/NoteCard/NoteCard.vue';

@Component({
  components: {'note-card': NoteCard}
})
export default class NotesGrid extends Vue {
  @Prop({
    type: Array,
    default: () => { return []; }
  })
  notes;

  @Emit()
  createCardsFromNote(note) {
    console.log('createCardsFromNote');
  }

  @Emit()
  confirmDeleteNote(note) {}

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
