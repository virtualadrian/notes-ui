import {Emit, Prop, Component, Vue} from 'vue-property-decorator';
import PortalNavigation from '@/components/Portal/layout/PortalNavigation/PortalNavigation.vue';
import Footer from '@/components/Portal/layout/Footer.vue';

const LinkType = {
  HEADING: 1,
  ITEM: 2,
  DIVIDER: 3
};

class NavDrawerLink {
  constructor(type, icon, text, action) {
    this.type = 0;
    this.icon = icon;
    this.text = text;
    this.action = action;
  }
}

@Component({
  components: {PortalNavigation, Footer}
})
export default class PortalLayout extends Vue {
  @Prop({default: true}) drawer;

  drawerItems = [
    new NavDrawerLink(LinkType.HEADING, null, 'Notes', null),
    new NavDrawerLink(LinkType.ITEM, 'add', 'Add Note', () => this.$router.push({name: 'NoteDetail'})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.ITEM, 'library_books', 'All Notes', () => this.$router.push({name: 'Notes'})),
    new NavDrawerLink(LinkType.ITEM, 'star', 'Favorites', () => this.$router.push({name: 'Favorites'})),
    new NavDrawerLink(LinkType.ITEM, 'filter_list', 'Snippets', () => this.$router.push({name: 'Snippets'})),
    new NavDrawerLink(LinkType.ITEM, 'star', 'Favorites', () => this.$router.push({name: 'Notes'})),
    new NavDrawerLink(LinkType.ITEM, 'short_text', 'Tags', () => this.$router.push({name: 'Tags'})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.HEADING, null, 'Study Card Decks', null)
  ];

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

  get showing() {
    return this.drawer;
  }
  set showing(value) {
    this.drawer = value;
  }
  mounted() {
    this.showing = true;
  }
}
