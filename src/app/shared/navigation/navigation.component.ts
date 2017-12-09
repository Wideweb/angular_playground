import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    isCollapsed: boolean = true;
    lookupOptions: Array<any> = [];

    constructor(public auth: AuthService) {
        this.lookupOptions.push({ id: 1, name: 'Donor' });
        this.lookupOptions.push({ id: 2, name: 'Patient' });
    }

    ngOnInit() {
    }

    triggerLookup({ term, option }) {
        console.log(term + " " + option.name);
    }

}
