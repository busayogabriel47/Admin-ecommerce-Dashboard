import React from 'react'
import donutchart from "../../../assets/Donut-Chart.png"
import dot from "../../../assets/Dot1.png"


function Salesbycategory() {
  return (
    <div>
            <div className='flex flex-col gap-5 border-2 border-[#F1F1F1] p-10 rounded-2xl'>
                    {/*Sales by category header*/}
                      <div className="flex basis-[100%] justify-between">
                            <h6>Sales Analytics</h6>
                            <h3>Week</h3>
                      </div>
                      {/*Sales by category graph*/}
                      <div className="flex flex-row w-full mt-5">
                            <div className="pt-5 basis-[40%]">
                                <img src={donutchart} alt="bluegraph" width="80%"/>
                            </div>
                            
                            <div className="flex flex-col gap-4 basis-[60%]">
                                  {/* Clothing*/}
                                  <div className="flex flex-row">
                                      <div className="w-[80%]">
                                            <div className="flex gap-4 items-center">
                                              <span>
                                                <img src={dot} alt="dot"/>
                                              </span>
                                              <span>
                                                <div>
                                                  <p className="text-[1.2rem]">Clothing (25%)</p>
                                                  <p className="text-[0.6rem]">1,345 Category Products</p>
                                                </div>
                                              </span>
                                            </div>
                                      </div>
                                      <div className="w-[20%]">
                                        <p>$3,020</p>
                                      </div>
                                  </div>

                                  {/* Lightwear*/}
                                  <div className="flex flex-row">
                                      <div className="w-[80%]">
                                            <div className="flex gap-4 items-center">
                                              <span>
                                                <img src={dot} alt="dot"/>
                                              </span>
                                              <span>
                                                <div>
                                                  <p className="text-[1.2rem]">Lingerie & Nightwear (35%)</p>
                                                  <p className="text-[0.6rem]">2,345 Category Products</p>
                                                </div>
                                              </span>
                                            </div>
                                      </div>
                                      <div className="w-[20%]">
                                        <p>$2, 280</p>
                                      </div>
                                  </div>
                            </div>

                            
                      </div>
                      
              </div>
    </div>
  )
}

export default Salesbycategory