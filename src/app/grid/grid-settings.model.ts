export class GridSettings {
    columns: Array<GridColumn> = [];
    pageSize: number;
    multipleSelection: boolean;
    allowUnsort: boolean;
    checkboxOnly: boolean;
    multipleSort: boolean;

    constructor(
        columns: Array<GridColumn> = [],
        pageSize: number = 0,
        multipleSelection: boolean = true,
        allowUnsort: boolean = true,
        checkboxOnly: boolean = false,
        multipleSort: boolean = false) {

        this.columns = columns;
        this.pageSize = pageSize;
        this.multipleSelection = multipleSelection;
        this.allowUnsort = allowUnsort;
        this.checkboxOnly = checkboxOnly;
        this.multipleSort = multipleSort;
    }
}

export class GridColumn {
    field: string;
    title: string;
    locked: boolean;

    constructor(field: string, title: string, locked: boolean = false) {
        this.field = field;
        this.title = title;
        this.locked = locked;
    }
}
