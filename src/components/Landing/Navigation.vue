<template>
  <section class="navigation">
    <!-- STRAT NAVBAR -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark">
      <div class="container">
        <!-- LOGO -->
        <a class="navbar-brand logo" href="index.html">
          <i class="zmdi zmdi-book"></i> <span>noteler</span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <i class="zmdi zmdi-menu"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="nav navbar-nav navbar-right ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/account/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-inverse btn-bordered navbar-btn nav-link" to="/account/register">Signup</router-link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <!-- END NAVBAR -->
  </section>
</template>
<script>
export default {
  name: 'navigation',
  components: {},
  props: [],
  data() {
    return {

    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  }
};

</script>
<style scoped lang="scss">
  .navigation {

  }
</style>
