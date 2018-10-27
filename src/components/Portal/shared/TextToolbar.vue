<template>
  <v-toolbar color="amber" single-line flat class="text--black text--darken-1">
    <v-overflow-btn :items="dropdownFont" label="Select font" hide-details single-line depressed></v-overflow-btn>
    <v-divider vertical class="mt-0"></v-divider>
    <v-overflow-btn :items="dropdownEdit" editable label="Select size" hide-details single-line
                    depressed></v-overflow-btn>
    <v-divider class="mt-0 mr-2" vertical></v-divider>
    <v-btn-toggle v-model="toggleMultiple" class="amber text--black" multiple single-line depressed>
      <v-btn :value="1" flat solo @click="boldClicked">
        <v-icon>format_bold</v-icon>
      </v-btn>
      <v-btn :value="2" flat solo>
        <v-icon>format_italic</v-icon>
      </v-btn>
      <v-btn :value="3" flat solo>
        <v-icon>format_underlined</v-icon>
      </v-btn>
      <v-btn :value="4" flat solo>
        <v-icon>format_color_fill</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-divider class="mx-2 v-divider mt-0" vertical></v-divider>

    <v-btn-toggle v-model="toggleExclusive" class="transparent">
      <v-btn :value="1" flat solo>
        <v-icon>format_align_left</v-icon>
      </v-btn>

      <v-btn :value="2" flat solo>
        <v-icon>format_align_center</v-icon>
      </v-btn>

      <v-btn :value="3" flat solo>
        <v-icon>format_align_right</v-icon>
      </v-btn>

      <v-btn :value="4" flat solo>
        <v-icon>format_align_justify</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-toolbar>

</template>
<script>
import {Emit, Component, Vue} from 'vue-property-decorator';

@Component()
export default class TextToolbar extends Vue {
    dropdownFont = [
      { text: 'Arial' },
      { text: 'Calibri' },
      { text: 'Courier' },
      { text: 'Verdana' }
    ];

    dropdownEdit = [
      { text: '100%' },
      { text: '75%' },
      { text: '50%' },
      { text: '25%' },
      { text: '0%' }
    ];

    toggleExclusive = 1;
    toggleMultiple = [];

    @Emit()
    fontFamilyChange(font) {}

    @Emit()
    fontSizeChange(size) {}

    @Emit()
    fontStyleChange(style) {}

    @Emit()
    fontFormatChange(format) {}
}

</script>
<style lang="scss">
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
</style>
