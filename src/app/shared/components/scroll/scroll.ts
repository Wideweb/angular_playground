import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { ScrollSettings } from "./scroll-settings";
import { WindowRef } from '../../services/window-ref';
import { Injectable } from '@angular/core';

@Injectable()
export class Scroll {

	private scrollAnimation: Subscription;

	constructor(private winRef: WindowRef) { }

	scroll(targetY: number, settings: ScrollSettings = new ScrollSettings()) {
		if (this.scrollAnimation) {
			this.scrollAnimation.unsubscribe();
		}
		const moveUp = this.winRef.nativeWindow.pageYOffset > targetY;
		moveUp ? this.scrollUp(targetY, settings) : this.scrollDown(targetY, settings);
	}

	private scrollDown(targetY: number, settings: ScrollSettings) {
		const startLocation = this.winRef.nativeWindow.pageYOffset;
		const distance = targetY - startLocation;

		this.scrollAnimation = Observable.interval(settings.scrollPositionUpdateRate)
			.scan((acc, curr) => (acc + settings.scrollPositionUpdateRate), 0)
			.takeWhile(time => time <= settings.scrollDuration)
			.map(time => time / settings.scrollDuration)
			.map(time => startLocation + distance * settings.easingFunction(time))
			.map(position => position > targetY ? targetY : position)
			.do(position => this.winRef.nativeWindow.scrollTo(0, position))
			.takeWhile(position => position < targetY)
			.subscribe();
	}

	private scrollUp(targetY: number, settings: ScrollSettings) {
		const startLocation = this.winRef.nativeWindow.pageYOffset;
		const distance = startLocation - targetY;

		this.scrollAnimation = Observable.interval(settings.scrollPositionUpdateRate)
			.scan((acc, curr) => (acc + settings.scrollPositionUpdateRate), 0)
			.takeWhile(time => time <= settings.scrollDuration)
			.map(time => time / settings.scrollDuration)
			.map(time => startLocation - distance * settings.easingFunction(time))
			.map(position => position > targetY ? position : targetY)
			.do(position => this.winRef.nativeWindow.scrollTo(0, position))
			.takeWhile(position => targetY < position)
			.subscribe();
	}
}