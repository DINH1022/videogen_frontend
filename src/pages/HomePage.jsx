import Navigation from "../components/Navigation";
import AIVideoGeneratorPage from "../components/Slider";
import Feature from "../components/Feature";
import AIVideoMaker from "../components/Introduce";
import Footer from "../components/Footer";
import SmoothScrollSequence from "../components/SmoothScrollSequence.jsx";
const HomePage = () => {
  return (
    <>
      <Navigation />
      <SmoothScrollSequence />
      <Feature />
      <Footer />
    </>
  );
};

export default HomePage;
