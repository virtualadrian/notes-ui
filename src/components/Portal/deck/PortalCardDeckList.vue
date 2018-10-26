<template>
  <section class="portal-decks section-pad" id="portalNoteDetail">
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <h3>{{currentUserFirstName}}'s Card Decks</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4" v-for="deck in decks">
          <div class="card card-shadow" >
            <div class="card-body">
              <h5 class="card-title">
                <router-link :to="{ name: 'PortalCardDeckDetail', params: { id: deck.id }}">
                  <strong>{{ deck.deckName}}</strong>
                </router-link>
              </h5>
              <p class="card-text">{{ deck.deckName }}</p>
              <p class="card-text"><small class="text-muted">{{deck.createdTime | moment("MMMM Do YYYY, h:mm:ss a") }}</small></p>
            </div>
            <div class="card-footer">
              <button class="btn btn-danger btn-shadow btn-rounded float-sm-left" v-on:click="toggleDeleteConfirm(deck)">
                <i class="zmdi zmdi-delete"></i>
              </button>

              <router-link :to="{ name: 'PortalCardDeckDetail', params: { id: deck.id }}" class="btn btn-success btn-shadow btn-rounded float-sm-right">
                <i class="zmdi zmdi-edit"></i>
              </router-link>
              <span class="float-sm-right">&nbsp;</span>
              <router-link :to="{ name: 'PortalCardDeckDetail', params: { id: deck.id }}" class="btn btn-info btn-shadow btn-rounded float-sm-right">
                <i class="zmdi zmdi-eye"></i>
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>

    <b-modal id="modal-center" ref="deleteDeck"
             @ok="deleteDeck"
             :ok-title="'Delete'"
             :ok-variant="'danger'"
             @cancel="toggleDeleteConfirm()"
             :cancel-title="'Cancel'"
             centered title="Delete this Deck?">
      <p class="my-4">Are you sure you want to delete this deck?</p>
      <p><strong>This will also delete all the cards in the deck!</strong></p>
    </b-modal>

    <b-modal id="modal-center" ref="manageDeck" centered title="Manage Deck" size="lg">
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3"><label class="deck-dtl" for="deckName" >Deck Name:</label></b-col>
          <b-col sm="9">
            <b-form-input id="deckName" name="deckName" v-model="currentDeck.deckName"
                          type="text" placeholder="Deck Name"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3"><label class="deck-dtl" for="deckName">Deck Description:</label></b-col>
          <b-col sm="9">

            <b-form-input id="deckName" name="deckName" v-model="currentDeck.deckDescription"
                          type="text" placeholder="Deck Description"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-btn @click="saveDeck()"
               class="btn btn-success btn-shadow btn-rounded float-sm-right">Save
        </b-btn>
        <span class="float-sm-right"> &nbsp; </span>
        <b-btn @click="saveCancel()"
               class="btn btn-secondary btn-shadow btn-rounded float-sm-right">Cancel
        </b-btn>
      </div>

    </b-modal>
  </section>


</template>
<script>
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

</script>
<style scoped lang="scss">
  .portal-decks {
    .row {
      display: flex;
      flex-wrap: wrap;
    }

    .row > div[class*='col-'] {
      display: flex;
    }

    .card {
      width: 100%;
      margin-top: 20px;
    }
    label {
      &.deck-dtl{
        margin-bottom: 0;
        margin-top: 5px;
      }
    }
  }

</style>
