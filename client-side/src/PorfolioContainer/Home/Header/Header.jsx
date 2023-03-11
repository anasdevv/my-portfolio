import React, { useState } from 'react';
import { TOTAL_SCREENS, GET_SCREEN_INDEX } from '../../../utils/commonUtils';
import ScrollService from '../../../utils/ScrollService';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
export default function Header() {
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [showHeaderOptions, setShowHeaderOptions] = useState(false);
  const updateCurrentScreen = (currentScreen) => {
    if (!currentScreen || currentScreen.screenInVeiw) return;
    let screenIndex = GET_SCREEN_INDEX(currentScreen.screenInVeiw);
    if (screenIndex < 0) return;
  };
  let currentScreenSubscription =
    ScrollService.currentScreenBroadCaster.subscribe(updateCurrentScreen);
  const getHeaderOptionsClass = (index) => {
    let classes = 'header-option';
    if (index < TOTAL_SCREENS - 1) {
      classes += 'header-option-seperator';
    }
    if (selectedScreen === index) {
      classes += 'selected-header-option';
    }
    return classes;
  };
  const switchScreen = (index, screen) => {
    let screenComponent = document.getElementById(screen.screen_name);
    if (!screenComponent) return;
    screenComponent.scrollIntoView({ behavior: 'smooth' });
    setSelectedScreen(index);
    setShowHeaderOptions(false);
  };
  const getHeaderOptions = () => {
    return TOTAL_SCREENS.map((screen, i) => (
      <div
        key={screen.screen_name}
        className={getHeaderOptionsClass(i)}
        onClick={() => {
          switchScreen(i, screen);
        }}
      >
        <span> {screen.screen_name}</span>
      </div>
    ));
  };
  return (
    <div
      className="header-container"
      onClick={() => setShowHeaderOptions(!showHeaderOptions)}
    >
      <div className="header-parent">
        <div
          className="header-hamburger"
          onClick={() => setShowHeaderOptions(!showHeaderOptions)}
        >
          <FontAwesomeIcon className="header-hamburger-bars" icon={faBars} />
        </div>
        <div className="header-logo">
          <span>Anas!</span>
        </div>
        <div
          className={
            showHeaderOptions
              ? 'header-options show-hamburger-options'
              : 'header-options'
          }
        >
          {getHeaderOptions()}
        </div>
      </div>
    </div>
  );
}
