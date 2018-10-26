<template>
  <!-- QUICK NOTE FORM -->
  <v-expansion-panel>
    <v-expansion-panel-content class="quick-compose"
                               :expand-icon="isComposeVisible ? 'mdi-chevron-up' : 'mdi-chevron-down'">
      <div class="qc-header" slot="header" @click="isComposeVisible=!!isComposeVisible">Quick Compose</div>
      <v-card>
        <v-form>

          <v-text-field label="Title" single-line full-width hide-details ></v-text-field>
          <hr/>
          <div id="editorWrap">
            <vue-editor
              :editorOptions="editorSettings"
              ref="quickComposeEditor"
              v-model="note.noteBody"></vue-editor>
          </div>



          <v-toolbar dark dense color="#ffc107">
            <v-btn round color="accent--text text--lighten1" icon  @click="composing = false">
              <v-icon>close</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn round color="accent--text text--lighten1" icon @click="save()">
              <v-icon>save</v-icon>
            </v-btn>
          </v-toolbar>

        </v-form>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

</template>
<script>
  import {Emit, Component, Vue} from 'vue-property-decorator';
  import { VueEditor } from 'vue2-editor';
  // import http from '@/services/http';

  // import environment from '@/services/environment';

  // const api = {
  //   saveNote: () => environment.getEndpoint(`note`)
  // };

  @Component({
    components: {'vue-editor': VueEditor}
  })
  export default class QuickCompose extends Vue {
    isComposeVisible = false;
    note = {};
    editor = {
      dirty: false
    };
    editorSettings = {
      editorOptions: 'editorWrap'
    };

    composing = false;

    @Emit
    saveChanges(note) {}

    @Emit
    clearChanges(note) {}
  }

</script>
<style lang="scss">
  .ql-toolbar {
    position: absolute;
    z-index: 99999;
    bottom: 0;
    width: 90%;
    background-color: #ffc107c4;
    left: 60px;
    border: 0!important;
  }
  .quillWrapper {
    height: 275px!important;
  }
  #editorWrap {
    height: 275px!important;;
  }
</style>
