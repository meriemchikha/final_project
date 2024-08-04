import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import img2 from "../assets/img2.jpg";
import soinVisage from "../assets/soinVisage.jpg";
import makLevre from "../assets/makLevre.jpg";

export default function CategoryPage() {
  const categoryBaner = [
    { id: 1, name: "Maquillage", img: img2 },
    { id: 2, name: "Soin", img: soinVisage },
    { id: 3, name: "Cheveux", img: makLevre },
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
    <div
      className="flex w-full flex-wrap pr-[5%] pl-[5%] justify-center py-14 relative items-center"
      data-aos="fade-down"
      data-aos-delay="300"
    >
      <h2 className="text-[1.8rem] pt-4 pb-8 w-full">Les Catégories</h2>
      <div className="flex flex-wrap md:flex-nowrap gap-4 w-full">
        {categories.map(({ id, name }) => {
          const matchingBanner = categoryBaner.find(
            (banner) => banner.id === id
          );

          return (
            <div key={id} className="w-full md:w-1/3 md:px-8 mb-20">
              <Link
                className="w-full inline-block"
                to={`/sous-category/category/${id}`} // Route dynamique basée sur l'ID de la catégorie
              >
                <div className="relative w-full flex justify-center ">
                  {matchingBanner && (
                    <img
                      src={matchingBanner.img}
                      alt={name}
                      className="w-full"
                    />
                  )}
                  <span className="flex justify-center items-center rounded-[50px] bg-amber-600 h-8 absolute bottom-4 w-52">
                    <p>{name}</p>
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
