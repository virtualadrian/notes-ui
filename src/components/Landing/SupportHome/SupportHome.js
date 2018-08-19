import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';
import router from '@/router';

const api = {
  sendPasswordReset: () => environment.getEndpoint(`account/password/reset/send`)
};

@Component
export default class SupportHome extends Vue {
  reset = {
    email: ''
  };

  mounted() {
  }

  sendReset() {
    http.post(api.sendPasswordReset(), this.reset)
      .then(() => {
        router.push({name: 'Login'});
        this.$refs.resetSent.show();
      })
      .catch(() => {
        this.$refs.problemResetting.show();
      });
  }
  resetSentOk() {
    this.$refs.resetSent.hide();
    router.push({name: 'Login'});
  }
}
