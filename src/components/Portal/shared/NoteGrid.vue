<template>
<v-flex xs12 sm12>
  <v-card color="transparent" flat>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>

        <v-flex v-for="note in notes" :key="note.id" xs12 sm6 md4>

          <note-card :note="note" @view-note="viewNote" @pin-note="pinNote"
                     @delete-note="deleteNote" @create-cards-from-note="createCardsFromNote"
                     @create-snippet-fromnnote="createSnippetFromNote"
                     @create-favorite-note="createFavoriteNote" @share-note="shareNote"
                     @duplicate-note="duplicateNote" @archive-note="archiveNote">
          </note-card>

        </v-flex>

      </v-layout>
    </v-container>
  </v-card>
</v-flex>
</template>
<script>
import {Emit, Prop, Component, Vue} from 'vue-property-decorator';
import NoteCard from '@/components/Portal/shared/NoteCard.vue';

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

</script>
<style lang="scss"></style>
