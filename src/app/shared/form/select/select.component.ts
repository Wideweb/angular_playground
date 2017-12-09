import { Component, OnInit, Input, AfterViewChecked, forwardRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Lookup } from './look-up';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

    @Input() name: string;
    @Input() id: string;
    @Input() url: string;

    private _selectedItem: any;
    private searchText: string;
    private searchResultShown: Boolean;

    private items$: Observable<any[]>;
    private searchTerms = new Subject<string>();

    propagateChange = (_: any) => { };
    touched = () => { };

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.items$ = this.searchTerms.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((term: string) => this.loadMatches(term)),
        );
    }

    loadMatches(term): Observable<Lookup[]> {
        const url = `${this.url}?name=${term}`;
        return this.http.get<Lookup[]>(url).pipe(
            tap((items => this.findMatch(items, term)))
        );
    }

    findMatch(items, term) {
        var match = items.find(item => {
            return item.name.toLowerCase() == term.toLowerCase();
        });

        if (match) {
            this.selectedItem = match.id;
            this.searchText = match.name;
        } else {
            this.selectedItem = null;
        }
    }

    loadItem(id) {
        if (!id) {
            this.selectedItem = null;
            return;
        }

        const url = `${this.url}/${id}`;
        this.http.get<any>(url).subscribe(item => {
            this.selectedItem = item.id;
            this.searchText = item.name;
        });
    }

    selectItem(item) {
        this.searchResultShown = false;
        this.searchText = item.name;
        this.writeValue(item.id);
        this.search(item.name);
    }

    search(term: string) {
        this.searchTerms.next(term);
    }

    get selectedItem() {
        return this._selectedItem;
    }

    set selectedItem(val) {
        this._selectedItem = val;
        this.propagateChange(this._selectedItem);
    }

    writeValue(id: number): void {
        this.loadItem(id);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.touched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
    }

    touch() {
        this.searchResultShown = true;
        this.search(this.searchText);
        this.touched();
    }
}
