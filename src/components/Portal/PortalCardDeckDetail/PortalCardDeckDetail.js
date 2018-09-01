import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
import http from '@/services/http';
import environment from '@/services/environment';

const api = {
  getDeck: (id) => environment.getEndpoint(`carddeck/${id}`)
  // getEditorImage: (userId, name) => environment.getS3Endpoint(`/images/${userId}/${name}`),
  // saveNote: () => environment.getEndpoint(`note`)
};

@Component()
export default class PortalCardDeckDetail extends Vue {
  currentDeck = {};
  get deckId() {
    return this.$route.params.id;
  }

  mounted() {
    this.loadDeckDetail();
  }

  loadDeckDetail() {
    if (this.deckId) {
      return http.get(api.getDeck(this.deckId))
        .then((resposne) => {
          this.currentDeck = resposne.data;
        });
    }
  }
}
