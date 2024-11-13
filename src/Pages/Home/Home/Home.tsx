import Hero from "../Hero/Hero";
import Review from "../Review/Review";
import Services from "../Services/Services";
import SpecialService from "../../SepcialService/SpecialService";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <SpecialService/>
      <Review />
    </div>
  );
};

export default Home;
