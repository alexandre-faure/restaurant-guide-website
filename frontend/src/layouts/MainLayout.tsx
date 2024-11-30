import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <header className="mx-10 pt-8">
        <h1 className="text-xl font-bold font-medium">
          Welcome to <span className="font-bold">ScandiBites</span>, the
          Restaurant Guide Website!
        </h1>
        <p className="italic">Explore the best restaurants in your area.</p>
      </header>

      <main className="mx-10 py-5">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
