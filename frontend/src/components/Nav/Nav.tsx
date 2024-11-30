import logo from "../../assets/images/logo500.png";
import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav className="bg-sky-200 px-4 py-5 shadow-md sticky top-0 z-50">
      <div className="flex flex-col sm:flex-row items-center">
        <div className="grow">
          <Link to="/" className="flex flex-row items-center gap-2 ">
            <div>
              <img src={logo} width="50" alt="White logo of ScandiBites" />
            </div>
            <div className="text-2xl font-bold text-cyan-950">ScandiBites</div>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-x-10 text-lg mr-5">
          <div>
            <Link to="/" className="text-cyan-950 hover:underline">
              Home
            </Link>
          </div>
          <div>
            <Link to="/about" className="text-cyan-950 hover:underline">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
