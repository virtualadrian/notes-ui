import { Component, Vue } from 'vue-property-decorator';
import auth from '@/services/authentication';
import router from '@/router';

@Component
export default class PortalNavigation extends Vue {
  logout () {
    auth.logout();
    router.push('/');
    // force refresh if logging out from homepage
    if (router.currentRoute.name === 'Home') {
      router.go();
    }
  }
}
