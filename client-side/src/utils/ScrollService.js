import { TOTAL_SCREENS } from './commonUtils';
import { Subject } from 'rxjs';
export default class ScrollService {
  static scrollHandler = new ScrollService();
  static currentScreenBroadCaster = new Subject();
  static currentScreenFadeIn = new Subject();
  constructor() {
    window.addEventListener('scroll', this.checkCurrentScreenUnderViewPort);
  }
  scrollToHireMe() {
    // change id later
    let contactMeScreen = document.getElementById('ContactMe');
    if (!contactMeScreen) return;
    contactMeScreen.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToHome() {
    // change id later
    let homeScreen = document.getElementById('Home');
    if (!homeScreen) return;
    homeScreen.scrollIntoView({ behavior: 'smooth' });
  }
  isElementInView = (elem, type) => {
    let rec = elem.getBoundingClientRect();
    let elementTop = rec.top;
    let elementBottom = rec.Bottom;

    let partiallyVisible =
      elementTop < window.innerHeight && elementBottom >= 0;
    let completelVisible =
      elementTop >= 0 && elementBottom <= window.innerHeight;

    switch (type) {
      case 'partial':
        return partiallyVisible;

      case 'complete':
        return completelVisible;

      default:
        return false;
    }
  };
  checkCurrentScreenUnderViewPort(event) {
    if (!event || Object.keys(event).length < 1) return;
    for (let screen of TOTAL_SCREENS) {
      let screenFromDOM = document.getElementById(screen.screen_name);
      if (!screenFromDOM) continue;
      let fullyVisable = this.isElementInView(screenFromDOM, 'complete');
      let partiallyVisable = this.isElementInView(screenFromDOM, 'partial');
      if (fullyVisable || partiallyVisable) {
        if (partiallyVisable && screen.alreadyRendered) {
          ScrollService.currentScreenFadeIn.next({
            fadeInScreen: screen.screen_name,
          });
          screen['alreadyRendered'] = true;
          break;
        }
        if (fullyVisable) {
          ScrollService.currentScreenBroadCaster({
            screenInView: screen.screen_name,
          });
          break;
        }
      }
    }
  }
}
