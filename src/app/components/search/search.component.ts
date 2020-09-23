import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchResponse } from '../../interfaces/search-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: SearchResponse;
  errorMessage: string;
  isLoading: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  searchByPhrase(phrase) {
    this.errorMessage = null;
    this.results = null;

    if (phrase) {
      this.isLoading = true;

      this.apiService.SearchByPhrase(phrase).subscribe((res) => {
        if (res) {
          this.results = res;
          this.isLoading = false;
        }
        else {
          this.errorMessage = "No results";
          this.isLoading = false;
        }
      },
        ((err) => {
          if(err.status===400){
            this.errorMessage = "Bad request. Try to use a different phrase";
          }
          else if(err.status===500){
            this.errorMessage = "Server error. Something went wrong";
          }
          else{
            this.errorMessage = "General error. Something went wrong";
          }
          this.isLoading = false;
        }))
    }
    else {
      this.errorMessage = "Please search a phrase";
    }
  }
}
