import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable(
    { providedIn: 'root' }
)
export class LoaderService {

    @BlockUI() blockUI: NgBlockUI;

    constructor() { }

    show() {
        this.blockUI.start('Carregando...');
    }
    hide() {
        this.blockUI.stop();
    }
}