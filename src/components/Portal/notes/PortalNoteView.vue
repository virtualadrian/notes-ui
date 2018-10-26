<template>
  <section class="portal-note-view">
    <div class="container-fluid" >
      <div class="row note-action">
        <div class="col-sm-2 note-action-back">
          <button @click.native="cancel()" class="btn btn-warning btn-shadow btn-rounded">
            <i class="zmdi zmdi-arrow-back"></i>
          </button>
        </div>
        <div class="col-sm-8 title-box">
          <h2>{{currentNote.noteTitle}}</h2>
        </div>
        <div class="col-sm-2 note-action-edit">
          <button @click="editNote()" class="btn btn-success btn-shadow btn-rounded">
            <i class="zmdi zmdi-edit"></i>
          </button>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <div v-html="currentNote.noteBody"></div>
      </div>
    </div>
  </section>

</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { VueEditor } from 'vue2-editor';
import router from '@/router/index';
import http from '@/services/http';
import environment from '@/services/environment';
import hljs from 'highlight.js';

const api = {
  getNote: (id) => environment.getEndpoint(`note/${id}`)
};

  @Component({
    components: {VueEditor}
  })
export default class PortalNoteView extends Vue {
    currentNote = {id: 0, noteTitle: '', noteBody: ''};
    mounted() {
      this.currentNote.id = this.$route.params.id;
      this.getNoteDetail();
    }

    updated() {
      this.$el.querySelectorAll('.ql-syntax').forEach((el, idx, arr) => {
        hljs.highlightBlock(el);
      });
    }

    cancel() {
      router.push({name: 'PortalNotes'});
    }

    editNote() {
      router.push({name: 'NoteDetail', params: { id: this.currentNote.id }});
    }

    getNoteDetail() {
      if (!this.currentNote.id) { return; }
      http.get(api.getNote(this.currentNote.id))
        .then((response) => {
          this.currentNote = response.data;
        });
    }
  }

</script>
<style scoped lang="scss">
  .portal-note-view {
  }

  .note-action {
    padding: 16px 0;
    margin-bottom: 20px;
    background-color: #f7f7f7;
  }

  .note-action-back {
    padding: 0 24px;
    text-align: left;
  }
  .note-action-edit {
    padding: 0 24px;
    text-align: right;
  }

  .title-box {
    h2 {
      text-align: center;
      margin-top: 5px;
      margin-bottom: 0;
    }
  }
  .hljs {
    padding: 2em !important;
    border-radius: 5px;
  }

</style>
