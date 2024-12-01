const Error500: React.FC = () => {
  return (
    <>
      <div className="text-center h-96 flex flex-col justify-center">
        <h1 className="text-3xl mb-2 font-bold">500 - Internal Server Error</h1>
        Oops! Something went wrong...
        <br />
        Make sure you are connected to the internet and try again.
      </div>
    </>
  );
};

export default Error500;
