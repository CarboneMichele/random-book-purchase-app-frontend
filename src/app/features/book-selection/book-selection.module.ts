import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { BookSelectionRoutingModule } from './book-selection-routing.module';
import { BookSelectionComponent } from './book-selection.component';

@NgModule({
    declarations: [BookSelectionComponent],
    imports: [CommonModule, BookSelectionRoutingModule, SharedModule],
})
export class BookSelectionModule {}
