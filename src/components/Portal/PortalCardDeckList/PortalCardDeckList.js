import {Component, Vue} from 'vue-property-decorator';
import {Quill, VueEditor} from 'vue2-editor';
import http from '@/services/http';
import auth from '@/services/authentication';
import environment from '@/services/environment';
import {ImageDrop} from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

const api = {
  getDecks: () => environment.getEndpoint(`carddeck`),
  saveDeck: () => environment.getEndpoint(`carddeck`),
  deleteDeck: (id) => environment.getEndpoint(`carddeck/${id}`)
};

@Component({
  components: {VueEditor}
})
export default class PortalCardDeckList extends Vue {
  decks = {};
  deletingDeck = {};
  currentDeck = {};

  get currentUserFirstName() {
    return auth.getCurrentUserFirstName();
  }

  get adding() {
    return this.$store.state.portal.addNewCardDeck;
  }

  mounted() {
    this.getDecks();
    // .then(() => {
    //   if (this.action === 'add') {
    //
    //   }
    // });
  }

  getDecks() {
    http.get(api.getDecks())
      .then((result) => {
        this.decks = result.data;
      });
  }

  toggleDeleteConfirm(deck) {
    this.deletingDeck = deck;
    if (deck) {
      this.$refs.deleteDeck.show();
    } else {
      this.$refs.deleteDeck.hide();
    }
  }

  deleteDeck() {
    if (!this.deletingDeck) { return; }
    http.delete(api.deleteDeck(this.deletingDeck.id))
      .then(() => {
        this.$refs.deleteDeck.hide();
        this.$toastr.s('Deck has been removed.');
        this.getDecks();
      });
  }

  toggleMaintain(deck) {
    this.currentDeck = deck || {};
    this.$refs.manageDeck.show();
  }

  saveDeck() {
    const save = (this.currentDeck.id >= 0)
      ? http.put(api.saveDeck(), this.currentDeck)
      : http.post(api.saveDeck(), this.currentDeck);

    return save.then((response) => {
      this.currentDeck.deckName = response.data.deckName;
      this.currentDeck.deckDescription = response.data.deckDescription;
      this.$refs.manageDeck.hide();
      this.currentDeck = {};
    });
  }

  saveCancel() {
    this.currentDeck = {};
    this.$refs.manageDeck.hide();
  }
}
