import graphone from "../../assets/Graph1.png"
import graphtwo from "../../assets/Graph2.png"
import graphthree from "../../assets/Graph3.png"
import arrowup from "../../assets/arrow-trend-up.png"
import walleticon from "../../assets/walleticon.png"


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
    </div>
  )
}

export default Dashboard