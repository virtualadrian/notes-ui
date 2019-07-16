<template>
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
                <router-link :to="{name: 'PasswordReset'}"
                             class="btn btn-primary btn-shadow btn-rounded w-lg">
                  Reset Password
                </router-link>
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
                <router-link :to="{name: 'RegistrationFull'}"
                             class="btn btn-primary btn-shadow btn-rounded w-lg">
                  Register Now
                </router-link>
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
                <router-link :to="{name: 'SupportHome'}"
                             class="btn btn-primary btn-shadow btn-rounded w-lg">
                  Register Now
                </router-link>
              </p>
            </div> <!-- /service-detail -->
          </div> <!-- /service-item -->
        </div> <!-- /col -->
      </div> <!--end row -->
    </div> <!-- end container -->
  </section>

</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import http from '@/global/services/http';
import environment from '@/global/services/environment';
import router from '@/router';

const api = {
  sendPasswordReset: () => environment.getEndpoint(`account/password/reset/send`)
};

@Component
export default class AccountInstructions extends Vue {
  reset = {
    email: ''
  };

  mounted() {
  }

  sendReset() {
    http.post(api.sendPasswordReset(), this.reset)
      .then(() => {
        router.push({name: 'Login'});
        this.$refs.resetSent.show();
      })
      .catch(() => {
        this.$refs.problemResetting.show();
      });
  }
  resetSentOk() {
    this.$refs.resetSent.hide();
    router.push({name: 'Login'});
  }
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
