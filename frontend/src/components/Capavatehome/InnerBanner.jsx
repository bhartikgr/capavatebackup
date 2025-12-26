import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function InnerBanner({ title, breadcrumb }) {
  return (
    <>
      <section className="innerbanner d-block">
        <div className="container-lg">
          <div className="d-flex flex-column gap-3 text-center">
            <h1>{title}</h1>
            <div className="d-flex gap-3 align-items-center justify-content-center breadcrumb">
              <Link to="/capavate/home">Home</Link> <MdKeyboardArrowRight />
              <p>{breadcrumb}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
