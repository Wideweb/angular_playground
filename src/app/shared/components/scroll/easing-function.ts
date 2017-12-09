export class EasingFunction {
	public static easeInQuad = (time) => time * time; // accelerating from zero velocity
	public static easeOutQuad = (time) => time * (2 - time); // decelerating to zero velocity
	public static easeInOutQuad = (time) =>  time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
	public static easeInCubic = (time) =>  time * time * time; // accelerating from zero velocity
	public static easeOutCubic = (time) =>  (--time) * time * time + 1; // decelerating to zero velocity
	public static easeInOutCubic = (time) =>  time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
	public static easeInQuart = (time) =>  time * time * time * time; // accelerating from zero velocity
	public static easeOutQuart = (time) =>  1 - (--time) * time * time * time; // decelerating to zero velocity
	public static easeInOutQuart = (time) =>  time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
	public static easeInQuint = (time) =>  time * time * time * time * time; // accelerating from zero velocity
	public static easeOutQuint = (time) =>  1 + (--time) * time * time * time * time; // decelerating to zero velocity
	public static easeInOutQuint = (time) =>  time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; 
}