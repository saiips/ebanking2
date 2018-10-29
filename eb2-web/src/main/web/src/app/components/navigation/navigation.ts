import {Component, OnInit} from '@angular/core';

declare let $: any;

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.html'
})
export class NavigationComponent implements OnInit {
    constructor() {

    }

    public ngOnInit(): void {

        setTimeout(() => {
            $('#menu-toggle').sideNav();
          },1000);

        //$("#menu-toggle").sideNav();
    }

}
