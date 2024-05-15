import React, { useEffect, useState } from 'react'
import GlobalApi from "@/app/_utils/GlobalApi";
import Link from 'next/link';

const HeaderList = () => {
    const [list, setList] = useState([]);

    useEffect(()=>{
        getCartList()
    },[])
    const getCartList =  () => {
        GlobalApi.getCategoryList().then(
            (res) => {
                const result = res?.data?.data;
                setList(result)
            }
        )
    } 
  return (
    <div className="category-list bg-primaryCustom px-5 lg:px-10 py-2">
          <ul className="flex flex-wrap gap-6 lg:gap-10 text-white capitalize">
            {
                list.map((item, index) => (
                    <li key={index} className="hover:text-secondaryCustom">
                        <Link href={`/products/${item.attributes.name}`}>{item.attributes.name}</Link>
                    </li>
                ))
            }
          </ul>
        </div>
  )
}

export default HeaderList