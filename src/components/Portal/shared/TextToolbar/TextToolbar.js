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
