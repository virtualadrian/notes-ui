import {Prop, Component, Vue} from 'vue-property-decorator';

@Component()
export default class PortalNoteMeta extends Vue {
  tag = '';

  @Prop({
    type: Object,
    default: () => { return {}; }
  })
  note;

  get tags() {
    return this.note && this.note.noteTags ? this.note.noteTags.split(',') : [];
  }

  set tags(value) {
    this.note.hasChanges = true;
    this.note.noteTags = value.join(',');
  }

  insertTag() {
    if (!this.tag) { return; }
    this.$nextTick(() => {
      this.tags.concat(...this.tag.split(','));
      this.$nextTick(() => {
        this.tag = '';
      });
    });
  }

  getNoteTags() {
    return this.tags.join(',');
  }

  getNoteTitle() {
    return this.note.noteTitle;
  }

  getNoteIsPrivate() {
    return this.note.isPrivate;
  }
}
