import { Component, Input } from '@angular/core';

import { ProcessStatus } from '@app/shared/models/status.model';

@Component({
    selector: 'rbp-process-status-info',
    templateUrl: './process-status-info.component.html',
    styleUrls: ['./process-status-info.component.scss'],
})
export class ProcessStatusInfoComponent {
    @Input() statusConfig!: ProcessStatus;
}
