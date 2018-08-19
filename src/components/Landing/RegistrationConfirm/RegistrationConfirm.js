import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';
import router from '@/router';
import AccountInstructions from '@/components/Landing/AccountInstructions/AccountInstructions.vue';

const api = {
  setNewPassword: () => environment.getEndpoint(`account/register/confirm`)
};

@Component({
  components: {
    AccountInstructions
  }
})
export default class RegistrationConfirm extends Vue {
  registration = {
    token: '',
    password: '',
    confirmPassword: ''
  };

  mounted() {
    this.registration.token = this.$route.params.token;
  }

  setPassword() {
    if (this.passwordValid) {
      const token = this.registration.token;
      http.post(api.setNewPassword(), this.registration)
        .then(() => {
          router.push({name: 'Login'});
        })
        .catch(() => {
          this.$refs.problemActivating.show();
        })
      ;
    }
  }

  get passwordValid() {
    return this.lengthValid &&
      this.uppercaseValid &&
      this.lowercaseValid &&
      this.numberOrSpecialValid &&
      this.matchConfirmation;
  }

  get matchConfirmation() {
    return (this.registration.password && this.registration.confirmPassword) &&
      (this.registration.password === this.registration.confirmPassword);
  }

  get lengthValid() {
    return this.registration.password.length >= 8;
  };

  get uppercaseValid() {
    return /[A-Z]/.test(this.registration.password);
  };

  get lowercaseValid() {
    return /[a-z]/.test(this.registration.password);
  };

  get numberOrSpecialValid() {
    return /\d/.test(this.registration.password) ||
      /[!@#$%^&*()]/.test(this.registration.password);
  }

  get numberValid() {
    return /\d/.test(this.registration.password);
  };

  get specialValid() {
    return /[!@#$%^&*()]/.test(this.registration.password);
  };
}
