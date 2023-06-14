import { useEffect, useState } from "react";
import LeftNavbar from "../../components/landingPageComp/LeftNavbar";
import { getAllProducts } from "../../api/products";
import CashierCard from "../../components/cashier/CashierCard";
import TopButton from "../../components/cashier/TopButton";
import { Button } from "flowbite-react";
import OrderLists from "../../components/cashier/OrderLists";
import { confirmOrder, getAllOrders, removeOrder } from "../../api/orders";




export default function CashierLandingPage() {
    const [data, setData] = useState([])
    const [filterCategory, setFilterCategory] = useState('')
    let [page, setPage] = useState(1)
    const [cart, setCart] = useState([])

    const productLists = async () => {
        const catQuery = filterCategory.replaceAll(' ', '%')
        const result = await getAllProducts({ page, filterCategory })
        setData(result.data)
    }

    const nextPage = () => {
        if (page !== data.totalPage) {
            setPage(page += 1)
            productLists()
        }
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page -= 1)
            productLists()
        }
    }

    const productCart = async () => {
        const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : null
        if (userLogin) {
            const result = await getAllOrders()
            setCart(result.data)
        }
    }

    const submitOrder = async () => {
        try {
            const confirmation = window.confirm('Confirm Order?')
            if (confirmation === true) {
                const confirm = await confirmOrder()
                if (confirm.data.success === true) {
                    alert('Order Submitted')
                    setTimeout(() => {
                        productCart()
                    }, 200);
                }
            }
        } catch (error) {
            alert('Failed to submit order')
        }
    }

    const cancelOrder = async () => {
        try {
            const confirmation = window.confirm('Cancel Order?')
            if (confirmation === true) {
                const cancel = await removeOrder()

                if (cancel.data.success === true) {
                    alert('Order Cancelled')
                    setTimeout(() => {
                        productCart()
                    }, 200)
                }
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        productLists()
        productCart()
    }, [])

    return (
        <div className="flex">
            <div className="flex flex-col gap-5 py-9">
                <div>
                    <TopButton />
                </div>
                <div className="flex-1 h-full mx-12 flex gap-5 flex-wrap items-center">
                    {
                        data?.data?.rows?.map((value, index) => {
                            return (
                                <CashierCard key={index} data={{ value, productCart }} />
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
                        page !== data.totalPage ? <Button onClick={nextPage} className="border hover:cursor-pointer">
                            Next
                        </Button> : <Button disabled className="border hover:cursor-default">
                            Next
                        </Button>
                    }

                </div>
            </div>

            <div className="w-1/2 border-l">
                <div className="h-full px-5 flex flex-col gap-5 py-14">
                    <div className="flex items-center gap-2 w-full border-b-4 border-solid">
                        <div className="font-bold text-2xl">NEW ORDER</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {cart?.data?.map((value, index) => {
                            return (
                                <OrderLists key={index} data={value} />
                            )
                        })}
                    </div>

                    {
                        cart?.data?.length > 0 ? <div className="flex gap-5">
                            <Button onClick={submitOrder}>Confirm Order</Button>
                            <Button onClick={cancelOrder} color={'failure'}>Cancel</Button>
                        </div> : ''
                    }
                </div>
            </div>
        </div>
    )
}
