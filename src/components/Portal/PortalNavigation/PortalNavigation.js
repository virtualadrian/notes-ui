import { Component, Vue } from 'vue-property-decorator';
import auth from '@/services/authentication';
import router from '@/router';

@Component
export default class PortalNavigation extends Vue {
  logout () {
    auth.logout();
    router.push('/');
    router.go();
  }
}
