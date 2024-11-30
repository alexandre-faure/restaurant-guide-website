import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div>
      <p className="text-center text-lg mt-5">
        Welcome to <span className="font-bold">ScandiBites</span>, the
        Restaurant Guide Website!
      </p>
      <p className="italic text-center text-lg mb-5">
        Explore the best restaurants in your area.
      </p>
      <br />
      <p>
        This website is just a demo, and is based on Google Places API (New). It
        is not affiliated with Google in any way.
      </p>
      <p>
        The source code is available on{" "}
        <a
          href="https://github.com/alexandre-faure/restaurant-guide-website"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          GitHub
        </a>
        .
      </p>
      <br />
      <p>
        To go back to the homepage, click{" "}
        <Link to="/" className="text-blue-500 underline">
          here
        </Link>
        .
      </p>
    </div>
  );
};

export default About;
