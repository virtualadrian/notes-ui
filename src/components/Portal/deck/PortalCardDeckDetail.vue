<template>
  <section class="portal-note-detail" id="portalCardDeckDetail">
    <div class="container-fluid">
      <div class="row note-action">
        <div class="col-sm-12 note-title-row">

          <div class="input-group">
            <!-- Name -->
            <div class="input-group-prepend"><span class="input-group-text">Name:</span></div>
            <input type="text" v-model="currentDeck.deckName"
                   class="form-control note-title-input" placeholder="Deck Name">

            <!-- Description -->&nbsp;
            <div class="input-group-prepend"><span class="input-group-text">Description</span></div>
            <input type="text" v-model="currentDeck.deckDescription"
                   class="form-control note-title-input" placeholder="Deck Description" >

            &nbsp;
            <b-button title="Cancel" variant="secondary">Close</b-button>
            &nbsp;
            <b-button  v-shortkey="['ctrl', 's']" @shortkey="saveDeck()" title="Save" variant="success">Save</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>
<script>
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

</script>
<style scoped lang="scss">
  .portal-note-detail {
    height: auto;
  }
  .note-title-row {
    padding-top: 3px;
  }
  .note-action {
    padding: 25px 0 10px 0px;
    margin-top: 0;
    background-color: #f7f7f7;
  }

  .note-title-input {
    font-size: 18px;
  }

  .note-action-back {
    padding: 0;
    text-align: center;
  }

  .note-action-save {
    padding: 0;
    text-align: right;
  }

  .quillWrapper {
    height: 95%;
  }

  .ql-container {
    height: calc(100% - 47px);
  }

  .ql-editor {
    height: calc(100% - 42px);
  }
</style>
