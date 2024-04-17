import bean from "../../assets/Beanie.png"
import beanTwo from "../../assets/beanie2.png"
import beanThree from "../../assets/beanie3.png"
import beanFour from "../../assets/beanie4.png"

function ProductContent() {

  return (

    <>
        <div className="mt-5">
            <div className="flex flex-col md:flex-row gap-[4%]">
                <div className="md:w-[20%] shadow-md">
                    <img src={bean} className="relative"/>
                    <button className='border-[1px] rounded-xl text-[0.8rem] text-center text-[orange]
                          px-3 py-1 text-[0.9rem] bg-[green] text-white absolute bottom-[75%]'>
                            In stock
                    </button>
                    <div className="p-5">
                        <div>
                            <span className="text-[0.8rem]">Category: Accessories</span>
                            <h5 className="text-[1.2rem] font-bold">Straw Fedora Hat</h5>
                        </div>
                        <div className="flex justify-between">
                            <p>12.03.2023</p>
                            <p className="font-bold">$99.9</p>
                        </div>
                    </div>
                </div>



                <div className="md:w-[20%] shadow-md">
                    <img src={beanTwo} className="relative"/>
                    <button className='border-[1px] rounded-xl text-[0.8rem] text-center text-[orange]
                          px-3 py-1 text-[0.9rem] bg-[green] text-white absolute bottom-[75%]'>
                            
                    </button>
                    <div className="p-5">
                        <div>
                            <span className="text-[0.8rem]">Category: Accessories</span>
                            <h5 className="text-[1.2rem] font-bold">Straw Fedora Hat</h5>
                        </div>
                        <div className="flex justify-between">
                            <p>12.03.2023</p>
                            <p className="font-bold">$99.9</p>
                        </div>
                    </div>
                </div>


                <div className="md:w-[20%] shadow-md">
                    <img src={beanThree} className="relative"/>
                    <button className='border-[1px] rounded-xl text-[0.8rem] text-center text-[orange]
                          px-3 py-1 text-[0.9rem] bg-[green] text-white absolute bottom-[75%]'>
                            Add Product
                    </button>
                    <div className="p-5">
                        <div>
                            <span className="text-[0.8rem]">Category: Accessories</span>
                            <h5 className="text-[1.2rem] font-bold">Straw Fedora Hat</h5>
                        </div>
                        <div className="flex justify-between">
                            <p>12.03.2023</p>
                            <p className="font-bold">$99.9</p>
                        </div>
                    </div>
                </div>



                <div className="md:w-[20%] shadow-md">
                    <img src={beanFour} className="relative"/>
                    <button className='border-[1px] rounded-xl text-[0.8rem] text-center text-[orange]
                          px-3 py-1 text-[0.9rem] bg-[green] text-white absolute bottom-[75%]'>
                            Add Product
                    </button>
                    <div className="p-5">
                        <div>
                            <span className="text-[0.8rem]">Category: Accessories</span>
                            <h5 className="text-[1.2rem] font-bold">Straw Fedora Hat</h5>
                        </div>
                        <div className="flex justify-between">
                            <p>12.03.2023</p>
                            <p className="font-bold">$99.9</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

  )

}

export default ProductContent