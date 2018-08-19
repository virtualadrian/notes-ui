import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';
import router from '@/router';
import AccountInstructions from '@/components/Landing/AccountInstructions/AccountInstructions.vue';

const api = {
  sendPasswordReset: () => environment.getEndpoint(`account/password/reset/send`)
};

@Component({
  components: {
    AccountInstructions
  }
})
export default class PasswordReset extends Vue {
  reset = {
    email: ''
  };

  mounted() {
  }

  sendReset() {
    http.post(api.sendPasswordReset(), this.reset)
      .then(() => {
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
