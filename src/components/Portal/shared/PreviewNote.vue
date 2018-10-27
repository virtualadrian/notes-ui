<template>
  <v-layout row justify-center>
    <v-dialog v-model="showPreview" fullscreen hide-overlay transition="dialog-bottom-transition">

      <v-card>

        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="showPreview = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Preview: {{note.noteTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-speed-dial absolute fab top right light open-on-hover v-model="fab"
                        transition="scale-transition"
                        direction="bottom" color="amber" class="mt-4 ml-4">
            <v-btn slot="activator"
                   v-model="fab"
                   color="blue darken-2"
                   dark
                   fab>
              <v-icon>edit</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn fab dark small color="green" @click="addingCard = !addingCard">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo" :to="{name: 'NoteDetail', params: { id: note.id }}">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="red">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-toolbar>

        <v-alert :value="note.isPublic" color="info" icon="new_releases" dismissible>
          Heads up, this note is public. To make it private again, head over to the Edit area.
        </v-alert>

        <vue-draggable-resizable
          v-if="addingCard"
          :active="true" :w="700" :h="120" :y="250" :x="250" :handles="[]"
          drag-handle=".card-detail-drag-handle">
          <v-container fluid>
            <v-layout align-space-between justify-space-around row fill-height>
              <v-flex xs12 sm12>

                <v-card class="elevation-16">
                  <v-toolbar color="blue-grey lighten-5" class="card-detail-drag-handle" light>
                    <v-icon class="drag-card-icon">zoom_out_map</v-icon>

                    <v-toolbar-title>Card Detail</v-toolbar-title>

                  </v-toolbar>

                  <v-card>
                    <v-container
                      fluid
                      grid-list-lg
                    >
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-card>
                            <v-card-title primary-title>
                              <v-text-field v-model="card.question"
                                            label="Term or Question" value="" hint="Clicking + imports selected text">
                                <v-btn slot="prepend" flat solo icon @click="populateQuestion">
                                  <v-tooltip bottom>
                                    <v-icon slot="activator">redo</v-icon>
                                    <span>Import Selection</span>
                                  </v-tooltip>
                                </v-btn>
                              </v-text-field>
                            </v-card-title>
                            <v-card-title primary-title>
                              <v-textarea auto-grow box
                                          v-model="card.answer"
                                          hint="Clicking + imports selected text"
                                          label="Definition or Answer" rows="5">
                                <v-btn slot="prepend" flat solo icon @click="populateAnswer">
                                  <v-tooltip bottom>
                                    <v-icon slot="activator">redo</v-icon>
                                    <span>Import Selection</span>
                                  </v-tooltip>
                                </v-btn>
                              </v-textarea>
                            </v-card-title>
                            <v-divider light></v-divider>
                            <v-card-actions class="pa-3">
                              <v-btn slot="append" outline round color="primary">
                                Add Image
                              </v-btn>
                              <v-spacer></v-spacer>
                              <v-btn slot="append" flat solo icon color="danger" @click="addingCard = !addingCard">
                                <v-icon>close</v-icon>
                              </v-btn>
                              <v-btn slot="append" flat solo icon color="success">
                                <v-icon>check</v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card>

                </v-card>

              </v-flex>
            </v-layout>
          </v-container>
        </vue-draggable-resizable>

        <v-container fluid>
          <v-layout justify-center row>
            <v-flex xs12 sm10>
              <div ref="noteBody" v-html="note.noteBody"></div>

            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>

</template>
<script>
import {Emit, Prop, Component, Vue} from 'vue-property-decorator';
import VueDraggableResizable from 'vue-draggable-resizable';

import hljs from 'highlight.js';

@Component({
  components: {
    'vue-draggable-resizable': VueDraggableResizable
  }
})
export default class PreviewNote extends Vue {
  showPreview = false;
  addingCard = false;
  fab=false;
  card = {question: '', answer: ''};

  @Prop({
    type: Object,
    default: () => { return {}; }
  })
  note;

  @Emit()
  editNote(note) {}

  populateQuestion() {
    this.card.question = window.getSelection().toString();
  }
  populateAnswer() {
    this.card.answer = window.getSelection().toString();
  }

  updated() {
    this.$refs.noteBody.querySelectorAll('code').forEach((el, idx, arr) => {
      hljs.highlightBlock(el);
    });
  }

  hide() {
    this.showPreview = false;
  }

  show() {
    this.showPreview = true;
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

  .drag-card-icon, .card-detail-drag-handle {
    cursor: grab;
    user-select: none;
  }

</style>
