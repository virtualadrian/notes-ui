<template>
  <section>
    <section class="home section login" id="login">
      <!-- <div class="bg-overlay"></div> -->
      <div class="container">
        <div class="row">

          <div class="col-lg-6 offset-lg-3">
            <div class="home-wrapper">
              <h3 class="text-center"> Account Login </h3>
              <div class="form-group">
                <input type="text" v-model="loginModel.username"
                       class="form-control" placeholder="User name" required="required">
              </div>
              <div class="form-group">
                <input type="password" v-model="loginModel.password" v-on:keyup.enter="login()"
                       class="form-control" placeholder="Password" required="required">
              </div>
              <div class="form-group text-center">
                <button type="submit" v-on:click="login()"
                        class="btn btn-primary btn-shadow btn-rounded w-lg">Login Now
                </button>
              </div>
            </div>
          </div>

        </div> <!-- end row -->
      </div> <!-- end container -->
    </section>

    <AccountInstructions/>

    <b-modal id="modal-center" ref="problemLoggingIn"
             @ok="show=false"
             :ok-only="true"
             :ok-title="'Ok'"
             :ok-variant="'primary'"
             centered title="Login Failed">
      <p class="my-4">Oops! There was a problem logging you in.</p>
    </b-modal>
  </section>

</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import auth from '@/services/authentication';
import router from '@/router';
import AccountInstructions from '@/components/Landing/AccountInstructions/AccountInstructions.vue';

  @Component({
    components: {
      AccountInstructions
    }
  })
export default class Login extends Vue {
    loginModel = {username: '', password: ''};

    mounted() {
    }

    login() {
      auth.login(this.loginModel.username, this.loginModel.password)
        .then(() => {
          router.push({ name: 'PortalDashboard' });
        }).catch(() => {
          this.$refs.problemLoggingIn.show();
        });
    }
  }

</script>
<style scoped lang="scss">
  .login {
    padding-top: 120px;
  }

</style>
