import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProcessStatusInfoComponent } from './components/process-status-info/process-status-info.component';

@NgModule({
    declarations: [ProcessStatusInfoComponent],
    imports: [CommonModule],
    exports: [ProcessStatusInfoComponent],
})
export class SharedModule {}
