import React from 'react'
import bluegraph from "../../../assets/Bluegraph.png"


const SalesAnalytics = () => {
  return (
    <div>
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
    </div>
  )
}

export default SalesAnalytics