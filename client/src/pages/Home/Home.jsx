import Container from "../../components/Container";
import Banner from "./Banner";
import FeaturedProperties from "./FeaturedProperties";
import JourneyStart from "./JourneyStart";
import NeighborhoodSpotlight from "./NeighborhoodSpotlight";
import WhyChooseUs from "./WhyChooseUs";

// The Home component acts as the main landing page of our application
const Home = () => {
  return (
    <>
      {/* Top Section: Hero Banner with rotating properties */}
      <Banner />
      
      {/* Middle Section: Wrapped in a container for consistent margins */}
      <Container>
        {/* Showcase of the most recent 6 property listings */}
        <FeaturedProperties />

        {/* Informational section explaining the benefits of HomeNest */}
        <WhyChooseUs />

        {/* Highlights of popular neighborhoods and areas */}
        <NeighborhoodSpotlight />
      </Container>

      {/* Bottom Section: Call to action to start the property journey */}
      <JourneyStart />
    </>
  );
};

export default Home;
