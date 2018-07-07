import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    propMessage: String
  }
})
export default class Login extends Vue {

  // Data property
  loginModel = {};

  // Lifecycle hook
  mounted () {
  }

  // Component method
  login () {
    console.log(this.loginModel);
  }
}
