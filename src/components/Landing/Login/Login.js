import Vue from 'vue';
import Component from 'vue-class-component';
import auth from '@/services/authentication';
import router from '@/router';
import AccountInstructions from '@/components/Landing/AccountInstructions/AccountInstructions.vue';

@Component({
  components: {
    AccountInstructions
  }
})
export default class Login extends Vue {
  loginModel = {username: '', password: ''};

  mounted() {
  }

  login() {
    auth.login(this.loginModel.username, this.loginModel.password)
      .then(() => {
        router.push({ name: 'PortalDashboard' });
      }).catch(() => {
        this.$refs.problemLoggingIn.show();
      });
  }
}
