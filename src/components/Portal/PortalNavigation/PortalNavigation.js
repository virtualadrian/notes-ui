import { Component, Vue } from 'vue-property-decorator';
import auth from '@/services/authentication';
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
