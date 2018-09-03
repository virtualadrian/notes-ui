<style lang="scss"></style>
<template>

  <v-flex xs12 sm12>


        <quick-compose></quick-compose>

  </v-flex>

</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import QuickCompose from '@/components/Portal/shared/QuickCompose/QuickCompose.vue';

@Component({
  components: {'quick-compose': QuickCompose}
})
export default class NotesQuickCompose extends Vue {}
</script>
