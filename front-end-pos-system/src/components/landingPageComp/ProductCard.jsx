import { Button, Modal } from "flowbite-react";
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

            <Modal show={visible} onClose={() => setVisible(false)}>
                <Modal.Header>
                    Product Details
                </Modal.Header>
                <Modal.Body>
                    <div className="flex gap-5">
                        <div className="w-1/2">
                            <img src={props.data.value.image} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold flex gap-5">
                                Name :
                                <div className="font-normal">
                                    {props.data.value.name}
                                </div>
                            </div>
                            <div className="font-bold flex gap-5">
                                Price :
                                <div className="font-normal">
                                    Rp {(props.data.value.price).toLocaleString('id')}
                                </div>
                            </div>
                            <div className="font-bold flex gap-5">
                                Stock :
                                <div className="font-normal">
                                    {props.data.value.stock}
                                </div>
                            </div>
                            <div className="font-bold flex gap-5">
                                Category :
                                <div className="font-normal">
                                    -
                                </div>
                            </div>
                            <div className="font-bold flex gap-5">
                                Ingredients :
                                <div className="font-normal">
                                    -
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
