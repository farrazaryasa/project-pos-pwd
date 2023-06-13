import { Button, Dropdown, Label, Radio, TextInput } from "flowbite-react";
import { AiOutlineSearch } from 'react-icons/ai';

export default function OrderLists(props) {
    return (
        <div className="border p-2">
            {console.log(props)}
            <div className="w-full flex gap-4 items-center justify-around">
                <div className="border w-20 h-20">
                    <img src={props.data.product.image ? `http://localhost:3456/productImage/${props.data.product.image}` : ''} className="w-full h-full" />
                </div>
                <div className="font-bold">
                    {props.data.product.name}
                </div>
                <div>
                    Rp {(props.data.product.price).toLocaleString('id')}
                </div>
            </div>
            <div className="flex justify-between items-center gap-4 pt-4">
                <div className="flex gap-4">
                    <button className="border h-6 w-6 flex items-center justify-center"> - </button>
                    <div>{props.data.quantity}</div>
                    <button className="border h-6 w-6 flex items-center justify-center"> + </button>
                </div>
                <div className="font-bold">Total : Rp {((props.data.product.price) * (props.data.quantity)).toLocaleString('id')}</div>
            </div>
        </div>
    )
}
