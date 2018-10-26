<template>
  <section class="portal-layout">
    <v-app id="keep">
      <drawer :drawer="drawer"></drawer>
      <v-toolbar color="#2a56c6" app clipped-left flat fixed dark>
        <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
        <span @click="$router.push({name: 'Notes', params: {filter: 'ALL'}})" class="title ml-3 ml-5 mr-5">Noteler&nbsp;<span class="font-weight-light">Portal</span></span>
        <v-text-field class="ml-3" solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>

        <v-btn icon><v-icon>notifications</v-icon></v-btn>

        <v-menu offset-y>
          <v-btn slot="activator" icon>
            <v-icon>person</v-icon>
          </v-btn>

          <v-list>
            <v-list-tile @click="">
              <v-list-tile-title>Privacy</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-title>Terms Of Service</v-list-tile-title>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile @click="">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>

      <v-content>
        <v-layout justify-center row fill-height>

          <v-flex xs12>
            <router-view :key="$route.fullPath"></router-view>
          </v-flex>

        </v-layout>

      </v-content>

    </v-app>
  </section>

</template>
<script>
import {Prop, Component, Vue} from 'vue-property-decorator';
import PortalNavigation from '@/components/Portal/layout/PortalNavigation/PortalNavigation.vue';
import Footer from '@/components/Portal/layout/Footer.vue';
import Drawer from '@/components/Portal/shared/Drawer.vue';
import QuickCompose from '@/components/Portal/shared/QuickCompose';

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

</script>
<style scoped lang="scss">
  .portal-layout {
    height: 100%;
  }
  .content-main-wrap {

  }
  .title {
    cursor: pointer;
  }
</style>
