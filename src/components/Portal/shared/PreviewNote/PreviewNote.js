import {Emit, Prop, Component, Vue} from 'vue-property-decorator';
import hljs from 'highlight.js';

@Component()
export default class PreviewNote extends Vue {
  showPreview = false;

  @Prop({
    type: Object,
    default: () => { return {}; }
  })
  note;

  @Emit()
  editNote(note) {}

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
