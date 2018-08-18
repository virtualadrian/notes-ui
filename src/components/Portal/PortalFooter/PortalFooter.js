import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class PortalFooter extends Vue {
  hiding = false;

  mounted() {
    this.hiding = (this.$route.fullPath.indexOf('portal/note/edit/') >= 0);
  }

  beforeEnter() {
    this.hiding = (this.$route.fullPath.indexOf('portal/note/edit/') >= 0);
  }
}
