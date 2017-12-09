import { Component, OnInit, Input } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query/dist/es/sort-descriptor';
import { GridDataResult, SelectableSettings, PageChangeEvent } from '@progress/kendo-angular-grid';
import { orderBy } from '@progress/kendo-data-query/dist/es/array.operators';
import { GridSettings } from './grid-settings.model';
import { ViewEncapsulation } from '@angular/core';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
    @Input() gridData$: Observable<Array<any>>;
    @Input() gridSettings: GridSettings;

    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    private selectableSettings: SelectableSettings;
    private sortableSettings;
    private skip: number = 0;
    private gridData: Array<any>;

    ngOnInit() {
        this.sortableSettings = {
            allowUnsort: this.gridSettings.allowUnsort,
            mode: this.gridSettings.multipleSort ? 'multiple' : 'single'
        };

        this.selectableSettings = {
            checkboxOnly: this.gridSettings.checkboxOnly,
            mode: this.gridSettings.multipleSelection ? 'multiple' : 'single'
        } as SelectableSettings;

        this.gridData$.subscribe(data => {
            this.gridData = data;
            this.updateGridView();
        });
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.updateGridView();
    }

    private updateGridView(): void {
        let data = orderBy(this.gridData, this.sort).slice(this.skip, this.skip + this.gridSettings.pageSize);

        this.gridView = {
            data: data,
            total: this.gridData.length
        };
    }

    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.updateGridView();
    }
}   