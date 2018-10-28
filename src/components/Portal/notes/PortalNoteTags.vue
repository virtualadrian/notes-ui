<template>
  <v-container class="note-tags-container" fluid>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="primary" dark>
            <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
            <v-toolbar-title>Browse/Filter Tags</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon><v-icon>view_module</v-icon></v-btn>
            <v-btn icon><v-icon>list</v-icon></v-btn>
          </v-toolbar>

          <v-list subheader>
            <v-subheader>Select one or more tags to filter your notes</v-subheader>
            <v-list-tile class="tag-filter">
              <template v-for="(tag, index) in noteTagList"  >
                  <v-chip color="secondary"  text-color="white" @click="toggleTag(tag)" :key="`tag-${index}`">
                    <v-avatar v-if="isTagSelected(tag)">
                      <v-icon>check_circle</v-icon>
                    </v-avatar>
                    {{tag}}
                  </v-chip>
                </template>
            </v-list-tile>
          </v-list>

          <v-list subheader>
            <v-subheader>Notes tagged with: &nbsp; <strong>{{selectedTags.join(', ')}}</strong></v-subheader>
            <template v-for="note in noteListForTags">
              <section :key="note.id">
                <v-divider ></v-divider>
                <v-list-tile >
                  <v-list-tile-action>
                    <v-checkbox color="#333" v-model="note.selected"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content @click.prevent="note.selected = !note.selected">
                    <v-list-tile-title>{{note.noteTitle}}</v-list-tile-title>
                    <v-list-tile-sub-title>Tags: {{note.noteTags}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn @click="previewTagNote(note)" icon><v-icon>remove_red_eye</v-icon></v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn :to="{ name: 'NoteDetail', params: { id: note.id }}" icon><v-icon>edit</v-icon></v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn @click="archiveTagNote(note)" icon><v-icon>archive</v-icon></v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </section>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <preview-note ref="previewDialog"></preview-note>
  </v-container>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import {mapActions, mapGetters, mapMutations} from 'vuex';
import _ from 'lodash';
import PreviewNote from '@/components/Portal/shared/PreviewNote.vue';

@Component({
  components: {
    'preview-note': PreviewNote
  },
  computed: {
    ...mapGetters('noteStore', ['noteTagList', 'noteListForTags'])
  },
  methods: {
    ...mapActions('noteStore', ['getNoteTags', 'getNotesForTags', 'archiveNote']),
    ...mapMutations('noteStore', ['setNotesForTags', 'setPreviewNote'])
  }
})
export default class PortalNoteTags extends Vue {
  selectedTags = [];

  mounted() {
    this.getNoteTags();
    this.setNotesForTags([]);
  }

  toggleTag(tag) {
    if (this.isTagSelected(tag)) {
      _.pull(this.selectedTags, tag);
    } else {
      this.selectedTags.push(tag);
    }

    if (this.selectedTags && this.selectedTags.length > 0) {
      this.getNotesForTags(this.selectedTags);
    } else {
      this.setNotesForTags([]);
    }

    this.$forceUpdate();
  }

  previewTagNote(note) {
    this.setPreviewNote(note);
    this.$refs.previewDialog.show();
  }

  archiveTagNote(note) {
    note.archivedTime = new Date();
    this.archiveNote(note);
  }

  isTagSelected(tag) {
    return _.includes(this.selectedTags, tag);
  }
}

</script>
<style scoped lang="scss">
  .note-tags-container {
    padding-top: 0px;
    padding-left: 18px;
    padding-right: 18px;
  }

</style>
