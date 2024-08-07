"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DummyDataProps, DummyDataWithQuantity } from "@/types/DummyData";
import { BASE_URL } from "@/helpers/Base-URL";
import Image from "next/image";
import { useToken } from "@/context/TokenContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { toast } from "@/helpers/toast";

interface Props {
  params: {
    productId: string;
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const { isLoggedIn } = useToken();
  const { addToCart } = useCart();

  const { productId } = params;
  const [product, setProduct] = useState<DummyDataProps | null>(null);
  const [count, setCount] = useState(1);

  const getProduct = useCallback(async () => {
    const response = await fetch(`${BASE_URL}${productId}`, { method: "GET" });
    const data = await response.json();
    setProduct(data);
  }, [productId]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const getNameInitials = (name: string) => {
    return name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0);
  };

  const addItemToCart = (product: DummyDataProps) => {
    if (!isLoggedIn) {
      toast({ type: "error", message: "Kindly login or register first!!!" });
    } else {
      const productWithQuantity: DummyDataWithQuantity = {
        ...product,
        quantity: count,
      };
      addToCart(productWithQuantity);
      toast({ type: "success", message: "Item added to cart" });
    }
  };

  return (
    <>
      {product && (
        <>
          <div className="ml-4 sm:mt-5">
            <Link
              className="text-blue-500 sm:text-xl"
              href={`${isLoggedIn ? "/?loggedIn=true" : "/"}`}
            >
              &larr; &nbsp;Back to Dashboard
            </Link>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row items-center justify-center border p-2 bg-[#d5d7df] border-black w-80 pad:w-96 sm:w-[500px] md:w-[700px] lg:w-[850px] lg:h-[500px] xl:w-[1100px] mx-auto mt-10 rounded-xl">
              <Image
                width={100}
                height={100}
                src={product.images[0]}
                className="w-72 sm:w-60 object-contain h-60 md:w-72 md:h-80 xl:w-[1000px]"
                alt="Image"
              />
              <div className="flex flex-col lg:gap-5">
                <p className="text-xl md:text-2xl text-center font-semibold my-2">
                  {product.title}
                </p>
                <hr />
                <p className="text-sm md:text-base xl:text-lg px-2 my-4">
                  {product.description}
                </p>
                <div className="flex justify-between md:justify-around items-center p-2">
                  <p className="my-3 lg:text-lg font-semibold">
                    Rating: {product.rating}/5
                  </p>
                  <p className="my-3 lg:text-lg font-semibold">
                    Price: ${product.price}
                  </p>
                </div>
                <div className="flex justify-between md:justify-around p-2">
                  <div className="flex justify-center gap-4 border bg-white w-24 border-black py-1 px-3 rounded-lg">
                    <button
                      disabled={count === 1}
                      onClick={() => setCount(count - 1)}
                      className={`text-[17px] ${
                        count === 1 ? "cursor-not-allowed" : "cursor-pointer"
                      } px-1`}
                    >
                      -
                    </button>
                    <p className="text-base">{count}</p>
                    <button
                      onClick={() => setCount(count + 1)}
                      className="text-[17px] px-1"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItemToCart(product)}
                    className="py-2 px-3 bg-sky-600 hover:bg-sky-500 text-xs lg:text-sm text-white font-semibold rounded-lg flex items-center"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            <div className="max-w-screen-md mx-auto">
              <div>
                <p className="text-xl mt-8 pad:my-7 font-semibold px-2">
                  Reviews
                </p>
              </div>
              <div className="w-[340px] pad:w-[400px] pl-2 sm:mx-auto sm:w-[600px]">
                <p>
                  {product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex bg-[#d5d7df] flex-col gap-2 border border-black my-4 rounded-lg p-2"
                    >
                      <div className="flex items-center gap-2">
                        <p className="bg-slate-700 text-white w-fit p-2 rounded-full text-xs">
                          {getNameInitials(review.reviewerName)}
                        </p>
                        <p className="font-semibold">{review.reviewerName}</p>
                      </div>
                      <p>{review.comment}</p>
                      <p>Rating: {review.rating}/5</p>
                    </div>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
