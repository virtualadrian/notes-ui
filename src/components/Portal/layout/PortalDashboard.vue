<template>
  <!-- HOME -->
  <section class="portal-dashboard">
    <section class="home">
      <!-- <div class="bg-overlay"></div> -->
      <div class="container">
        <div class="row">
          <div class="col-lg-12">

            <div class="home-wrapper text-center">
              <h2 class="animated fadeInDown wow" data-wow-delay=".1s">
                Noteler <span class="text-colored">Member Dashboard</span>
              </h2>
              <div class="row">
                <div class="col-lg-10 offset-lg-1">
                  <p class="animated fadeInDown wow text-muted" data-wow-delay=".2s">
                    Welcome! Get started by searching below, or
                    <router-link :to="{ name: 'PortalNoteDetail'}">add a new note!</router-link>
                  </p>
                </div>
              </div>
              <div class="text-center search-form">
                <div class="search">
                  <input type="text"
                         v-on:keyup.enter="searchNotes"
                         v-model="noteSearch.term" placeholder="Search Notes ...">
                  <button v-on:click="searchNotes">Search</button>
                </div>
              </div>

              <div class="clearfix"></div>
            </div><!-- home wrapper -->

          </div> <!-- end col -->
        </div> <!-- end row -->
      </div> <!-- end container -->
    </section>
    <!-- END HOME -->
    <!-- FAQ -->
    <section class="section" id="faq">
      <div class="container">

        <div class="row">
          <div class="col-lg-12 text-center">
            <div class="title-box">
              <p class="title-alt">Faq</p>
              <h3 class="fadeIn animated wow" data-wow-delay=".1s">Personal Pop-Quiz</h3>
              <div class="border"></div>
            </div>
          </div>
        </div> <!-- end row -->

        <div class="row m-t-30">
          <div class="col-lg-5 offset-lg-1">
            <!-- Question/Answer -->
            <div class="question-q-box">Q.</div>
            <div class="animated fadeInLeft wow" data-wow-delay=".1s">
              <h4 class="question" data-wow-delay=".1s">What is Lorem Ipsum?</h4>
              <p class="answer">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s.</p>
            </div>

            <!-- Question/Answer -->
            <div class="question-q-box">Q.</div>
            <div class="animated fadeInLeft wow" data-wow-delay=".3s">
              <h4 class="question">Why use Lorem Ipsum?</h4>
              <p class="answer">Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio
                iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando
                nam. Mutat convenirete.</p>
            </div>

            <!-- Question/Answer -->
            <div class="question-q-box">Q.</div>
            <div class="animated fadeInLeft wow" data-wow-delay=".5s">
              <h4 class="question">How many variations exist?</h4>
              <p class="answer">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s.</p>
            </div>

          </div>
          <!--/col-md-5 -->

          <div class="col-lg-5">
            <!-- Question/Answer -->
            <div class="question-q-box">Q.</div>
            <div class="animated fadeInRight wow" data-wow-delay=".2s">
              <h4 class="question">Is safe use Lorem Ipsum?</h4>
              <p class="answer">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s.</p>
            </div>

            <!-- Question/Answer -->
            <div class="question-q-box">Q.</div>
            <div class="animated fadeInRight wow" data-wow-delay=".4s">
              <h4 class="question">When can be used?</h4>
              <p class="answer">Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio
                iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando
                nam. Mutat convenirete.</p>
            </div>

            <!-- Question/Answer -->
            <div class="question-q-box">Q.</div>
            <div class="animated fadeInRight wow" data-wow-delay=".6s">
              <h4 class="question">License &amp; Copyright</h4>
              <p class="answer">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s.</p>
            </div>

          </div>
          <!--/col-md-5-->
        </div>

      </div>
    </section>
    <!-- END FAQ -->
  </section>

</template>
<script>
  import { Component, Vue } from 'vue-property-decorator';
  import router from '@/router';

  @Component
  export default class PortalDashboard extends Vue {
    noteSearch = {
      term: ''
    };

    mounted() {
    }
    searchNotes() {
      router.push({name: 'PortalSearchNote',
        params: {
          term: this.noteSearch.term,
          page: 1,
          size: 10
        }});
    }
  }

</script>
<style scoped lang="scss">
  .portal-dashboard {

    .search-form {
      margin-top: 20px;

      .search {
        position: relative;
        max-width: 600px;
        margin: 0 auto;

        input {
          width: 100%;
          font-size: 17px;
          border: none;
          outline: none !important;
          padding: 15px 150px 15px 30px;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 30px;
        }

        button {
          position: absolute;
          top: 4px;
          right: 4px;
          outline: none !important;
          border-radius: 30px;
          border: none;
          color: #fff;
          font-size: 17px;
          background: #374760;
          padding: 11px 30px;
          cursor: pointer;
        }
      }
    }
  }

</style>
