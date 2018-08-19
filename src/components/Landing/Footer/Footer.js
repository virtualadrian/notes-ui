import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  currentYear = (new Date()).getFullYear();
}
