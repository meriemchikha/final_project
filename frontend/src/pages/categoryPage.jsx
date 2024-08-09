/* eslint-disable react/self-closing-comp */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import img2 from "../assets/img2.jpg";
import soinVisage from "../assets/soinVisage.jpg";
import cheveux from "../assets/cheveux.jpg";
import parfun from "../assets/parfun.jpg";
import soinscorps from "../assets/soinscorps.jpg";
import accesoires from "../assets/accesoires.jpg";
import soinsongles from "../assets/soinsongles.jpg";
import homme from "../assets/homme.png";

export default function CategoryPage() {
  const categoryBaner = [
    { id: 1, name: "Soin", img: soinVisage },
    { id: 2, name: "Maquillage", img: img2 },
    { id: 3, name: "Cheveux", img: cheveux },
    { id: 4, name: "parfun", img: parfun },
    { id: 5, name: "Soins corps", img: soinscorps },
    { id: 6, name: "Accesoires", img: accesoires },
    { id: 7, name: "Soins ongles", img: soinsongles },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) =>
        console.error("Erreur lors de la récupération des données :", err)
      );
  }, []);

  return (
    <>
      <div
        className="flex w-full flex-wrap pr-[5%] pl-[5%] justify-center py-14 relative items-center"
        data-aos="fade-down"
        data-aos-delay="300"
      >
        <h2 className="text-[1.8rem] pt-4 pb-8 w-full">Nos Catégories</h2>
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full">
          {categories.map(({ id, name }) => {
            const matchingBanner = categoryBaner.find(
              (banner) => banner.id === id
            );

            return (
              <div key={id} className="md:w-full flex md:flex-col ">
                <Link
                  className="w-full inline-block"
                  to={`/sous-category/category/${id}`} // Route dynamique basée sur l'ID de la catégorie
                >
                  <div className="relative flex md:flex-col justify-center text-center ">
                    {matchingBanner && (
                      <img
                        src={matchingBanner.img}
                        alt={name}
                        className="w-full"
                      />
                    )}
                    <span className="flex justify-center items-center  right-10 rounded-[50px] bg-amber-600 h-8 absolute bottom-4 md:w-40">
                      <p>{name}</p>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center gap-8 py-6 ">
        <div className=" py-52 text-lg ">
          <h1 className=" ffont-semibold text-2xl p-2 bg-slate-200">
            Les essentiels d'été pour lui
          </h1>
          <p className=" p-2 bg-slate-200">
            Prenez soin de votre peau avec les différents soins pour homme !
          </p>
          <Link to="/">
            <p className=" p-2 font-serif">Découvrir</p>
          </Link>
        </div>
        <div>
          <img src={homme} alt="homme"></img>
        </div>
      </div>
    </>
  );
}
