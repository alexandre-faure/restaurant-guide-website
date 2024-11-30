import RestaurantsGrid from "../components/RestaurantsGrid/RestaurantsGrid";

const Home: React.FC = () => {
  return (
    <div>
      <header className="mx-10 pt-8">
        <h1 className="text-xl font-bold font-medium">
          Welcome to <span className="font-bold">ScandiBites</span>, the
          Restaurant Guide Website!
        </h1>
        <p className="italic">Explore the best restaurants in your area.</p>
      </header>

      <RestaurantsGrid />
    </div>
  );
};

export default Home;
