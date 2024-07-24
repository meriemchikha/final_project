/* eslint-disable camelcase */
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonAddProduct from "./ButtonAddProduct";

export default function Product() {
  const [details, setDetails] = useState([]);
  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:3310/api/product/${params.id}`)
      .then((res) => res.json(console.info(res)))
      .then((res) => setDetails(res))
      .catch((error) => console.error(error));
  }, []);
  console.info(params.id);
  return (
    <div className="min-h-screen flex w-full flex-wrap p-4 md:p-8 relative">
      <h1 className="text-black md:font-sans text-5xl font-semibold decoration-solid w-full mb-16">
        Details produit
      </h1>

      <div className="w-full md:w-4/5">
        <div className="w-full flex flex-wrap">
          {details.map(({ id, name, img_url, description, price }) => (
            <div key={id} className="w-full md:w-1/3 md:px-8 mb-20 ">
              <Link
                className="inline-block w-full md:h-[700px] relative"
                to={`/product/${id}`}
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
        <ButtonAddProduct />
      </div>
    </div>
  );
}
