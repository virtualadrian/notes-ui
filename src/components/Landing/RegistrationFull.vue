<template>

  <section class="registration-full">
    <!-- LOGIN COMPONENT -->
    <section class="home home-form-left" id="home">
      <!-- <div class="bg-overlay"></div> -->
      <div class="container">
        <div class="row">

          <div class="col-lg-6 offset-lg-3">
            <div class="home-wrapper">
              <h3 class="text-center"> New Noteler Account</h3>
              <div class="form-group">
                <input type="text" v-model="registration.firstName" class="form-control" placeholder="First name">
              </div>
              <div class="form-group">
                <input type="text" v-model="registration.lastName" class="form-control" placeholder="Last name">
              </div>
              <div class="form-group">
                <input type="text" v-model="registration.email" class="form-control" placeholder="Email Address" required="required">
              </div>
              <div class="form-group">
                <input type="text" v-model="registration.username" class="form-control" placeholder="User name" required="required">
              </div>
              <div class="form-group text-center">
                <button type="submit"
                        v-on:click="register"
                        class="btn btn-primary btn-shadow btn-rounded w-lg">Register Now</button>
              </div>
            </div>
          </div>

        </div> <!-- end row -->
      </div> <!-- end container -->
    </section>

    <AccountInstructions/>
    <b-modal id="modal-center" ref="checkInbox"
             @ok="registrationSentOk"
             :ok-only="true"
             :ok-title="'Ok'"
             :ok-variant="'primary'"
             centered title="Registration E-Mail Sent">
      <p class="my-4">Welcome aboard! Please check your Inbox, we've sent you an E-Mail.</p>
    </b-modal>
    <b-modal id="modal-center" ref="problemRegistering"
             @ok="show=false"
             :ok-only="true"
             :ok-title="'Ok'"
             :ok-variant="'primary'"
             centered title="Registration Failed">
      <p class="my-4">Oops! There was a problem registering your account. Please try again.</p>
    </b-modal>
  </section>

</template>
<script>
import Component from 'vue-class-component';
import Vue from 'vue';
import http from '@/global/services/http';
import environment from '@/global/services/environment';
import router from '@/router';
import AccountInstructions from '@/components/Landing/AccountInstructions.vue';

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

</script>
<style scoped lang="scss">
  .registration-full {

  }
</style>
