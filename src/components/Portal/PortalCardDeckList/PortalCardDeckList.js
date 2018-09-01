import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import auth from '@/services/authentication';
import environment from '@/services/environment';

const api = {
  getDecks: () => environment.getEndpoint(`carddeck`),
  saveDeck: () => environment.getEndpoint(`carddeck`),
  deleteDeck: (id) => environment.getEndpoint(`carddeck/${id}`)
};

@Component()
export default class PortalCardDeckList extends Vue {
  decks = [];
  deletingDeck = {};
  currentDeck = {};

  get currentUserFirstName() {
    return auth.getCurrentUserFirstName();
  }

  mounted() {
    this.getDecks();
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
      if (this.currentDeck.id >= 0) {
        this.currentDeck.deckName = response.data.deckName;
        this.currentDeck.deckDescription = response.data.deckDescription;
      } else {
        this.decks.push(response.data);
      }
      this.$refs.manageDeck.hide();
      this.currentDeck = {};
      this.$store.commit('isAddNewCardDeck', false);
    });
  }

  saveCancel() {
    this.currentDeck = {};
    this.$refs.manageDeck.hide();
  }
}
