import { Component, Vue } from 'vue-property-decorator';
import PortalNavigation from '@/components/Portal/PortalNavigation/PortalNavigation.vue';
import PortalFooter from '@/components/Portal/PortalFooter/PortalFooter.vue';

@Component({
  components: {PortalNavigation, PortalFooter}
})
export default class PortalLayout extends Vue {
}
