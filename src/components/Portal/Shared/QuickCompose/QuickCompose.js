import {Emit, Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import TextToolbar from '@/components/Portal/Shared/TextToolbar/TextToolbar.vue';

import environment from '@/services/environment';
const api = {
  saveNote: () => environment.getEndpoint(`note`)
};

@Component({
  components: {'text-toolbar': TextToolbar}
})
export default class QuickCompose extends Vue {
  isComposeVisible = false;
  note = {};

  @Emit()
  openNoteEditor(note) {}

  save() {
    return http.post(api.saveNote())
      .then(result => result.data);
  }

  saveContinueEdit() {
    this.save()
      .then((saved) => {
        this.openNoteEditor(saved);
      });
  }
}
