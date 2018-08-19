import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';
import router from '@/router';

const api = {
  setNewPassword: () => environment.getEndpoint(`account/password/set`)
};

@Component
export default class PasswordResetComplete extends Vue {
  passwordReset = {
    password: '',
    confirmPassword: ''
  };

  mounted() {
  }

  setPassword() {
    if (this.passwordValid) {
      http.put(api.setNewPassword(), this.passwordReset)
        .then(() => {
          router.push({name: 'Login'});
        })
        .catch(() => {
          this.$refs.problemUpdatingPassword.show();
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
    return (this.passwordReset.password && this.passwordReset.confirmPassword) &&
      (this.passwordReset.password === this.passwordReset.confirmPassword);
  }

  get lengthValid() {
    return this.passwordReset.password.length >= 8;
  };

  get uppercaseValid() {
    return /[A-Z]/.test(this.passwordReset.password);
  };

  get lowercaseValid() {
    return /[a-z]/.test(this.passwordReset.password);
  };

  get numberOrSpecialValid() {
    return /\d/.test(this.passwordReset.password) ||
      /[!@#$%^&*()]/.test(this.passwordReset.password);
  }

  get numberValid() {
    return /\d/.test(this.passwordReset.password);
  };

  get specialValid() {
    return /[!@#$%^&*()]/.test(this.passwordReset.password);
  };
}
