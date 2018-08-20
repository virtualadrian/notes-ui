import { Component, Vue } from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';
import router from '@/router';

const api = {
  register: () => environment.getEndpoint(`account/register`)
};

@Component
export default class RegistrationSimple extends Vue {
  registration ={
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  };

  registerNewUser() {
    http.post(api.register(), this.newUser)
      .then((response) => {
        console.dir(response);
      });
  }

  register() {
    if (this.registrationValid) {
      http.post(api.register(), this.registration)
        .then(() => {
          this.$refs.checkInbox.show();
        })
        .catch(() => {
          this.$refs.problemRegistering.show();
        })
      ;
    }
  }

  registrationSentOk() {
    this.$refs.checkInbox.hide();
    router.push({name: 'Login'});
  }

  get registrationValid() {
    return this.registration.username &&
      (this.registration.email && this.isEmailValid) &&
      this.registration.firstName &&
      this.registration.lastName;
  }

  get isEmailValid() {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(this.registration.email);
  }
}
