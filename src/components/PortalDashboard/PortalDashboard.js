import Vue from 'vue';
import Component from 'vue-class-component';

// import { http } from '@/services/http';

@Component({
  props: {
    propMessage: String
  }
})
export default class PortalDashboard extends Vue {
  msg = 'some message';
  info = null;
  loading = true;
  errored = false;

  // computed
  get computedMsg () {
    return 'computed ' + this.msg;
  }

  mounted () {
    console.log('mounted lifecycle hook');
  }

  getStuff () {
    console.log('getStuff');
  }

  // created () {
  //   console.log('created');
  // }
  //
  // mounted () {
  //   console.log('mounted');
  //   // http.get('http://localhost:8080/api/v1/note')
  //   //   .then((response) => {
  //   //     console.dir(response);
  //   //   });
  // }
  //
  // updated () {
  //   console.log('updated');
  // }
  //
  // destroyed () {
  //   console.log('destroyed');
  // }
}
