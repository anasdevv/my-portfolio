import { TOTAL_SCREENS } from '../utils/commonUtils';
const mapAllScreen = () => {
  return TOTAL_SCREENS.map((screen) => {
    return screen.component ? (
      <screen.component
        screenName={screen.screen_name}
        key={screen.screen_name}
        id={screen.screen_name}
      />
    ) : (
      <div key={screen.screen_name}></div>
    );
  });
};
function PortfolioContainer() {
  return <div className="portfolio-container">{mapAllScreen()}</div>;
}

export default PortfolioContainer;
