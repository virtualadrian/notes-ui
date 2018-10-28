<template>
  <v-container fluid fill-height class="snippets-container" color="white">
    <v-layout justify-start align-space-around row>
      <v-flex xs12 md4 >

        <v-card class="snippet-list-toolbar">
          <v-toolbar color="primary" dark flat >
            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-toolbar-title>Snippets</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
              >
                {{ item.header }}
              </v-subheader>

              <v-divider
                v-else-if="item.divider"
                :inset="item.inset"
                :key="index"
              ></v-divider>

              <v-list-tile
                v-else
                :key="item.title"
                avatar

              >
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>

      </v-flex>
      <v-flex xs12 md8 class="snippet-body">

        <v-tabs grow height="64px" v-model="active" color="primary" dark>
          <v-tab v-for="n in 3" :key="n" ripple active-class="tab-active">
            Item {{ n }}
          </v-tab>
          <v-tab-item v-for="n in 3" :key="n" light>
            <v-card flat>
              <v-card-text> VURT DA FURK</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>

      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Snippets extends Vue {
  active=1;

  items = [
    { header: 'Snippet Stacks' },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      title: 'Brunch this weekend?',
      subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
      subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      title: 'Oui oui',
      subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
    }
  ]
}
</script>
<style scoped lang="scss">
  .snippets-container {
    padding-top: 0px;
    padding-left: 18px;
    padding-right: 18px;
  }
  .snippet-body {
    background-color: #fff;
  }

  .snippet-list-toolbar {
    border-radius: 0;
  }

</style>
