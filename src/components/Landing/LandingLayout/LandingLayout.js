import { Component, Vue } from 'vue-property-decorator';
import PortalNavigation from '@/components/Portal/PortalNavigation/PortalNavigation.vue';
import Navigation from '@/components/Landing/Navigation/Navigation.vue';
import Footer from '@/components/Landing/Footer/Footer.vue';
import auth from '@/services/authentication';

@Component({
  components: {Navigation, PortalNavigation, Footer}
})
export default class LandingLayout extends Vue {
  get headerNavigationComponent() {
    return auth.isLoggedIn() ? 'PortalNavigation' : 'Navigation';
  }
}
