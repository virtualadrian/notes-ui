<template>
  <section class="footer portal-footer"
           v-if="$route.path.indexOf('/portal/note/edit') < 0">
    <!-- FOOTER -->
    <footer class="section bg-gray footer footer-sm">
      <div class="container">

        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <a class="navbar-brand logo" href="index.html">
                <i class="zmdi zmdi-navigation"></i> <span class="text-uppercase">noteler</span>
              </a>

              <ul class="list-inline social-circle">
                <li class="list-inline-item"><a href=""> <i class="zmdi zmdi-facebook"></i> </a></li>
                <li class="list-inline-item"><a href=""> <i class="zmdi zmdi-twitter"></i> </a></li>
                <li class="list-inline-item"><a href=""> <i class="zmdi zmdi-google-plus"></i> </a></li>
                <li class="list-inline-item"><a href=""> <i class="zmdi zmdi-apple"></i> </a></li>
                <li class="list-inline-item"><a href=""> <i class="zmdi zmdi-instagram"></i> </a></li>
              </ul>

              <ul class="list-inline menu-list m-t-30">
                <li class="list-inline-item"><a href=""> About Us</a></li>
                <li class="list-inline-item"><a href=""> Help & Support</a></li>
                <li class="list-inline-item"><a href=""> Terms & Conditions</a></li>
                <li class="list-inline-item"><a href=""> Privacy Policy</a></li>
              </ul>

              <p class="text-muted m-b-0"> © Noteler {{currentYear}} All Right Reserved</p>

            </div>
          </div>
        </div>
        <!-- end row -->

      </div>
    </footer>

    <!-- END FOOTER -->
  </section>

</template>
<script>
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class PortalFooter extends Vue {
  currentYear = (new Date()).getFullYear();
}
</script>
<style scoped lang="scss">
  .portal-footer {

    &.hiding {
      display: none;
    }
  }

</style>
