import React from 'react'
import beanOne from "../../assets/beanie4.png"
import squareFour from "../../assets/square-list4.png"
import squareTwo from "../../assets/square-list2.png"
import squareThree from "../../assets/square-list3.png"
import squareOne from "../../assets/square-list1.png"



const SingleProduct = () => {
  return (
    <>
        <div className='flex flex-col'>
            <div className='flex flex-col md:flex-row'>
                <div className='basis-[35%]'>
                    <img src={beanOne} width="100%"/>
                </div>
                <div className='basis-[65%] flex flex-col'>
                    <div className=''>
                        <h2>Cotton Rich Jersey Slim Blazer</h2>
                        <p>Product ID: GY345912</p>


                        <h5>Cotton Rich Jersey Slim Blazer</h5>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis beatae distinctio, fugit illum, quidem laudantium ullam ipsum quibusdam ver</p>
                    </div>
                    <div className='flex flex-col md:flex-row mt-[5rem]'>
                        <div className='basis-[50%] flex'>
                            <div className='basis-[50%]'>
                                <div className='flex'>
                                    <img src={squareFour} /> <span>$120.40</span>
                                </div>
                                <p>Price</p>
                            </div>
                            <div className='basis-[50%]'>
                                <div className='flex'>
                                    <img src={squareThree} /> <span>$120.40</span>
                                </div>
                                <p>Price</p>
                            </div>
                        </div>

                        <div className='basis-[50%] flex'>
                            <div className='basis-[50%]'>
                                <div className='flex'>
                                    <img src={squareTwo} /> <span>$120.40</span>
                                </div>
                                <p>Price</p>
                            </div>
                            <div className='basis-[50%]'>
                                <div className='flex'>
                                    <img src={squareOne} /> <span>$120.40</span>
                                </div>
                                <p>Price</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    </>
  )
}

export default SingleProduct