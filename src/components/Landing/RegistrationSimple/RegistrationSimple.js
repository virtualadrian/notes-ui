import { Component, Vue } from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';

const api = {
  register: () => environment.getEndpoint(`account/register`)
};

@Component
export default class RegistrationSimple extends Vue {
  newUser = { username: '', email: '', password: '', firstName: '', lastName: '' };

  registerNewUser () {
    http.post(api.register(), this.newUser)
      .then((response) => {
        console.dir(response);
      });
  }
}
