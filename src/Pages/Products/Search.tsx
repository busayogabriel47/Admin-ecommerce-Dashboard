import React from 'react'

const Search = () => {
  return (
    <>

<div className='flex flex-col md:flex-row justify-between gap-8 mb-[2rem]'>
              <div className='flex justify-between basis-[85%]'>
                    <form className='basis-[20%]'>
                            <div className="relative">
                                <input
                                      type="email"
                                      name="email"
                                      id="email"
                                      autoComplete="email"
                                      className="w-[100%] md:w-[100%] block flex-1 border-2 h-[30px] 
                                      py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                                      focus:ring-0 sm:text-[0.7rem] sm:leading-6 pl-10 pl-[3rem] rounded-xl"
                                      placeholder="Share Product ..."
                                      />
                                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                      </svg>
                                </div>
                            </div>
                    </form>

                    <div className='flex basis-[60%] items-center justify-end'>
                        <div className='flex'>
                              <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                              </svg></span>
                              <span><p>Bulk Actions</p></span>
                        </div>
                  </div>
              </div>


              <div className="flex basis-[15%] gap-7">
                      
                  <div className='flex items-center'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                      </span>
                      <span><p>Export Products</p></span>
                  </div>

                  <div>
                        <button className='border-[1px] rounded-xl text-[0.8rem] text-center text-[orange]
                          px-3 py-1 text-[0.9rem] bg-[green] text-white'>Add Product</button>
                  </div>
              </div>
            
        </div>
    </>
  )
}

export default Search