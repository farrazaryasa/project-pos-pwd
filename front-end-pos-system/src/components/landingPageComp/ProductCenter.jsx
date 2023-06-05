import ProductCard from "./ProductCard";
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';
import { Button, Pagination } from "flowbite-react";


export default function ProductCenter() {
    const [data, setData] = useState([])
    let [page, setPage] = useState(1)
    const queryParams = new URLSearchParams(window.location.search)
    const pageNum = queryParams.get("page")

    const getProducts = async () => {
        const result = await getAllProducts(page)
        setData(result.data)
    }

    const nextPage = () => {
        if (page != data.totalPage) {
            setPage(page += 1)
            getProducts(page)
        }
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page -= 1)
            getProducts(page)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="pb-9 flex-1">
            {console.log(pageNum)}
            <Button className="" gradientDuoTone="purpleToBlue">Add New Product</Button>
            <div className="flex-1 h-full mx-9 flex gap-5 flex-wrap items-center ">
                {
                    data?.data?.map((value, index) => {
                        return (
                            <ProductCard key={index} data={{ value }} />
                        )
                    })
                }
            </div>
            <div className="flex justify-center gap-2 items-center">
                {
                    page <= 1 ? <Button disabled className="border hover:cursor-default">
                        Prev
                    </Button> : <Button onClick={prevPage} className="border hover:cursor-pointer">
                        Prev
                    </Button>
                }
                <div className="hover:cursor-default">
                    Page {page}
                </div>
                {
                    page != data.totalPage ? <Button onClick={nextPage} className="border hover:cursor-pointer">
                        Next
                    </Button> : <Button disabled className="border hover:cursor-default">
                        Next
                    </Button>
                }

            </div>
        </div>
    )
}
