import {Emit, Prop, Component, Vue} from 'vue-property-decorator';

const LinkType = {
  HEADING: 1,
  ITEM: 2,
  DIVIDER: 3
};

class NavDrawerLink {
  constructor(type, icon, text, action) {
    this.type = type;
    this.icon = icon;
    this.text = text;
    this.action = action;
  }
}

@Component()
export default class Drawer extends Vue {
  @Prop({default: true}) drawer;

  visible = true;
  TYPE = LinkType;

  DRAWER = [
    new NavDrawerLink(LinkType.HEADING, null, 'Notes', null),
    new NavDrawerLink(LinkType.ITEM, 'add', 'Add Note', () => this.$router.push({name: 'NoteDetail'})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.ITEM, 'library_books', 'All Notes', () => this.$router.push({name: 'Notes'})),
    new NavDrawerLink(LinkType.ITEM, 'star', 'Favorites', () => this.$router.push({name: 'Favorites'})),
    new NavDrawerLink(LinkType.ITEM, 'filter_list', 'Snippets', () => this.$router.push({name: 'Snippets'})),
    new NavDrawerLink(LinkType.ITEM, 'star', 'Favorites', () => this.$router.push({name: 'Notes'})),
    new NavDrawerLink(LinkType.ITEM, 'short_text', 'Tags', () => this.$router.push({name: 'Tags'})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.HEADING, null, 'Study Card Decks', null),
    new NavDrawerLink(LinkType.ITEM, 'add', 'Add Deck', () => this.$router.push({name: 'DeckDetail'})),
    new NavDrawerLink(LinkType.ITEM, 'layers', 'All Decks', () => this.$router.push({name: 'Decks'})),
    new NavDrawerLink(LinkType.ITEM, 'touch_app', 'Review Deck', () => this.$router.push({name: 'ViewDeck'})),
    new NavDrawerLink(LinkType.ITEM, 'lightbulb_outline', 'Study Session', () => this.$router.push({name: 'Study Deck'})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.HEADING, null, 'Note Bin', null),
    new NavDrawerLink(LinkType.ITEM, 'archive', 'Archive', () => this.$router.push({name: 'Archived'})),
    new NavDrawerLink(LinkType.ITEM, 'delete', 'Trash', () => this.$router.push({name: 'Trash'})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.HEADING, null, 'Settings', null),
    new NavDrawerLink(LinkType.ITEM, 'arrow_upward', 'Pro Upgrade', () => this.$router.push({name: 'Subscription'})),
    new NavDrawerLink(LinkType.ITEM, 'person', 'Profile', () => this.$router.push({name: 'Profile'})),
    new NavDrawerLink(LinkType.ITEM, 'chat', 'Feedback', () => this.$router.push({name: 'Feedback'})),
    new NavDrawerLink(LinkType.ITEM, 'help', 'Help', () => this.$router.push({name: 'Help'}))
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
