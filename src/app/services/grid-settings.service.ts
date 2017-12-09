import { Injectable } from '@angular/core';
import { GridSettings, GridColumn } from '../grid/grid-settings.model';

@Injectable()
export class GridSettingsService {

    getPatientGridSettings(): GridSettings {
        const columns = new Array<GridColumn>();
        columns.push(new GridColumn('id', 'ID', true));
        columns.push(new GridColumn('name', 'NAME'));
        columns.push(new GridColumn('age', 'AGE'));

        return new GridSettings(columns, 2, true, true, false, false);
    }

}
