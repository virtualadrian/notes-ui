<template>
  <v-navigation-drawer :value="getDrawerVisible" fixed clipped class="grey lighten-4" app>

    <v-list dense class="grey lighten-4">
      <template v-for="(link, i) in DRAWER">

        <v-layout v-if="link.type === TYPE.HEADING" row align-center :key="i">
          <v-flex xs6>
            <v-subheader>&nbsp; {{link.text}}</v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
          </v-flex>
        </v-layout>

        <v-list-tile v-else-if="link.type === TYPE.ITEM"  @click="link.action($router)" :key="i">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">
              {{link.text}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-else-if="link.type === TYPE.DIVIDER" dark class="my-3" :key="i"></v-divider>

      </template>
    </v-list>
  </v-navigation-drawer>

</template>
<script>
import {Prop, Component, Vue} from 'vue-property-decorator';
import {mapGetters} from 'vuex';
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

@Component({
  computed: {
    ...mapGetters('global', ['getDrawerVisible'])
  }
})
export default class Drawer extends Vue {
  @Prop({default: true}) drawer;

  visible = true;
  TYPE = LinkType;

  DRAWER = [
    new NavDrawerLink(LinkType.HEADING, null, 'Notes', null),
    new NavDrawerLink(LinkType.ITEM, 'add', 'Add Note', ($router) => $router.push({name: 'NoteDetail'})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.ITEM, 'library_books', 'All Notes', ($router) => $router.push({name: 'Notes', params: { filter: 'ALL' }})),
    new NavDrawerLink(LinkType.ITEM, 'star', 'Favorites', ($router) => $router.push({name: 'Notes', params: { filter: 'FAVORITES' }})),
    new NavDrawerLink(LinkType.ITEM, 'filter_list', 'Snippets', ($router) => $router.push({name: 'Snippets'})),
    new NavDrawerLink(LinkType.ITEM, 'short_text', 'Tags', ($router) => $router.push({name: 'NoteTags'})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.HEADING, null, 'Study Card Decks', null),
    new NavDrawerLink(LinkType.ITEM, 'add', 'Add Deck', ($router) => $router.push({name: 'DeckDetail'})),
    new NavDrawerLink(LinkType.ITEM, 'layers', 'All Decks', ($router) => $router.push({name: 'Decks'})),
    new NavDrawerLink(LinkType.ITEM, 'touch_app', 'Review Deck', ($router) => $router.push({name: 'ViewDeck'})),
    new NavDrawerLink(LinkType.ITEM, 'lightbulb_outline', 'Study Session', ($router) => $router.push({name: 'Study Deck'})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.HEADING, null, 'Note Bin', null),
    new NavDrawerLink(LinkType.ITEM, 'archive', 'Archive', ($router) => $router.push({name: 'Notes', params: { filter: 'ARCHIVED' }})),
    new NavDrawerLink(LinkType.ITEM, 'delete', 'Trash', ($router) => $router.push({name: 'Notes', params: { filter: 'TRASH' }})),
    new NavDrawerLink(LinkType.DIVIDER, null, null, null),
    new NavDrawerLink(LinkType.HEADING, null, 'Settings', null),
    new NavDrawerLink(LinkType.ITEM, 'arrow_upward', 'Pro Upgrade', ($router) => $router.push({name: 'Subscription'})),
    new NavDrawerLink(LinkType.ITEM, 'person', 'Profile', ($router) => $router.push({name: 'Profile'})),
    new NavDrawerLink(LinkType.ITEM, 'chat', 'Feedback', ($router) => $router.push({name: 'Feedback'})),
    new NavDrawerLink(LinkType.ITEM, 'help', 'Help', ($router) => $router.push({name: 'Help'}))
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
</script>
<style scoped lang="scss">
  .portal-layout {
    height: 100%;
  }
  .content-main-wrap {

  }

</style>
