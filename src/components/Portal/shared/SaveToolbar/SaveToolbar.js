import {Emit, Prop, Component, Vue} from 'vue-property-decorator';

@Component()
export default class SaveToolbar extends Vue {
  @Prop({default: false})
  hasChanges;
  saveDialog = false;

  @Emit()
  saveChanges(note) {};

  @Emit()
  clearChanges() {};

  cancelChanges() {
    this.clearChanges();
    this.saveDialog = false;
    this.note = null;
  }

  close() {
    if (!this.hasChanges) {
      this.note = null;
    }
    this.saveDialog = this.hasChanges;
  }
}
