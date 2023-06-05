import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductDetails } from "../../api/products"



export default function ProductDetails() {
    const {product_id} = useParams()

    const [data, setData] = useState({})

    const getDetails = async () => {
        const result = await getProductDetails(product_id)
        setData(result)
    }

    useEffect(() => {
        getDetails()
    }, [])

    return(
        <div className="flex justify-center">
            <div className="m-12 p-9 border rounded-lg bg-blue-200 w-3/4">
                <div className="text-2xl font-bold">Product Details</div>
                <div className="flex justify-start  gap-9 pt-9">
                    <div className="w-1/3 h-[500px] flex justify-center">
                        <img src={data ? data?.data?.data?.image : ''} className="rounded-lg" />
                    </div>
                    <div className="h-full flex flex-col gap-9">
                        <div className="text-2xl font-bold flex gap-9">
                            Name :
                            <div className="font-normal">{data ? data?.data?.data?.name : ''}</div>
                        </div>
                        <div className="text-2xl font-bold flex gap-9">
                            Price :
                            <div className="font-normal">{data ? data?.data?.data?.price : ''}</div>
                        </div>
                        <div className="text-2xl font-bold flex gap-9">
                            Stock :
                            <div className="font-normal">{data ? data?.data?.data?.stock : ''}</div>
                        </div>
                        <div className="text-2xl font-bold flex gap-9">
                            Category :
                        </div>
                        <div className="text-2xl font-bold flex gap-9">
                            Ingredients :
                        </div>
                        <div className="text-2xl font-bold flex gap-9">
                            Supplier :
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
