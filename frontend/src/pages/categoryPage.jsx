/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import img2 from "../assets/img2.jpg";
// import soinVisage from "../assets/soinVisage.jpg";
// import yeux from "../assets/yeux.jpg";
// import makLevre from "../assets/makLevre.jpg";

export default function CategoryPage() {
  // const categoryBaner = [
  //   { id: 1, name: "Maquillage pour visage", img: img2 },
  //   { id: 2, name: "Maquillage pour les yeux", img: yeux },
  //   { id: 3, name: "Maquillage pour les lèvres", img: makLevre },
  //   { id: 4, name: "Soin de la peau", img: soinVisage },
  // ];
  const [category, setCategory] = useState([]);
  // const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3310/api/category`)
      .then((res) => res.json())
      .then((res) => setCategory(res))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  console.info("category--->", category);

  return (
    <div
      className="flex w-full flex-wrap pr-[5%] pl-[5%] justify-center py-14 relative bottom-10 h-[870px]  items-center"
      data-aos="fade-down"
      data-aos-delay="300"
    >
      <h2 className="text-[1.8rem]  pt-4 pb-8 w-full">Les Catégories</h2>
      <div className="flex flex-wrap md:flex-nowrap gap-4 w-full">
        {category.map(({ id, name }) => (
          <div key={id} className="w-full md:w-1/3 md:px-8 mb-20 ">
            <div className="flex  w-full md:w-1/3   cursor-pointer">
              <Link className="w-full inline-block" to="/category">
                <span className="flex justify-center items-center rounded-[50px] bg-white h-8 absolute bottom-4 left-4 w-52">
                  <p>{name}</p>
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
