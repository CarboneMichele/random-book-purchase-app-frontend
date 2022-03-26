import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ProcessStatus } from '@app/shared/models/status.model';

@Injectable({
    providedIn: 'root',
})
export class ProcessStatusService {
    public processStatusSource = new BehaviorSubject<ProcessStatus>({
        error: false,
        loading: true,
        message: '',
    });
    public processStatusSourceUpdated$ = this.processStatusSource.asObservable();

    emitStatus(statusConfig: ProcessStatus): void {
        this.processStatusSource.next(statusConfig);
    }
}
