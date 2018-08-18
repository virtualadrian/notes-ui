import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
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
    size: 25
  };

  refreshSearch(page) {
    const next = this.search.page + 1;
    const nextPage = (next > this.result.totalPages ? this.result.totalPages : next);
    this.search.page = page || nextPage;
    router.push({name: 'PortalSearchNote',
      params: {
        term: this.search.term,
        page: this.search.page,
        size: this.search.size
      }});
  }

  searchNotes() {
    http.get(api.searchNotes(this.search.term,
      this.search.page - 1,
      this.search.size))
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
    this.search.size = parseInt(this.$route.params.size) || 25;

    this.searchNotes();
  }
}
