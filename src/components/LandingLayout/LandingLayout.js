import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation/Navigation.vue';
import Footer from '@/components/Footer/Footer.vue';

@Component({
  components: {Navigation, Footer}
})
export default class LandingLayout extends Vue {
}
