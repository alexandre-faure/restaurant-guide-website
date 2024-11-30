import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <header className="pt-6 px-5">
        <h1 className="text-xl font-bold font-medium">
          Welcome to <span className="font-bold">ScandiBites</span>, the
          Restaurant Guide Website!
        </h1>
        <p className="italic">Explore the best restaurants in your area.</p>
      </header>

      <main className="p-5">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
