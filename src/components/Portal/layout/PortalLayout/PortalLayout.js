import {Prop, Component, Vue} from 'vue-property-decorator';
import PortalNavigation from '@/components/Portal/layout/PortalNavigation/PortalNavigation.vue';
import Footer from '@/components/Portal/layout/Footer.vue';
import Drawer from '@/components/Portal/shared/Drawer/Drawer.vue';
import QuickCompose from '@/components/Portal/shared/QuickCompose/QuickCompose';

@Component({
  components: {PortalNavigation, Footer, Drawer, 'quick-compose': QuickCompose}
})
export default class PortalLayout extends Vue {
  drawer = true;
  links = [
    'Home',
    'About Us',
    'Team',
    'Services',
    'Blog',
    'Contact Us'
  ];
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
