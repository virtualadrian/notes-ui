import {Emit, Component, Vue} from 'vue-property-decorator';

@Component()
export default class SaveToolbar extends Vue {
  @Emit()
  saveNote() {};

  @Emit()
  clearNote() {};
}
