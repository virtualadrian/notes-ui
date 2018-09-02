import { Component, Vue } from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';

import SaveToolbar from '@/components/Portal/Shared/SaveToolbar/SaveToolbar.vue';
import PortalNoteMeta from '@/components/Portal/PortalNoteMeta/PortalNoteMeta.vue';

const api = {
  getNote: (id) => environment.getEndpoint(`note/${id}`),
  getEditorImage: (userId, name) => environment.getS3Endpoint(`/images/${userId}/${name}`),
  saveNote: () => environment.getEndpoint(`note`)
};

@Component({
  components: {
    'save-toolbar': SaveToolbar,
    'note-meta': PortalNoteMeta
  }
})
export default class PortalNoteDetails extends Vue {
  note = {};
  hasChanges = false;

  mounted() {
    this.loadNoteDetail();
  }

  loadNoteDetail() {

  }

  getNoteDetail() {
    if (!this.currentNote.id) { return; }
    return http.get(api.getNote(this.currentNote.id));
  }
}
