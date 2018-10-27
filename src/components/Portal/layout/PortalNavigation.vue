<template>
  <section class="portal-navigation">
    <!-- START NAVBAR -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark app-header-nav-wrap">
      <div class="container">
        <!-- LOGO -->
        <router-link class="navbar-brand logo" :to="{name: 'Notes'}">
          <i class="zmdi zmdi-book"></i> <span>noteler</span>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <i class="zmdi zmdi-menu"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="nav navbar-nav navbar-right ml-auto">

            <!-- notes -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Notes
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="nav-link" :to="{name: 'PortalNotes'}">View All</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(0)" v-on:click="showSearch">Search</a>
              </div>
            </li>

            <!-- study -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Study
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="nav-link dropdown-item" :to="{name: 'PortalCardDeckList'}">Flash Cards</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Study Session</a>
              </div>
            </li>

            <!-- account -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Account
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Profile</a>
                <a class="dropdown-item" href="#">Settings</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Help</a>
              </div>
            </li>

            <li class="nav-item">
              <a href="javascript:void(0)" v-on:click="logout()"
                 class="btn btn-inverse btn-bordered navbar-btn nav-link">Logout</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <!-- END NAVBAR -->
    <fab :actions="fabActions"
         @addNewNote="addNewNote"
         @addNewCardDeck="addNewCardDeck"
         @studySession="studySession"
         v-if="$route.path.indexOf('/portal/note/edit') < 0"
         :bg-color="'#9c27b0'" :ripple-color="'light'" :z-index="'99999'" :position="'bottom-right'"></fab>

    <b-modal id="modal-center" ref="noteSearch" centered @shown="$refs.noteSearchTerm.focus()" :title="'Search Notes'">
      <input type="text"
             v-on:keyup.enter="searchNotes"
             v-model="noteSearch.term"
             class="form-control form-control-lg note-title-input"
             ref="noteSearchTerm"
             placeholder="Search Notes For ...">
      <div slot="modal-footer" class="text-center w-100">
        <b-btn @click="searchNotes" class="btn btn-primary btn-shadow btn-rounded">Search</b-btn>
      </div>
    </b-modal>

    <div class="invisible" id="shortcuts">
      <b-btn @click="addNewNote"
             v-shortkey="['ctrl', 'n']" @shortkey="addNewNote()"
             class="btn btn-primary btn-shadow btn-rounded">New Note</b-btn>
      <b-btn @click="showSearch"
             v-shortkey="['shift', 'space']" @shortkey="showSearch()"
             class="btn btn-primary btn-shadow btn-rounded">Search</b-btn>
    </div>
  </section>

</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import auth from '@/global/services/authentication';
import router from '@/router';
import fab from 'vue-fab';

@Component({
  components: {fab}
})
export default class PortalNavigation extends Vue {
  noteSearch = {
    term: ''
  };
  fabActions = [
    {
      name: 'studySession',
      icon: 'schedule',
      tooltip: 'Start Study Session',
      color: '#007bff'
    },
    {
      name: 'addNewCardDeck',
      icon: 'flip_to_back',
      tooltip: 'Add Card Deck',
      color: '#007bff'
    },
    {
      name: 'addNewNote',
      icon: 'notes',
      tooltip: 'Add New Note',
      color: '#007bff'
    }
  ];

  showSearch() {
    this.$refs.noteSearch.show();
  }

  searchNotes() {
    this.$refs.noteSearch.hide();
    router.push({name: 'PortalSearchNote',
      params: {
        term: this.noteSearch.term,
        page: 1,
        size: 10
      }});
  }

  addNewNote() {
    router.push({name: 'PortalNoteDetail'});
  }

  addNewCardDeck() {
    router.push({name: 'PortalCardDeckDetail'});
  }

  studySession() {
    console.log('study study');
  }

  logout() {
    auth.logout();
    router.push('/');
    // force refresh if logging out from homepage
    if (router.currentRoute.name === 'Home') {
      router.go();
    }
  }
}

</script>
<style scoped lang="scss">
  .portal-navigation {
    height: 92px;
    background-color: #dbdbdb;
  }

</style>
