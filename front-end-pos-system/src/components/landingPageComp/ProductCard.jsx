import { Link } from "react-router-dom";


export default function ProductCard(props) {
    return (
        <>
            <Link to={`/${props.data.value.id}`}>
                <div className="relative w-[250px] flex flex-col items-center rounded-lg gap-5 border py-12 hover:bg-gray-600 hover:text-white hover:cursor-pointer">
                    <div className="w-[200px] h-[200px]  flex items-center justify-center">
                        <img src={props.data.value.image}
                            className="object-fit h-full" />
                    </div>
                    <div className="font-bold">
                        Rp {(props.data.value.price).toLocaleString('id')}
                    </div>
                    <div className="font-bold">
                        {props.data.value.name}
                    </div>
                    <div className="border w-full h-9 flex justify-center items-center absolute bottom-0 bg-blue-700 text-white hover:bg-blue-900">
                        Add Order
                    </div>
                </div>
            </Link>
        </>
    )
}
