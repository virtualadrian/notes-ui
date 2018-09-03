<style lang="scss"></style>
<template>
  <v-flex xs12 sm12>
    <v-card color="transparent" flat>
      <v-container fluid grid-list-xl>
        <v-layout row wrap>
          <v-flex v-for="note in notes" :key="note.id" xs4>

            <!--<note-card :note="note"></note-card>
            @pin-note="pinNote"
                      @edit-note="editNote" @delete-note="confirmDeleteNote"
                      @create-cards-from-note="createCards"
                      @create-snippet-fromnnote="createSnippet"
                      @create-favorite-note="createFavorite" @share-note="createSharedNote"
                      @duplicate-note="duplicateNote" @archive-note="archiveNote"

            -->

            <note-card :note="note" @view-note="viewNote"

            ></note-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>
<script>
import {Emit, Prop, Component, Vue} from 'vue-property-decorator';
import NoteCard from '@/components/Portal/Shared/NoteCard/NoteCard.vue';

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
</script>
