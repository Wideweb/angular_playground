import { EasingFunction } from './easing-function';

export class ScrollSettings {
	scrollDuration: number = 500;
	scrollPositionUpdateRate: number = 10;
	easingFunction: (number) => number = EasingFunction.easeOutQuart;
}