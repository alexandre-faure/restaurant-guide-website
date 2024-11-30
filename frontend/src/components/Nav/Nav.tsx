import logo from "../../assets/images/logo500.png";

const Nav: React.FC = () => {
  return (
    <nav className="bg-sky-200 px-4 py-5 shadow-md sticky top-0 z-50">
      <div className="flex flex-row items-center gap-2">
        <div>
          <img src={logo} width="50" alt="White logo of ScandiBites" />
        </div>
        <div className="text-2xl font-bold text-cyan-950">ScandiBites</div>
      </div>
    </nav>
  );
};

export default Nav;
