<template>
  <section class="section bg-gray home home-form-left" id="registration-simple">
    <!-- <div class="bg-overlay"></div> -->
    <div class="container">
      <div class="row">
        <div class="col-lg-6">

          <div class="home-wrapper">
            <h2 class="animated fadeInDown wow" data-wow-delay=".1s">
              <span class="text-colored">Noteler</span> easier learning and growing.
            </h2>
            <p class="animated fadeInDown wow text-muted" data-wow-delay=".2s">
              Noteler helps saves your notes securely. You can save, share and collaborate. You can even use Noteler turn your notes into study tools like flash cards.
            </p>
            <router-link :to="{name: 'RegistrationFull'}"
                         class="btn btn-primary btn-shadow btn-rounded w-lg animated fadeInDown wow">
              Get Started
            </router-link>
            <div class="clearfix"></div>
          </div><!-- home wrapper -->

        </div> <!-- end col -->

        <div class="col-lg-4 offset-lg-2">
          <div class="home-wrapper">
            <h3 class="text-center"> Register for free </h3>
            <div class="form-group">
              <input type="text" class="form-control" v-model="registration.firstName"
                     placeholder="First Name" required="required">
            </div>

            <div class="form-group">
              <input type="text" class="form-control" v-model="registration.lastName"
                     placeholder="Last Name" required="required">
            </div>

            <div class="form-group">
              <input type="text" class="form-control" v-model="registration.email"
                     placeholder="E-Mail Address" required="required">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="registration.username"
                     placeholder="User name" required="required">
            </div>
            <div class="form-group text-center">
              <button v-on:click="register()" class="btn btn-primary btn-shadow btn-rounded w-lg">Start Now</button>
            </div>
          </div>
        </div>

      </div> <!-- end row -->
    </div> <!-- end container -->
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
import { Component, Vue } from 'vue-property-decorator';
import http from '@/global/services/http';
import environment from '@/global/services/environment';
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
</script>
<style  scoped lang="scss"></style>
