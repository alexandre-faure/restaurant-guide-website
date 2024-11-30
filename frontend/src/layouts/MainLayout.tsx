import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="mx-10 py-5">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
