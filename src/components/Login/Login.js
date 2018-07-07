import Vue from 'vue';
import Component from 'vue-class-component';
import auth from '@/services/auth';
import router from '@/router';

@Component
export default class Login extends Vue {
  // Data property
  loginModel = {username: '', password: ''};

  // Lifecycle hook
  mounted () {
  }

  // Component method
  login () {
    auth.login(this.loginModel.username, this.loginModel.password)
      .then(() => {
        router.push({ name: 'PortalDashboard' });
      });
  }
}
