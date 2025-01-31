import React from 'react'
import product from "../../../assets/Product2.png"
import product4 from "../../../assets/Product4.png"

import product3 from "../../../assets/Product3.png"
import product1 from "../../../assets/Product1.png"





const Topselling = () => {

  return (
    <div>
        <div className='flex flex-col gap-5 border-2 border-[#F1F1F1] p-10 rounded-2xl'>
                    {/*Top Selling header*/}
                    <div className="flex basis-[100%] justify-between">
                          <h6>Top Selling</h6>
                          <h3>Sort by</h3>
                      </div>
                      {/*Sales by category graph*/}
                      <div className="flex flex-col md:flex-row w-full mt-5">
                            <div className="pt-5 w-full overflow-x-auto">
                                <table className="table-auto border border-slate-400 w-[800px] md:w-[100%]">
                                      <thead>
                                        <tr className='text-left'>
                                          <th className='py-3 px-4'>Product name</th>
                                          <th>Price</th>
                                          <th>Status</th>
                                          <th>Sold</th>
                                          <th>Total earning</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {/* Leather row*/}
                                        <tr className='border border-slate-300'>
                                          <td className='flex gap-4 py-3 px-4'>
                                              <div>
                                                  <img src={product} width="100%"/>                                              
                                              </div>
                                              <div>
                                                  <h5 className='text-[0.9rem] md:text-[1rem] font-bold'>Leather Tote Bag</h5>
                                                  <p className='text-[0.7rem] md:text-[0.7rem]'>Product ID: 134890</p>
                                              </div>
                                          </td>
                                          <td className='text-[0.7rem]'>$225.00</td>
                                          <td>
                                            <div className='border-solid 
                                            border-[1px] border-[green]
                                             rounded-xl w-[40%] text-center text-[green]
                                             p-1 text-[0.7rem] md:text-[0.9rem]'>In Stock</div>
                                          </td>
                                          <td className='text-[0.7rem] md:text-[1rem]'>
                                              206 pcs
                                          </td>
                                          <td>
                                                $2,226
                                          </td>
                                        </tr>
                                         {/* Super push row */}
                                        <tr className='border border-slate-300'>
                                              <td className='flex gap-4 py-3 px-4'>
                                                    <div>
                                                        <img src={product4} width="100%"/>                                              
                                                    </div>
                                                    <div>
                                                        <h5 className='text-[0.9rem] md:text-[1.2rem] font-bold'>Gioaia Super Push-up Bra</h5>
                                                        <p className='text-[0.7rem]'>Product ID: 134890</p>
                                                    </div>
                                                </td>
                                          <td>$99.99</td>
                                          <td>
                                            <div className='border-solid 
                                            border-[1px] border-[orange]
                                             rounded-xl w-[40%] text-center text-[orange]
                                             p-1 text-[0.9rem]'>Low Stock</div>
                                          </td>
                                          <td>
                                              206 pcs
                                          </td>
                                          <td>
                                                $2,226
                                          </td>
                                        </tr>
                                         {/* Hammered row*/}
                                        <tr className='border border-slate-300'>
                                        <td className='flex gap-4 py-3 px-4'>
                                              <div>
                                                  <img src={product3} width="100%"/>                                              
                                              </div>
                                              <div>
                                                  <h5 className='text-[0.9rem] md:text-[1.2rem] font-bold'>Hammered Drop Earnings</h5>
                                                  <p className='text-[0.7rem]'>Product ID: 134890</p>
                                              </div>
                                          </td>
                                          <td>$220.99</td>
                                          <td>
                                            <div className='border-solid 
                                            border-[1px] border-[green]
                                             rounded-xl w-[40%] text-center text-[green]
                                             p-1 text-[0.9rem]'>In Stock</div>
                                          </td>
                                          <td>
                                              206 pcs
                                          </td>
                                          <td>
                                                $2,226
                                          </td>
                                        </tr>

                                         {/* Crossbody row*/}
                                        <tr className='border border-slate-300'>
                                          <td className='flex gap-4 py-3 px-4'>
                                                <div>
                                                    <img src={product1} width="100%"/>                                              
                                                </div>
                                                <div>
                                                    <h5 className='text-[0.9rem] md:text-[1.2rem] font-bold'>Woman's Crossbody Bag</h5>
                                                    <p className='text-[0.7rem]'>Product ID: 134890</p>
                                                </div>
                                            </td>
                                          <td>$110.99</td>
                                          <td>
                                            <div className='border-solid 
                                            border-[1px] border-[green]
                                             rounded-xl w-[40%] text-center text-[green]
                                             p-1 text-[0.9rem]'>In Stock</div>
                                          </td>
                                          <td>
                                              206 pcs
                                          </td>
                                          <td>
                                                $2,226
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                            </div>
                      </div>
                      
              </div>
    </div>
  )
}

export default Topselling