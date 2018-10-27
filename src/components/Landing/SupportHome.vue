<template>

  <section class="section section-pad feature-list" id="features">
    <div class="container">

      <div class="row">
        <div class="col-lg-12 text-center">
          <div class="title-box">
            <p class="title-alt">01.</p>
            <h3 class="fadeIn animated wow" data-wow-delay=".1s">How It Works ?</h3>
            <div class="border"></div>
          </div>
        </div>
      </div> <!-- end row -->

      <div class="row text-center">
        <div class="col-lg-4">
          <div class="service-item animated fadeInLeft wow" data-wow-delay=".1s">
            <h2><i class="zmdi zmdi-collection-item-1 text-colored"></i></h2>
            <div class="service-detail">
              <h4>Strategy Solutions</h4>
              <p>We put a lot of effort in design, as it’s the most important ingredient of successful website.Sed ut perspiciatis unde omnis iste natus error sit.</p>
            </div> <!-- /service-detail -->
          </div> <!-- /service-item -->
        </div> <!-- /col -->

        <div class="col-lg-4">
          <div class="service-item animated fadeInDown wow" data-wow-delay=".3s">
            <h2><i class="zmdi zmdi-collection-item-2 text-colored"></i></h2>
            <div class="service-detail">
              <h4>Digital Design</h4>
              <p>We put a lot of effort in design, as it’s the most important ingredient of successful website.Sed ut perspiciatis unde omnis iste.</p>
            </div> <!-- /service-detail -->
          </div> <!-- /service-item -->
        </div> <!-- /col -->

        <div class="col-lg-4">
          <div class="service-item animated fadeInRight wow" data-wow-delay=".5s">
            <h2><i class="zmdi zmdi-collection-item-3 text-colored"></i></h2>
            <div class="service-detail">
              <h4>SEO</h4>
              <p>We put a lot of effort in design, as it’s the most important ingredient of successful website.Sed ut perspiciatis unde omnis iste.</p>
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
export default class SupportHome extends Vue {
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
  .feature-list {

  }

</style>
