import { Component, Vue } from 'vue-property-decorator';
import PortalNavigation from '@/components/PortalNavigation/PortalNavigation.vue';
import PortalFooter from '@/components/PortalFooter/PortalFooter.vue';

@Component({
  components: {PortalNavigation, PortalFooter}
})
export default class PortalLayout extends Vue {
}
