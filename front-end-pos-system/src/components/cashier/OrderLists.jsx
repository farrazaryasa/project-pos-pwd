import { Button, Dropdown, Label, Radio, TextInput } from "flowbite-react";
import { AiOutlineSearch } from 'react-icons/ai';

export default function OrderLists(props) {
    return (
        <div className="border p-2">
            <div className="w-full flex  gap-4 items-center">
                <div className="border w-20 h-20">
                    image
                </div>
                <div>
                    name
                </div>
                <div>
                    price
                </div>
            </div>
            <div className="flex justify-center items-center gap-4">
                <button className="border h-6 w-6 flex items-center justify-center"> - </button>
                <div>quantity</div>
                <button className="border h-6 w-6 flex items-center justify-center"> + </button>
            </div>
        </div>
    )
}
