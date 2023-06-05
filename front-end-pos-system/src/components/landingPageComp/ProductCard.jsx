import { Modal } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function ProductCard(props) {

    const [visible, setVisible] = useState(false)

    return (
        <div className="relative w-[250px] flex flex-col items-center rounded-lg gap-5 border py-12">
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
            <button onClick={() => setVisible(true)} className="border w-full h-9 flex justify-center items-center absolute bottom-0 bg-blue-700 text-white hover:bg-blue-900 hover:cursor-pointer">
                Details
            </button>

            {/* <Modal show={visible}>
                <Modal.Header>
                    Product Details
                </Modal.Header>
                <Modal.Body>
                    <div className="border">
                        <img src={props.data.value.image} className="border"/>
                    </div>
                </Modal.Body>
            </Modal> */}
        </div>
    )
}
