/* eslint-disable camelcase */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import banner from "../../assets/banner1.png";

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/product`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  console.info("produits------>", products);
  console.info("image_produits------>", products[0]?.img_url);

  return (
    <>
      <div className=" p-6 ">
        <img src={banner} alt="" className=" w-full " />
      </div>
      <div className="min-h-screen flex w-full flex-wrap p-4 md:p-8 relative">
        <h1 className="text-black md:font-sans text-5xl font-semibold decoration-solid w-full mb-16">
          Tous nos produits
        </h1>

        <div className="w-full md:w-4/5">
          <div className="w-full flex flex-wrap">
            {products.map(({ id, name, img_url, description, price }) => (
              <div key={id} className="w-full md:w-1/3 md:px-8 mb-20 ">
                <Link
                  to={`/product/${id}`}
                  className="inline-block w-full md:h-[700px]"
                >
                  <img
                    src={`http://localhost:3310/${img_url}`}
                    alt={name}
                    className="inline-block w-80 object-cover"
                  />
                </Link>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{name}</p>

                  <p>{description}</p>
                  <p className="font-semibold text-3xl">{`${price} €`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
