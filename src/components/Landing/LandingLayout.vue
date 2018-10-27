<template>
  <section class="landing-layout">
    <component v-bind:is="headerNavigationComponent"></component>
    <section class="router-view-content">
      <router-view/>
    </section>
    <div class="push"></div>
    <Footer/>
  </section>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import PortalNavigation from '@/components/Portal/layout/PortalNavigation.vue';
import Navigation from '@/components/Landing/Navigation.vue';
import Footer from '@/components/Landing/Footer.vue';
import auth from '@/global/services/authentication';

@Component({
  components: {Navigation, PortalNavigation, Footer}
})
export default class LandingLayout extends Vue {
  get headerNavigationComponent() {
    return auth.isLoggedIn() ? 'PortalNavigation' : 'Navigation';
  }
}

</script>
<style scoped lang="scss">
  .landing-layout {
  }

</style>
