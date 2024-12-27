
{/* Import Heroicons/react*/}

import bell from "../../assets/Notification.png"
import light from "../../assets/light.png"
import cart from "../../assets/Cart.png"
import user from "../../assets/Image.png"





const Header = () => {

  return (
          <div className='flex flex-row justify-between w-[100%] items-center'>
                <div className='text-[#000] flex w-[80%] items-center gap-4' >
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                  </span>
                  <span>Dashboard</span>
                </div>

                <div className='text-[#000] flex flex-row items-center w-[20%] gap-12'>
                    <div className='flex items-center gap-7'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                          </svg>
                          <img src={bell} alt='bell' className='max-w-6'/>
                          <img src={light} alt='light' className='max-w-6'/>
                          <img src={cart} alt='cart' className='max-w-6'/>
                    </div>
                    <div className='flex gap-3'>
                        <img src={user} alt='cart' className='max-w-6' height="max-h-3"/>
                        <div>
                            <p className='text-[0.65rem]'>Ulad Luch</p>
                            <p className='text-[0.60rem]'>Admin</p>
                        </div>

                    </div>
                </div>
          </div>
  )
}

export default Header