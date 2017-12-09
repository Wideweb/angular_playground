import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { IAppState } from '../../app.store';
import { Store } from '@ngrx/store';
import { GridSettingsService } from '../../services/grid-settings.service';
import { GridSettings, GridColumn } from '../../grid/grid-settings.model';
import { SetDashboardColumnsAction } from '../actions';

@Component({
    selector: 'app-dashboard-settings-bar',
    templateUrl: './dashboard-settings-bar.component.html',
    styleUrls: ['./dashboard-settings-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardSettingsBarComponent implements OnInit {

    @Input() columns: Array<GridColumn>;
    @Input() selectedColumns: Array<GridColumn>;
    @Output() columnSelected: EventEmitter<GridColumn> = new EventEmitter();
    @Output() columnRemoved: EventEmitter<GridColumn> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onColumnDrop(e: any) {
        this.columnSelected.emit(e.dragData);
    }

    onColumnRemove(column: GridColumn) {
        this.columnRemoved.emit(column);
    }

    isDragEnabled(column: GridColumn) {
        return this.selectedColumns.indexOf(column) < 0;
    }

}
