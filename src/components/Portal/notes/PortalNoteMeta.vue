<template>
  <section>
    <v-container fluid>
      <v-layout row>

        <!-- S:TITLE -->
        <v-flex xs5 sm6>
          <v-text-field
            v-model="note.noteTitle"
            label="Note Title" id="noteTitle" color="primary accent-4"></v-text-field>
        </v-flex>
        <!-- E:TITLE -->

        <v-spacer></v-spacer>

        <!-- S:TAGS -->
        <v-flex xs5 sm5>
          <v-combobox multiple
                      v-model="tags" label="Tags"
                      append-icon chips small-chips deletable-chips
                      class="tag-input"
                      :search-input.sync="tag"
                      @keyup.tab="insertTag"
                      @paste="insertTag">

          </v-combobox>
        </v-flex>
        <v-flex xs1 sm1>
          <v-switch label="Private" color="success" class="note-private-toggle"
                    v-model="note.isPrivate"></v-switch>
        </v-flex>
        <!-- E:TAGS -->
      </v-layout>
    </v-container>
  </section>

</template>
<script>
import {Prop, Component, Vue} from 'vue-property-decorator';

@Component()
export default class PortalNoteMeta extends Vue {
  tag = '';

  @Prop({
    type: Object,
    default: () => { return {}; }
  })
  note;

  get tags() {
    return this.note && this.note.noteTags ? this.note.noteTags.split(',') : [];
  }

  set tags(value) {
    this.note.hasChanges = true;
    this.note.noteTags = value.join(',');
  }

  insertTag() {
    if (!this.tag) { return; }
    this.$nextTick(() => {
      this.tags.concat(...this.tag.split(','));
      this.$nextTick(() => {
        this.tag = '';
      });
    });
  }

  getNoteTags() {
    return this.tags.join(',');
  }

  getNoteTitle() {
    return this.note.noteTitle;
  }

  getNoteIsPrivate() {
    return this.note.isPrivate;
  }
}

</script>
<style lang="scss">
  .portal-notes {

    .pinned {
      transform: rotate(45deg);
    }

    #noteTitle, #noteBody {
      color: #656565!important;
    }
    #noteTitle {
      font-size: 20px;
      font-weight: bolder;
    }

  }

  .quick-compose {
    background-color: #808598!important;
    color: #ffffff!important;;
  }

  .v-expansion-panel__header__icon .v-icon {
    color: #ffffff !important;
  }

  .quick-compose .qc-header {
    background-color: transparent!important;
    font-size: 18px;
  }

  .note-private-toggle label {
    top: 5px!important;
  }

  .tag-input span.chip, .tag-input span.v-chip {
    background-color: #1976d2;
    color: #fff;
    padding-left:7px;
  }

  .tag-input span.chip::before, .tag-input span.v-chip::before {
    content: "label";
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 1em;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

</style>
