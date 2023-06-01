import OrderCard from "./OrderCard";



export default function RightColumn() {
    return (
        <div className="flex-2 w-[350px] h-inherit mx-9 flex flex-col gap-9">
            <div className="font-bold text-2xl underline">New Order</div>
            <div>
                <OrderCard />
            </div>
            <div className="border flex items-center justify-center w-full h-[50px] py-9 text-2xl font-bold rounded-lg hover:bg-blue-800 hover:text-white hover:cursor-pointer">
                Checkout
            </div>
        </div>
    )
}
