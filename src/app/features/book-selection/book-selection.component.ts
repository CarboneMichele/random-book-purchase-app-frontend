import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { BooksService } from '@app/core/services/books.service';
import { ProcessStatusService } from '@app/core/services/process-status.service';

import { Constants } from '@app/core/constants/constants';
import { Genre } from '@app/shared/models/book.model';
import { ProcessStatus } from '@app/shared/models/status.model';

@Component({
    selector: 'rbp-book-selection',
    templateUrl: './book-selection.component.html',
    styleUrls: ['./book-selection.component.scss'],
})
export class BookSelectionComponent implements OnInit, OnDestroy {
    public genresData: Genre[] = [];
    public purchaseInProgress = false;
    public activeGenre!: Genre;
    public processStatusSubscription!: Subscription;
    public processStatusConfig!: ProcessStatus;

    constructor(private booksService: BooksService, private processStatusService: ProcessStatusService) {}

    //
    // ─── LIFECYCLE HOOKS ────────────────────────────────────────────────────────────
    //

    ngOnInit(): void {
        this.listenToProcessStatusChange();
        this.getGenresData();
    }

    //
    // ─── HTTP METHODS ───────────────────────────────────────────────────────────────
    //

    getGenresData(): void {
        this.processStatusService.emitStatus({ loading: true, error: false, message: Constants.PROCESS_STATUS_MESSAGE_FETCH_GENRES });
        this.booksService.getGenres().subscribe(
            (genres: Genre[]) => {
                this.processStatusService.emitStatus({
                    loading: false,
                    error: false,
                    message: Constants.PROCESS_STATUS_MESSAGE_FETCH_GENRES_SUCCESS,
                });
                this.genresData = genres;
            },
            (err: HttpErrorResponse) => {
                this.processStatusService.emitStatus({
                    loading: false,
                    error: true,
                    message: Constants.PROCESS_STATUS_MESSAGE_FETCH_GENRES_ERROR,
                });
            }
        );
    }

    startPurchaseProcess(genre: Genre): void {
        // checking process loading status in order to prevent multiple http calls
        if (!this.processStatusConfig.loading) {
            this.processStatusService.emitStatus({
                loading: true,
                error: false,
                message: Constants.PROCESS_STATUS_MESSAGE_PURCHASE_IN_PROGRESS,
            });
            this.booksService.buyRandomBookOnAmazon(genre.value).subscribe(
                () => {
                    this.processStatusService.emitStatus({
                        loading: false,
                        error: false,
                        message: Constants.PROCESS_STATUS_MESSAGE_PURCHASE_SUCCESS,
                    });
                },
                (err: HttpErrorResponse) => {
                    this.processStatusService.emitStatus({
                        loading: false,
                        error: true,
                        message: Constants.PROCESS_STATUS_MESSAGE_PURCHASE_ERROR,
                    });
                }
            );
        }
    }

    //
    // ─── PROCESS STATUS METHODS/SUBSCRIPTIONS ─────────────────────────────────────────────────────
    //

    listenToProcessStatusChange(): void {
        this.processStatusSubscription = this.processStatusService.processStatusSourceUpdated$.subscribe((statusConfig: ProcessStatus) => {
            this.processStatusConfig = statusConfig;
        });
    }

    //
    // ─── TEMPLATE PROPERTIES/EVENTS METHODS ───────────────────────────────────────────────────────────
    //

    setActiveClassOnCard(genre: Genre): void {
        this.activeGenre = genre;
    }

    onGenreSelected(genre: Genre): void {
        this.setActiveClassOnCard(genre);
        this.startPurchaseProcess(genre);
    }

    //
    // ─── ON DESTROY ─────────────────────────────────────────────────────────────────
    //

    ngOnDestroy(): void {
        if (this.processStatusSubscription) {
            this.processStatusSubscription.unsubscribe();
        }
    }
}
