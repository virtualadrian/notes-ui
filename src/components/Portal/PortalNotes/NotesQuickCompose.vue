<style lang="scss"></style>
<template>
  <v-flex xs12 sm12>
    <v-container grid-list-md fluid>
      <v-layout row wrap>

        <quick-compose></quick-compose>

      </v-layout>
    </v-container>
  </v-flex>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import QuickCompose from '@/components/Portal/Shared/QuickCompose/QuickCompose.vue';

@Component({
  components: {'quick-compose': QuickCompose}
})
export default class NotesQuickCompose extends Vue {}
</script>
