<template>
<section>
  <FeaturesList/>
  <!-- END HOME -->
</section>

</template>

<script>
import FeaturesList from '@/components/FeaturesList';
import auth from '@/services/auth';

export default {
  name: 'HelloWorld',
  components: {FeaturesList},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  methods: {
    login () {
      auth.login('adrian9', 'adrian1');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
