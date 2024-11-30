import React from "react";
import whiteLogo from "../../assets/images/logo500-white.png";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto shadow-md">
      <div className="grid sm:grid-cols-3 grid-cols-1 bg-zinc-800 text-zinc-100 sm:gap-10 gap-4 px-6 py-8 z-40">
        <div>
          <div className="flex flex-row items-center gap-2 sm:justify-start justify-center">
            <div>
              <img src={whiteLogo} width="40" alt="White logo of ScandiBites" />
            </div>
            <div className="text-xl font-bold">ScandiBites</div>
          </div>
        </div>
        <div className="text-center self-center">
          <p className="text-xs italic">Author</p>
          <p>Alexandre Faure</p>
        </div>
        <div className="text-center sm:text-right text-xs self-center">
          © 2024 - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
