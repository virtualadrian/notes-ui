<template>
  <v-footer
    height="auto"
    color="primary lighten-1"
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        flat
        round
      >
        {{ link }}
      </v-btn>
      <v-flex
        primary
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12
      >
        &copy; {{currentYear}} — <strong>Noteler</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<style></style>
<script>
import {Component, Vue} from 'vue-property-decorator';

  @Component()
export default class Footer extends Vue {
    links = [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us'
    ];

    currentYear = (new Date()).getFullYear();
  }
</script>
