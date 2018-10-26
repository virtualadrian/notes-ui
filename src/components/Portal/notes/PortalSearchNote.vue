<template>

  <section class="portal-search-notes h-auto">

    <div class="container-fluid">
      <div class="row note-action">
        <div class="col-sm-6">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="search-term">Search Results</span>
            </div>
            <input v-model="search.term" type="text"
                   v-on:keyup.enter="refreshSearch"
                   class="form-control search-term-input"
                   placeholder="Search Term" aria-label="Term" aria-describedby="search-term">
          </div>
        </div>
        <div class="col-sm-3 ">
          <b-pagination size="md"
                        v-on:change="goToPage"
                        v-model="search.page"
                        :total-rows="result.totalElements"
                        :per-page="search.size"></b-pagination>
        </div>
        <div class="col-sm-3">
          <button v-on:click="refreshSearch"
                  class="btn btn-success btn-shadow btn-rounded" title="Search">
            Search &nbsp; <i class="zmdi zmdi-search"></i>
          </button>
          <b-dropdown text="Page Size">
            <b-dropdown-item v-on:click="page(10)">10</b-dropdown-item>
            <b-dropdown-item v-on:click="page(25)">25</b-dropdown-item>
            <b-dropdown-item v-on:click="page(50)">50</b-dropdown-item>
            <b-dropdown-item v-on:click="page(100)">100</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="row result">
        <div class="col-sm-4" v-for="note in result.content">
          <div class="card card-shadow" >
            <div class="card-body">
              <h5 class="card-title">
                <router-link :to="{ name: 'PortalNoteView', params: { id: note.id }}">
                  <strong>{{ note.noteTitle }}</strong>
                </router-link>
              </h5>
              <p class="card-text">{{ note.noteBody.substring(0, 350).concat('...') | striphtml }}</p>
              <p class="card-text"><small class="text-muted">{{note.noteCreatedTime | moment("MMMM Do YYYY, h:mm:ss a") }}</small></p>
            </div>
            <div class="card-footer">
              <button class="btn btn-danger btn-shadow btn-rounded float-sm-left" v-on:click="deleteNote(note)">
                <i class="zmdi zmdi-delete"></i>
              </button>

              <router-link :to="{ name: 'PortalNoteView', params: { id: note.id }}" class="btn btn-info btn-shadow btn-rounded float-sm-right">
                <i class="zmdi zmdi-eye"></i>
              </router-link>
              <span class="float-sm-right">&nbsp;</span>
              <router-link :to="{ name: 'PortalNoteDetail', params: { id: note.id }}" class="btn btn-success btn-shadow btn-rounded float-sm-right">
                <i class="zmdi zmdi-edit"></i>
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>

  </section>


</template>
<script>
  import { Component, Vue } from 'vue-property-decorator';
  import router from '@/router/index';
  import http from '@/services/http';
  import environment from '@/services/environment';
  import striphtml from '@/shared/filter/striphtml';

  const api = {
    searchNotes: (term, page, size) => environment.getEndpoint(`note/search/${term}/${page}/${size}`)
  };

  @Component({
    filters: {striphtml}
  })
  export default class PortalSearchNote extends Vue {
    result = {
      content: [],
      totalPages: 0,
      totalElements: 0
    };
    search = {
      term: '',
      page: 1,
      size: 10
    };

    refreshSearch() {
      router.push({name: 'PortalSearchNote',
        params: {
          term: this.search.term,
          page: this.search.page,
          size: this.search.size
        }});
    }

    page(size) {
      this.search.size = size;
      this.search.page = 1;
      this.refreshSearch();
    }

    goToPage(page) {
      const next = this.search.page + 1;
      const nextPage = (next > this.result.totalPages ? this.result.totalPages : next);
      this.search.page = page || nextPage;
      this.refreshSearch();
    }

    searchNotes() {
      http.get(api.searchNotes(this.search.term, this.search.page - 1, this.search.size))
        .then((response) => {
          this.result.content = response.data.content;
          this.result.totalPages = response.data.totalPages;
          this.result.totalElements = response.data.totalElements;
          this.search.page = response.data.number + 1;
        });
    }

    mounted() {
      this.search.term = this.$route.params.term || '';
      this.search.page = parseInt(this.$route.params.page) || 1;
      this.search.size = parseInt(this.$route.params.size) || 10;

      this.searchNotes();
    }
  }

</script>
<style scoped lang="scss">
  .portal-search-notes {
    height: auto;
    min-height: 100%;

    .row {
      display: flex;
      flex-wrap: wrap;

      &.result > div[class*='col-'] {
        display: flex;
      }
    }

    .card {
      width: 100%;
      margin-top: 20px;
    }
  }

  .note-action {
    padding: 25px 0 10px 0px;
    margin-top: 0;
    background-color: #f7f7f7;
  }

</style>
