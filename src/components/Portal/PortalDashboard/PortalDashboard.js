import { Component, Vue } from 'vue-property-decorator';
import http from '@/services/http';

@Component
export default class PortalDashboard extends Vue {
  mounted () {
    this.getStuff();
  }

  getStuff () {
    http.get('http://localhost:9999/api/v1/note')
      .then((response) => {
        console.dir(response);
      });
  }
}
