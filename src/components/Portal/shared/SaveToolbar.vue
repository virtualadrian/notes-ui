<template>
  <section>
    <v-toolbar light color="accent" class="toolbar-container">
      <v-btn icon light @click.native="clearNote">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title class="title">
          <v-text-field v-model="currentNote.noteTitle" flat label="Title" id="noteTitle" color="primary accent-4"></v-text-field>
      </v-toolbar-title>
      <v-toolbar-title class="tags">
        <v-combobox multiple
                    v-model="tags" label="Tags"
                    append-icon small-chips deletable-chips dense
                    class="tag-input"
                    :search-input.sync="tag"
                    @keyup.tab="insertTag"
                    @paste="insertTag">

        </v-combobox>
      </v-toolbar-title>
      <v-toolbar-title class="private">
          <v-switch color="success" class="note-private-toggle" :label="!currentNote.isPrivate ? 'Public' : 'Private'"
                    v-model="currentNote.isPrivate"></v-switch>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn light flat @click="saveNote">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </section>
</template>
<script>
import {Emit, Component, Vue} from 'vue-property-decorator';
import {mapMutations, mapGetters} from 'vuex';

@Component({
  computed: {
    ...mapGetters('noteStore', ['currentNote'])
  },
  methods: {
    ...mapMutations('noteStore', ['setNoteTags'])
  }
})
export default class SaveToolbar extends Vue {
  @Emit()
  saveNote() {};

  @Emit()
  clearNote() {};

  tag = '';

  get tags() {
    return this.currentNote && this.currentNote.noteTags ? this.currentNote.noteTags.split(',') : [];
  }

  set tags(value) {
    this.setNoteTags(value);
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
}
</script>
<style scoped lang="scss">
  .toolbar-container {
    min-width: 40%;

    .title {
      min-width: 30%;
      max-width: 30%;
      margin-top: 20px;
    }

    .tags {
      min-width: 40%;
      max-width: 40%;
      margin-top: 50px;
    }

    .private {
      margin-top: 24px;
    }
  }
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
</style>
