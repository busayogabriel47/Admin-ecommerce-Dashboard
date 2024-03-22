import graphone from "../../assets/Graph1.png"
import graphtwo from "../../assets/Graph2.png"
import graphthree from "../../assets/Graph3.png"
import arrowup from "../../assets/arrow-trend-up.png"
import walleticon from "../../assets/walleticon.png"
import bluegraph from "../../assets/Bluegraph.png"
import donutchart from "../../assets/Donut-Chart.png"
import dot from "../../assets/Dot1.png"


const Dashboard = () => {
  return (
    <div>
        <div className='grid grid-cols-4 gap-5'>
          {/* Chart one*/}
              <div className='flex gap-5 border-2 border-[#F1F1F1] pl-10 py-9 p- rounded-2xl'>
                  <div>
                    <span className="flex gap-3">
                      <img src={walleticon} alt="arrow-up"/> 
                      <h6>Today Revenue</h6>
                    </span>
                    <p className="text-[2.5rem] font-bold">$2189</p>
                    <span className="flex items-center gap-3">
                      <img src={arrowup} alt="arrow-up"/> +12% vc yesterday
                    </span>
                    
                  </div>
                  <div>
                      <img src={graphone} alt=''/>
                  </div>
              </div>

              {/* Chart two*/}
              <div className='flex gap-5 border-2 border-[#F1F1F1] pl-10 py-9 p- rounded-2xl'>
                  <div>
                    <span className="flex gap-3">
                      <img src={walleticon} alt="arrow-up"/> 
                      <h6>Today Visitors</h6>
                    </span>
                    <p className="text-[2.5rem] font-bold">$512</p>
                    <span className="flex items-center gap-3">
                      <img src={arrowup} alt="arrow-up"/> +12% vc yesterday
                    </span>
                    
                  </div>
                  <div>
                      <img src={graphtwo} alt=''/>
                  </div>
              </div>

              {/* Chart two*/}
              <div className='flex gap-5 border-2 border-[#F1F1F1] pl-10 py-9 p- rounded-2xl'>
                  <div>
                    <span className="flex gap-3">
                      <img src={walleticon} alt="arrow-up"/> 
                      <h6>Total Transactions</h6>
                    </span>
                    <p className="text-[2.5rem] font-bold">$325</p>
                    <span className="flex items-center gap-3">
                      <img src={arrowup} alt="arrow-up"/> +12% vc yesterday
                    </span>
                    
                  </div>
                  <div>
                      <img src={graphthree} alt=''/>
                  </div>
              </div>

              {/* Chart two*/}
              <div className='flex gap-5 border-2 border-[#F1F1F1] pl-10 py-9 p- rounded-2xl'>
                  <div>
                    <span className="flex gap-3">
                      <img src={walleticon} alt="arrow-up"/> 
                      <h6>Total Products</h6>
                    </span>
                    <p className="text-[2.5rem] font-bold">$268</p>
                    <span className="flex items-center gap-3">
                      <img src={arrowup} alt="arrow-up"/> +12% vc yesterday
                    </span>
                    
                  </div>
                  <div>
                      <img src={graphone} alt=''/>
                  </div>
              </div>
        </div>

      {/* */}
        <div className="grid grid-cols-2 gap-4 my-5">
            <div className='flex flex-col gap-5 border-2 border-[#F1F1F1] p-10 rounded-2xl'>
                    {/*Sales Analytics header*/}
                      <div className="flex basis-[100%] justify-between">
                            <h6>Sales Analytics</h6>
                            <h3>Week</h3>
                      </div>
                      {/*Sales Analytics graph*/}
                      <div className="w-full">
                            <div className="pt-5">
                                <img src={bluegraph} alt="bluegraph" width="100%"/>
                            </div>
                      </div>
                      
              </div>

              <div className='flex flex-col gap-5 border-2 border-[#F1F1F1] p-10 rounded-2xl'>
                    {/*Sales by category header*/}
                      <div className="flex basis-[100%] justify-between">
                            <h6>Sales Analytics</h6>
                            <h3>Week</h3>
                      </div>
                      {/*Sales Analytics graph*/}
                      <div className="flex flex-row w-full">
                            <div className="pt-5 basis-[40%]">
                                <img src={donutchart} alt="bluegraph" width="100%"/>
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
    </div>
  )
}

export default Dashboard