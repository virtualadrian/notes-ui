import Component from 'vue-class-component';
import Vue from 'vue';
import http from '@/services/http';
import environment from '@/services/environment';
import router from '@/router';

const api = {
  register: () => environment.getEndpoint(`account/register`)
};

@Component
export default class RegistrationFull extends Vue {
  registration ={
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  mounted() {
  }

  register() {
    if (this.registrationValid) {
      http.post(api.register(), this.registration)
        .then(() => {
          this.$refs.checkInbox.show();
        })
        .catch(() => {
          this.$refs.problemActivating.show();
        })
      ;
    }
  }

  get registrationValid() {
    return this.registration.username &&
      (this.registration.email && this.isEmailValid) &&
      this.registration.firstName &&
      this.registration.lastName;
  }

  get isEmailValid() {
    return /[A-Z]/.test(this.registration.email);
  }
}
