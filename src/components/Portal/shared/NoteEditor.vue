<template>
  <v-layout v-resize="onResize">
    <v-flex ref="editorContainer">
      <tinymce id="noteEditor" v-model="currentNote.noteBody" :toolbar2="toolbar2"
               ref="editorBody" :other_options="otherOptions">
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
    tinymce: tinymce
  },
  computed: {
    ...mapGetters('noteStore', ['currentNote'])
  },
  methods: {
    ...mapActions('noteStore', ['getNoteDetail'])
  }
})
export default class NoteEditor extends Vue {
  toolbar2 = 'image | codesample code';
  otherOptions = {
    menubar: 'edit insert view format table tools',
    plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'template paste textcolor colorpicker textpattern imagetools toc help emoticons hr'],
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat',
    external_plugins: {
      'codesample': '/static/script/codesample/plugin.js'
    },
    branding: false,
    file_picker_types: 'image',
    image_title: true,
    automatic_uploads: true,
    images_upload_handler: imageService.handleUpload,
    file_picker_callback: imageService.handleFilePick,
    codesample_content_css: '/static/style/prism.css',
    codesample_languages: [{ text: 'HTML/XML', value: 'markup' },
      { text: 'Apacheconf', value: 'apacheconf' },
      { text: 'CSS', value: 'css' },
      { text: 'C', value: 'c' },
      { text: 'Clojure', value: 'clojure' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' },
      { text: 'Go', value: 'go' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'Java', value: 'java' },
      { text: 'Json', value: 'json' },
      { text: 'Docker', value: 'docker' },
      { text: 'Perl', value: 'perl' },
      { text: 'PHP', value: 'php' },
      { text: 'Powershell', value: 'powershell' },
      { text: 'Python', value: 'python' },
      { text: 'Ruby', value: 'ruby' },
      { text: 'Rust', value: 'rust' },
      { text: 'Sql', value: 'sql' },
      { text: 'Typescript', value: 'typescript' }
    ]
  };

  @Watch('currentNote')
  noteUpdated() {
    this.currentNote.hasChanges = true;
  }

  created() {
    this.getNoteDetail(this.$route.params.id)
      .then(() => {
        setTimeout(this.onResize, 200);
      });
  }

  onResize() {
    if (window.tinymce && window.tinymce.activeEditor) {
      this.windowSize = {
        x: this.$refs.editorContainer.clientWidth,
        y: window.innerHeight - 300
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
