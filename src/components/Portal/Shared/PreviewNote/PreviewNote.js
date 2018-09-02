import {Emit, Prop, Component, Vue} from 'vue-property-decorator';

@Component()
export default class PreviewNote extends Vue {
  showPreview = false;

  @Prop({default: null})
  note;

  @Emit()
  editNote(note) {}

  hide() {
    this.showPreview = false;
  }

  show() {
    this.showPreview = true;
  }
}
