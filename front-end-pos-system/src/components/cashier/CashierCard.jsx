


export default function CashierCard(props) {
    return (
        <div className="relative w-[250px] flex flex-col items-center rounded-lg gap-5 border py-12 drop-shadow">
            <div className="w-[200px] h-[200px]  flex items-center justify-center">
                <img src={props.data.value.image ? `http://localhost:3456/productImage/${props.data.value.image}` : ''}
                    className="object-fit h-full rounded drop-shadow" />
            </div>
            <div className="font-bold">
                Rp {(props.data.value.price).toLocaleString('id')}
            </div>
            <div className="font-bold">
                {props.data.value.name}
            </div>
            <button className="rounded-b w-full h-9 flex justify-center items-center absolute bottom-0 bg-blue-700 text-white hover:bg-blue-900 hover:cursor-pointer">
                Add to Cart
            </button>
        </div>
    )
}
