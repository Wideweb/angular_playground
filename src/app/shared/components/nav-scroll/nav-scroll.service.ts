import { Injectable, QueryList } from '@angular/core';
import { WindowRef } from '../../services/window-ref';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Scroll } from '../scroll/scroll';
import { NavScrollSettings } from './nav-scroll-settings';
import { NavScrollSection } from './nav-scroll-section.directive';
import { NavScrollTitle } from './nav-scroll-section-title.directive';

@Injectable()
export class NavScrollService {

	constructor(
		private winRef: WindowRef, 
		private scroll: Scroll, 
		private settings: NavScrollSettings) { }

	updateCurrentSection(sections: QueryList<NavScrollSection>, titles: QueryList<NavScrollTitle>): string {
		if (!sections || !titles) {
			return null;
		}

		const sectionsArray = sections.toArray();

		for (let i = 0; i < sectionsArray.length; i++) {
			if (this.isCurrentSection(sectionsArray, i)) {
				this.activateTitle(titles, i);
				return sectionsArray[i].id;
			}
		}

		return null;
	}

	private isCurrentSection(sections: Array<NavScrollSection>, index: number): boolean {
		const section = sections[index];

		if (section.positionTop > this.winRef.nativeWindow.pageYOffset + this.settings.ativeSectionOffsetTop) {
			return false;
		}

		const hasNextSection = index < sections.length - 1;
		if (!hasNextSection) {
			return true;
		}

		const nextSection = sections[index + 1];
		const targetY = this.winRef.nativeWindow.pageYOffset + this.settings.ativeSectionOffsetTop;
		return nextSection.positionTop > targetY;
	}

	private activateTitle(titles: QueryList<NavScrollTitle>, index: number) {
		this.deactivateAll(titles);
		let selectedTitle = titles.toArray()[index];
		selectedTitle.isActive = true;
	}

	private deactivateAll(titles: QueryList<NavScrollTitle>) {
		titles.forEach(title => title.isActive = false);
	}

	select(sections: QueryList<NavScrollSection>, id: string): boolean {
		if (!id) {
			return false;
		}

		let selectedSection = sections.find(section => section.id == id);
		if (selectedSection) {
			this.scroll.scroll(selectedSection.positionTop - this.settings.autoScrollOffsetTop);
			return true;
		}

		return false;
	}

}
