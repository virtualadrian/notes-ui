import { Component, Vue } from 'vue-property-decorator';
import auth from '@/services/authentication';
import router from '@/router';
import fab from 'vue-fab';

@Component({
  components: {fab}
})
export default class PortalNavigation extends Vue {
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

  addNewNote() {
    router.push({name: 'PortalNoteDetail'});
  }

  addNewCardDeck() {
    router.push({name: 'PortalShareNote'});
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
