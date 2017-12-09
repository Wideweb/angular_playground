import { Injectable } from '@angular/core';
import { ScrollSettings } from '../scroll/scroll-settings';

@Injectable()
export class NavScrollSettings {
    autoScrollOffsetTop: number = 55;
	ativeSectionOffsetTop: number = 200;
	scrollSettings: ScrollSettings = new ScrollSettings();
}