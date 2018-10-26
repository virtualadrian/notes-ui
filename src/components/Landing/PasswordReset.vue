<template>
  <section class="password-reset">
    <section class="home">
      <!-- <div class="bg-overlay"></div> -->
      <div class="container">
        <div class="row">
          <div class="col-lg-12">

            <div class="home-wrapper text-center">
              <h2 class="animated fadeInDown wow" data-wow-delay=".1s">
                Noteler <span class="text-colored">Password Reset</span>
              </h2>
              <div class="row">
                <div class="col-lg-10 offset-lg-1">
                  <p class="animated fadeInDown wow text-muted" data-wow-delay=".2s">
                    It's ok, we all forget from time to time. We'll send you an E-Mail so you can reset your password.
                  </p>
                </div>
              </div>
              <div class="text-center search-form">
                <div class="search">
                  <input type="text"
                         v-on:keyup.enter="sendReset"
                         v-model="reset.email" placeholder="E-Mail Address ">
                  <button v-on:click="sendReset">Send Reset</button>
                </div>
              </div>

              <div class="clearfix"></div>
            </div><!-- home wrapper -->

          </div> <!-- end col -->
        </div> <!-- end row -->
      </div> <!-- end container -->
    </section>

    <AccountInstructions/>

    <b-modal id="modal-center" ref="resetSent"
             @ok="resetSentOk"
             :ok-only="true"
             :ok-title="'Ok'"
             :ok-variant="'primary'"
             centered title="Password Reset E-Mail Sent">
      <p class="my-4">Donezo! We've sent the E-Mail! Please check your Inbox.</p>
    </b-modal>
    <b-modal id="modal-center" ref="problemResetting"
             @ok="show=false"
             :ok-only="true"
             :ok-title="'Ok'"
             :ok-variant="'primary'"
             centered title="Password Reset Failed">
      <p class="my-4">Oops! There was a problem resetting your password. Please try again.</p>
    </b-modal>
  </section>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';
import router from '@/router';
import AccountInstructions from '@/components/Landing/AccountInstructions/AccountInstructions.vue';

const api = {
  sendPasswordReset: () => environment.getEndpoint(`account/password/reset/send`)
};

  @Component({
    components: {
      AccountInstructions
    }
  })
export default class PasswordReset extends Vue {
    reset = {
      email: ''
    };

    mounted() {
    }

    sendReset() {
      http.post(api.sendPasswordReset(), this.reset)
        .then(() => {
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
  .password-reset {

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
