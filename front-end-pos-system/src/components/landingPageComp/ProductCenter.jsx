import ProductCard from "./ProductCard";
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';


export default function ProductCenter() {
    const [data, setData] = useState([])

    const getProducts = async () => {
        const result = await getAllProducts()
        setData(result.data.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="flex-1 h-full mx-9 flex gap-5 flex-wrap items-center ">
            {
                data.map((value, index) => {
                    return (
                        <ProductCard key={index} data={{ value }} />
                    )
                })
            }
        </div>
    )
}
