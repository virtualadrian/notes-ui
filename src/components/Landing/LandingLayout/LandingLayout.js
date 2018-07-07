import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Landing/Navigation/Navigation.vue';
import Footer from '@/components/Landing/Footer/Footer.vue';

@Component({
  components: {Navigation, Footer}
})
export default class LandingLayout extends Vue {
}
