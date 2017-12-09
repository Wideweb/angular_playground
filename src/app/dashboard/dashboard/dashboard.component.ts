import { Component, OnInit } from '@angular/core';
import { SelectableSettings, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query/dist/es/state';
import { SortDescriptor } from '@progress/kendo-data-query/dist/es/sort-descriptor';
import { orderBy } from '@progress/kendo-data-query/dist/es/array.operators';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { GridSettings, GridColumn } from '../../grid/grid-settings.model';
import { HeroService } from '../../services/hero.service';
import { GridSettingsService } from '../../services/grid-settings.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    gridSettings: GridSettings;
    defaultGridSettings: GridSettings;
    gridData$: Observable<Array<any>>;
    settingsCollapsed: boolean;

    constructor(
        private heroService: HeroService,
        private gridSettingsService: GridSettingsService,
        private store: Store<IAppState>) {
        this.defaultGridSettings = gridSettingsService.getPatientGridSettings();
        this.gridSettings = gridSettingsService.getPatientGridSettings();
        this.gridSettings.columns = [];
        this.gridData$ = heroService.getPatients();
        this.settingsCollapsed = false;
    }

    ngOnInit() {
    }

    onColumnSelected(column) {
        this.gridSettings.columns.push(column);
    }

    onColumnRemoved(column) {
        const index = this.gridSettings.columns.indexOf(column);
        if (index > -1) {
            this.gridSettings.columns.splice(index, 1);
        }
    }
}
