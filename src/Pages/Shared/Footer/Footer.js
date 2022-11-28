import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-8 bg-slate-800">
      <div className="footer grid grid-cols-1 items-center md:grid-cols-2">
        <div className="mx-auto">
          <span className="footer-title">Services</span>
          <Link className="link link-hover">Buy</Link>
          <Link className="link link-hover">Sell</Link>
          <Link className="link link-hover">Marketing</Link>
          <Link className="link link-hover">Advertisement</Link>
        </div>
        <div className="mx-auto">
          <span className="footer-title">Legal</span>
          <Link className="link link-hover">Terms of use</Link>
          <Link className="link link-hover">Privacy policy</Link>
          <Link className="link link-hover">Cookie policy</Link>
        </div>
      </div>
      <div className="text-center mt-10 mx-auto">
        <p>Copyright © 2022 - All right reserved by Laptop Deals</p>
      </div>
    </footer>
  );
};

export default Footer;
