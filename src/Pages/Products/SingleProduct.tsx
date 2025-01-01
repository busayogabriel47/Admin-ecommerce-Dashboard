import React from "react";
import beanOne from "../../assets/beanie4.png";
import beanTwo from "../../assets/beanie2.png";
import beanFive from "../../assets/Beanie5.png";
import beanSix from "../../assets/Beanie6.png";
import squareFour from "../../assets/square-list4.png";
import squareTwo from "../../assets/square-list2.png";
import squareThree from "../../assets/square-list3.png";
import squareOne from "../../assets/square-list1.png";

const SingleProduct = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-[2rem]">
          <div className="basis-[35%] flex-col">
            <div className="">
              <img src={beanOne} width="100%" className="rounded-3xl" />
            </div>
            <div className="flex gap-7 mt-7">
              <div>
                <img src={beanTwo} width="100%" className="rounded-3xl" />
              </div>
              <div>
                <img src={beanFive} width="100%" className="rounded-3xl" />
              </div>
              <div>
                <img src={beanSix} width="100%" className="rounded-3xl" />
              </div>
            </div>
          </div>
          <div className="basis-[65%] flex flex-col">
            <div className="">
              <h2 className="font-bold text-[1.5rem]">
                Cotton Rich Jersey Slim Blazer
              </h2>

              <p className="mb-[2rem]">Product ID: GY345912</p>

              <h5 className="font-bold">Cotton Rich Jersey Slim Blazer</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Facilis beatae distinctio, fugit illum, quidem laudantium ullam
                ipsum quibusdam ver ipsum quibusdam ver ipsum quibusdam ver
              </p>
            </div>
            <div className="flex flex-col md:flex-row mt-[5rem]">
              <div className="basis-[50%] flex">
                <div className="basis-[50%]">
                  <div className="flex gap-3 items-center">
                    <img src={squareFour} />
                    <div className="mt-5">
                      <p className="font-bold text-[1rem]">$120.40</p>
                      <p>Price</p>
                    </div>
                  </div>
                </div>
                <div className="basis-[50%]">
                  <div className="flex gap-3 items-center">
                    <img src={squareThree} />
                    <div className="mt-5">
                      <p className="font-bold text-[1rem]">$120.40</p>
                      <p>Price</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="basis-[50%] flex">
                <div className="basis-[50%]">
                  <div className="flex gap-3 items-center">
                    <img src={squareTwo} />
                    <div className="mt-5">
                      <p className="font-bold text-[1rem]">$120.40</p>
                      <p>Price</p>
                    </div>
                  </div>
                </div>
                <div className="basis-[50%]">
                  <div className="flex gap-3 items-center">
                    <img src={squareOne} />
                    <div className="mt-5">
                      <p className="font-bold text-[1rem]">$120.40</p>
                      <p>Price</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
