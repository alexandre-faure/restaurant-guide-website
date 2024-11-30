import { Link } from "react-router-dom";

const Error404: React.FC = () => {
  return (
    <>
      <div className="text-center h-96 flex flex-col justify-center">
        <h1 className="text-3xl mb-2 font-bold">404 - Page not found</h1>
        You may have reached a page that does not exist...
        <br />
        <br />
        <Link to="/">
          <button className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded transition">
            Go back to the homepage
          </button>
        </Link>
      </div>
    </>
  );
};

export default Error404;
