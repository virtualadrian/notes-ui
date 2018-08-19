import Component from 'vue-class-component';
import Vue from 'vue';
import http from '@/services/http';
import environment from '@/services/environment';
import router from '@/router';
import AccountInstructions from '@/components/Landing/AccountInstructions/AccountInstructions.vue';

const api = {
  register: () => environment.getEndpoint(`account/register`)
};

@Component({
  components: {
    AccountInstructions
  }
})
export default class RegistrationFull extends Vue {
  registration ={
    username: '',
    email: '',
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
