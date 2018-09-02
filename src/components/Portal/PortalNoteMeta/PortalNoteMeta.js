import {Prop, Component, Vue} from 'vue-property-decorator';

@Component()
export default class PortalNoteMeta extends Vue {
  tags = [];
  tag = '';

  @Prop()
  note;

  insertTag() {
    if (!this.tag) { return; }
    this.$nextTick(() => {
      this.tags.push(...this.tag.split(','));
      this.$nextTick(() => {
        this.tag = '';
      });
    });
  }

  getNoteTags() {
    return this.tags.split(',');
  }

  getNoteTitle() {
    return this.note.noteTitle;
  }

  getNoteIsPrivate() {
    return this.note.isPrivate;
  }
}
