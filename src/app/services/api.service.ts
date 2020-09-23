import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SearchResponse} from '../interfaces/search-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public SearchByPhrase(phrase: string) {
    return this.httpClient.get<SearchResponse>("https://localhost:44320/Searches/v1/searchByQuery?phrase=" + phrase);
  }
}
