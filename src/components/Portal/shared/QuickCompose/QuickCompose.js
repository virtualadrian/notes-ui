import {Emit, Component, Vue} from 'vue-property-decorator';
import { VueEditor } from 'vue2-editor';
import http from '@/services/http';

import environment from '@/services/environment';

const api = {
  saveNote: () => environment.getEndpoint(`note`)
};

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
