<template>
  <section class="home-component">
    <RegistrationSimple/>
    <FeatureList/>
  </section>
</template>
<script>
import RegistrationSimple from '@/components/Landing/RegistrationSimple.vue';
import FeatureList from '@/components/Landing/FeatureList.vue';

export default {
  name: 'home',
  components: {RegistrationSimple, FeatureList},
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
<style src="./Home.scss" scoped lang="scss">
  .home-component {

  }

</style>
