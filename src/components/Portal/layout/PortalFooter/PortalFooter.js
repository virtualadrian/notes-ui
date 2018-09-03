import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class PortalFooter extends Vue {
  currentYear = (new Date()).getFullYear();
}
