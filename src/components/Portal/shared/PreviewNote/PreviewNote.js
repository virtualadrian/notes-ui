import {Emit, Prop, Component, Vue} from 'vue-property-decorator';
import VueDraggableResizable from 'vue-draggable-resizable'

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
