<template>
  <section>
    <section class="section home home-form-left" id="registration-simple">
      <!-- <div class="bg-overlay"></div> -->
      <div class="container">
        <div class="row">
          <div class="col-lg-6">

            <div class="home-wrapper">
              <h2 class="animated fadeInDown wow" data-wow-delay=".1s">
                Your <span class="text-colored">Noteler</span> account is ready &nbsp;<strong class="register-activate-arrow"><i class="zmdi zmdi-arrow-right"></i></strong>
              </h2>
              <div class="animated fadeInDown wow" data-wow-delay=".2s">
                To finish up you just set a password and then login.
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
                <input type="password" class="form-control" v-model="registration.password"
                       placeholder="Password" required="required">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" v-model="registration.confirmPassword"
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

    <AccountInstructions/>

    <b-modal id="modal-center" ref="problemActivating"
             @ok="show=false"
             :ok-only="true"
             :ok-title="'Ok'"
             :ok-variant="'primary'"
             centered title="Account Activation Failed">
      <p class="my-4">Oops! There was a problem activating your account. If the problem continues, you can resend the activation E-Mail.</p>
    </b-modal>
  </section>

</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import http from '@/global/services/http';
import environment from '@/global/services/environment';
import router from '@/router';
import AccountInstructions from '@/components/Landing/AccountInstructions.vue';

const api = {
  setNewPassword: () => environment.getEndpoint(`account/register/confirm`)
};

@Component({
  components: {
    AccountInstructions
  }
})
export default class RegistrationConfirm extends Vue {
    registration = {
      token: '',
      password: '',
      confirmPassword: ''
    };

    mounted() {
      this.registration.token = this.$route.params.token;
    }

    setPassword() {
      if (this.passwordValid) {
        http.post(api.setNewPassword(), this.registration)
          .then(() => {
            router.push({name: 'Login'});
          })
          .catch(() => {
            this.$refs.problemActivating.show();
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
      return (this.registration.password && this.registration.confirmPassword) &&
        (this.registration.password === this.registration.confirmPassword);
    }

    get lengthValid() {
      return this.registration.password.length >= 8;
    };

    get uppercaseValid() {
      return /[A-Z]/.test(this.registration.password);
    };

    get lowercaseValid() {
      return /[a-z]/.test(this.registration.password);
    };

    get numberOrSpecialValid() {
      return /\d/.test(this.registration.password) ||
        /[!@#$%^&*()]/.test(this.registration.password);
    }

    get numberValid() {
      return /\d/.test(this.registration.password);
    };

    get specialValid() {
      return /[!@#$%^&*()]/.test(this.registration.password);
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
