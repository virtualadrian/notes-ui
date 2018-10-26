<template>
  <section>
    <section class="section home home-form-left" id="registration-simple">
      <!-- <div class="bg-overlay"></div> -->
      <div class="container">
        <div class="row">
          <div class="col-lg-6">

            <div class="home-wrapper">
              <h2 class="animated fadeInDown wow" data-wow-delay=".1s">
                <span class="text-colored">Noteler</span> Password Reset &nbsp;<strong class="register-activate-arrow"><i class="zmdi zmdi-arrow-right"></i></strong>
              </h2>
              <div class="animated fadeInDown wow" data-wow-delay=".2s">
                To finish up you just set a new password and then login.
              </div>
              <div class="text-muted">Passwords should meet the following requirements:</div>
              <div class="pw-rules-wrap">
                <div :class="{ valid: lengthValid, 'text-muted': !lengthValid }" class="pw-rule">Minimum of 8 characters</div>
                <div :class="{ valid: uppercaseValid, 'text-muted': !uppercaseValid }" class="pw-rule">At least 1 upper case letter</div>
                <div :class="{ valid: lowercaseValid, 'text-muted': !lowercaseValid }" class="pw-rule">At least 1 lower case letter</div>
                <div :class="{ valid: numberOrSpecialValid, 'text-muted': !numberOrSpecialValid }" class="pw-rule">At least 1 number</div>
                <div :class="{ valid: matchConfirmation, 'text-muted': !matchConfirmation }" class="pw-rule">Passwords Must Match</div>
              </div>
              <div class="clearfix"></div>
            </div><!-- home wrapper -->

          </div> <!-- end col -->

          <div class="col-lg-4 offset-lg-2">
            <div class="home-wrapper">
              <h5> New Password </h5>
              <div class="form-group">
                <input type="password" class="form-control" v-model="passwordReset.password"
                       placeholder="Password" required="required">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" v-model="passwordReset.confirmPassword"
                       placeholder="Password" required="required">
              </div>
              <div class="form-group text-center">
                <button v-on:click="setPassword()"
                        :disabled="!passwordValid"
                        :class="{ 'btn-success': passwordValid, 'btn-secondary': !passwordValid }"
                        class="btn btn-shadow btn-rounded w-lg">Submit</button>
              </div>
            </div>
          </div>

        </div> <!-- end row -->
      </div> <!-- end container -->
    </section>
    <section class="section" id="features">

      <div class="container">

        <div class="row">
          <div class="col-lg-12 text-center">
            <div class="title-box">
              <h3 class="fadeIn animated wow" data-wow-delay=".1s">Need More Help ?</h3>
              <div class="border"></div>
            </div>
          </div>
        </div> <!-- end row -->

        <div class="row text-center">
          <div class="col-lg-4">
            <div class="service-item animated fadeInLeft wow" data-wow-delay=".1s">
              <h2><i class="zmdi zmdi-collection-item-1 text-colored"></i></h2>
              <div class="service-detail">
                <h4>Lost Password?</h4>
                <p>
                  <a class="btn btn-primary btn-shadow btn-rounded w-lg" routerLink="/account/password/reset">Reset
                    Password</a>
                </p>
              </div> <!-- /service-detail -->
            </div> <!-- /service-item -->
          </div> <!-- /col -->

          <div class="col-lg-4">
            <div class="service-item animated fadeInDown wow" data-wow-delay=".3s">
              <h2><i class="zmdi zmdi-collection-item-2 text-colored"></i></h2>
              <div class="service-detail">
                <h4>Not Registered?</h4>
                <p>
                  <a class="btn btn-primary btn-shadow btn-rounded w-lg" routerLink="/account/password/reset">Register
                    Now</a>
                </p>
              </div> <!-- /service-detail -->
            </div> <!-- /service-item -->
          </div> <!-- /col -->

          <div class="col-lg-4">
            <div class="service-item animated fadeInRight wow" data-wow-delay=".5s">
              <h2><i class="zmdi zmdi-collection-item-3 text-colored"></i></h2>
              <div class="service-detail">
                <h4>Something Else?</h4>
                <p>
                  <a class="btn btn-primary btn-shadow btn-rounded w-lg" routerLink="/account/password/reset">Contact Us</a>
                </p>
              </div> <!-- /service-detail -->
            </div> <!-- /service-item -->
          </div> <!-- /col -->
        </div> <!--end row -->


      </div> <!-- end container -->
    </section>
    <b-modal id="modal-center" ref="problemUpdatingPassword"
             @ok="show=false"
             :ok-only="true"
             :ok-title="'Ok'"
             :ok-variant="'primary'"
             centered title="Password Update Failed">
      <p class="my-4">Oops! There was a problem updating your password. Please try again.</p>
    </b-modal>
  </section>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';
import router from '@/router';

const api = {
  setNewPassword: () => environment.getEndpoint(`account/password/reset`)
};

@Component
export default class PasswordResetComplete extends Vue {
  passwordReset = {
    token: '',
    password: '',
    confirmPassword: ''
  };

  mounted() {
    this.passwordReset.token = this.$route.params.token;
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

</script>
<style scoped lang="scss">
  .registration-confirm {

  }
  .register-activate-arrow {
    padding-top: 3px;
    display: block;
    float: right;
  }

  .home-form-left h2 {
    line-height: 42px;
    margin-top: 0;
  }

  .pw-set-wrap {
    text-align: left;
  }
  .pw-rules-wrap {
    font-size: 12px;
    margin-bottom: 20px;
  }
  .pw-rule:before {
    font-family: 'Material-Design-Iconic-Font';
    content: "\53";
    margin-right: 5px;
    color: #ccc;
    vertical-align: middle;
  }
  .valid {
    color: #28a745;
    &:before {
      content: "\f267";
      color: #28a745;
    }
  }

</style>
