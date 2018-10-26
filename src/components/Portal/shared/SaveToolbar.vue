<template>
  <section>
    <v-toolbar light color="accent">
      <v-btn icon light @click.native="clearNote">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Edit Note</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn light flat @click="saveNote">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </section>
</template>
<script>
import {Emit, Component, Vue} from 'vue-property-decorator';

@Component()
export default class SaveToolbar extends Vue {
    @Emit()
  saveNote() {};

    @Emit()
    clearNote() {};
}
</script>
<style lang="scss">
  .portal-notes {

    .pinned {
      transform: rotate(45deg);
    }

    #noteTitle, #noteBody {
      color: #656565!important;
    }
    #noteTitle {
      font-size: 20px;
      font-weight: bolder;
    }

  }

  .quick-compose {
    background-color: #808598!important;
    color: #ffffff!important;;
  }

  .v-expansion-panel__header__icon .v-icon {
    color: #ffffff !important;
  }

  .quick-compose .qc-header {
    background-color: transparent!important;
    font-size: 18px;
  }

  .note-private-toggle label {
    top: 5px!important;
  }

  .tag-input span.chip, .tag-input span.v-chip {
    background-color: #1976d2;
    color: #fff;
    padding-left:7px;
  }

  .tag-input span.chip::before, .tag-input span.v-chip::before {
    content: "label";
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 1em;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

</style>
