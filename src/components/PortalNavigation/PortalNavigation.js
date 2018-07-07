import { Component, Vue } from 'vue-property-decorator';
import auth from '@/services/auth';
import router from '@/router';

@Component
export default class PortalNavigation extends Vue {
  mounted () {

  }

  logout () {
    auth.logout();
    router.push('/');
  }
}
