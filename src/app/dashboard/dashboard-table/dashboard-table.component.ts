import { Component, OnInit, Input } from '@angular/core';
import { GridSettings } from '../../grid/grid-settings.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-dashboard-table',
    templateUrl: './dashboard-table.component.html',
    styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {

    @Input() gridSettings: GridSettings;
    @Input() gridData$: Observable<Array<any>>;

    constructor() { }

    ngOnInit() {
    }

}
