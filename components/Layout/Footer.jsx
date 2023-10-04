import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  AiFillHome,
  AiFillLinkedin,
  AiFillPhone,
  AiOutlineGithub,
  AiOutlineGoogle,
  AiOutlineMail,
  AiOutlinePrinter,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";

import { FaFacebookF } from "react-icons/fa";
function Footer() {
  const { pathname } = useRouter();
  const hideFooter =
    pathname === "/404" ||
    pathname === "/auth/login" ||
    pathname === "/auth/register";
  return (
    <div className={`bg-gray-800 text-white ${hideFooter ? "hidden" : ""} `}>
      <div className="bg-mainBlack2">
        <div className="flex container items-center justify-between">
          <div className="text-center py-3 bg-opacity-20 ">
            © 2020 Copyright :{" "}
            <a className="text-white" href="https://mdbootstrap.com/">
              Ofenos.com
            </a>
          </div>

          <div className="flex items-center ">
            <a href="#" className="text-white me-4">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white me-4">
              <AiOutlineTwitter />
            </a>
            <a href="#" className="text-white me-4">
              <BsInstagram />
            </a>
            <a href="#" className="text-white me-4">
              <AiOutlineGoogle />
            </a>
            <a href="#" className="text-white me-4">
              <AiFillLinkedin />
            </a>
            <a href="#" className="text-white me-4">
              <AiOutlineGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
