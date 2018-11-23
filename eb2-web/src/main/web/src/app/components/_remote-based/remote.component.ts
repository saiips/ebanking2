import { Component, ViewChild, ViewContainerRef } from '@angular/core';

import { AddonService } from './addon.service';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css']
})
export class RemoteComponent {
  title = 'app';
  @ViewChild('view', { read: ViewContainerRef })
  view: ViewContainerRef;

  constructor(private addonService: AddonService) {
  }

  load1() {
    const url = 'http://10.0.75.1:7001/addon/bundles/addon.umd.js';

    this.addonService.loadAddon(url).then(cmpRef => {
        this.view.clear();
        this.view.insert(cmpRef.hostView);
    });
  }

  load2() {
    const url = 'http://10.0.75.1:7001/addon2/bundles/addon2.umd.js';

    this.addonService.loadAddon(url).then(cmpRef => {
        this.view.clear();
        this.view.insert(cmpRef.hostView);
    });
  }  
}
