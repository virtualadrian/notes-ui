import {Prop, Component, Vue} from 'vue-property-decorator';
import PortalNavigation from '@/components/Portal/layout/PortalNavigation/PortalNavigation.vue';
import PortalFooter from '@/components/Portal/layout/PortalFooter/PortalFooter.vue';

@Component({
  components: {PortalNavigation, PortalFooter}
})
export default class PortalLayout extends Vue {
  drawer = null;
  items = [

    {divider: true},
    {heading: '  Labels'},
    {icon: 'add', text: 'Create new label'},
    {divider: true},
    {icon: 'archive', text: 'Archive'},
    {icon: 'delete', text: 'Trash'},
    {divider: true},
    {icon: 'settings', text: 'Settings'},
    {icon: 'chat_bubble', text: 'Trash'},
    {icon: 'help', text: 'Help'},
    {icon: 'phonelink', text: 'App downloads'},
    {icon: 'keyboard', text: 'Keyboard shortcuts'}
  ];

  @Prop
  source;
}
