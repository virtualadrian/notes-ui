<template>
  <v-card>
    <v-toolbar card prominent color="blue-grey lighten-5">
      <v-toolbar-title class="subheading grey--text text--darken-1">{{note.noteTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="pinNote(note)">
        <i :pinned="!!note.pinIndex" class="fas fa-thumbtack notepin"></i>
      </v-btn>
    </v-toolbar>
    <!--<v-textarea auto-grow color="white" solo flat readonly height="120"-->
    <!--:value="noteText">-->
    <!--</v-textarea> -->
    <v-card-title primary-title class="notebody" >
      <div>
        <span class="grey--text text--darken-2">{{this.note.noteBody.substring(0, 220).concat('...') | striphtml}}</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-toolbar solo flat dense color="transparent">

        <v-tooltip bottom>
          <v-btn icon slot="activator" dark @click="archiveNote(note)">
            <v-icon color="secondary">archive</v-icon>
          </v-btn>
          <span>Archive</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn icon slot="activator" dark @click="viewNote(note)">
            <v-icon color="primary">remove_red_eye</v-icon>
          </v-btn>
          <span>Note Preview</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator" dark @click="createFavoriteNote(note)">
            <v-icon
              :large.sync="!!note.favoriteIndex"
              :color.sync="note.favoriteIndex ? 'amber darken-2' : 'primary'"
            >star
            </v-icon>
          </v-btn>
          <span>Add Favorite</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator" dark :to="{ name: 'NoteDetail', params: { id: note.id }}">
            <v-icon color="primary">edit</v-icon>
          </v-btn>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator" dark @click="duplicateNote(note)">
            <v-icon color="primary">library_add</v-icon>
          </v-btn>
          <span>Duplicate</span>
        </v-tooltip>

      </v-toolbar>
    </v-card-actions>
  </v-card>
</template>
<script>
import {Emit, Prop, Component, Vue} from 'vue-property-decorator';
import striphtml from '@/global/filter/striphtml';

@Component({
  filters: {striphtml}
})
export default class NoteCard extends Vue {
  @Prop({
    type: Object,
    default: () => { return {}; }
  })
  note;

  notifications = false;
  sound = true;
  widgets = false;
  isPrivate = true;

  @Emit()
  createCardsFromNote(note) {
    console.log('createCardsFromNote');
  }

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
<style lang="scss">
  i[pinned].notepin {
    transform: rotate(45deg);
  }
  .notepin {
    color: #000!important;
    cursor: hand;
  }

  .notebody {
    height: 150px !important;
  }

</style>
