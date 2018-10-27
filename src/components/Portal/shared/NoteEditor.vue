<template>
  <v-layout v-resize="onResize">
    <v-flex>
      <tinymce id="noteEditor" v-model="noteBody"
               :toolbar2="'codesample'" ref="editorBody" :other_options="otherOptions">
      </tinymce>
    </v-flex>
  </v-layout>
</template>
<script>
import {Watch, Component, Vue} from 'vue-property-decorator';
import tinymce from 'vue-tinymce-editor';
import {mapGetters, mapActions} from 'vuex';
import imageService from '@/core/service/image.service';

@Component({
  components: {
    tinymce
  },
  computed: {
    ...mapGetters('noteStore', ['currentNote'])
  },
  methods: {
    ...mapActions('noteStore', ['getNoteDetail'])
  }
})
export default class NoteEditor extends Vue {
  otherOptions = {
    codesample_content_css: '/static/style/prism.css',
    menubar: 'edit insert view format table tools',
    branding: false,
    file_picker_types: 'image',
    image_title: true,
    automatic_uploads: true,
    images_upload_handler: imageService.handleUpload,
    file_picker_callback: imageService.handleFilePick
  };
  noteBody = '';

  @Watch('noteBody')
  noteBodyChanged(value) {
    this.currentNote.noteBody = value;
  }

  mounted() {
    const $vm = this;
    this.getNoteDetail(this.$route.params.id)
      .then(() => {
        $vm.noteBody = $vm.currentNote.noteBody;
        setTimeout(this.onResize, 200);

        window.tinymce.activeEditor.execCommand('mceRepaint');
      });
  }

  onResize() {
    if (window.tinymce && window.tinymce.activeEditor) {
      this.windowSize = {
        x: this.$refs.editorBody.$el.clientWidth,
        y: window.innerHeight - 440
      };
      window.tinymce.activeEditor.theme.resizeTo(this.windowSize.x, this.windowSize.y);
    }
  }

  getNoteSaveBody() {
    return window.tinymce.activeEditor.save();
  }

  hasChanges() {
    return window.tinymce.activeEditor.isDirty() || this.currentNote.hasChanges;
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
