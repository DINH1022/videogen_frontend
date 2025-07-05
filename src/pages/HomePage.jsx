import Navigation from "../components/Navigation";
import Feature from "../components/Feature";
import SmoothScrollSequence from "../components/SmoothScrollSequence.jsx";
import ScrollingGradientComponent from "../components/ScrollingGradientComponent";

const HomePage = () => {
  return (
    <>
      <Navigation />
      <SmoothScrollSequence />
      <Feature />
      <ScrollingGradientComponent />
    </>
  );
};

export default HomePage;
