import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Genre } from '@app/shared/models/book.model';

import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    private baseUrl: string = environment.baseUrl;

    constructor(private httpClient: HttpClient) {}

    getGenres(): Observable<Genre[]> {
        return this.httpClient.get<Genre[]>(`${this.baseUrl}/genres`);
    }

    buyRandomBookOnAmazon(bookUrl: string): Observable<[]> {
        return this.httpClient.post<[]>(`${this.baseUrl}/purchase`, { bookUrl: bookUrl });
    }
}
