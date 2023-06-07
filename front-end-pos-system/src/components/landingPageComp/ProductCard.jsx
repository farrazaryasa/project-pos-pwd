import { Button, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../api/products";


export default function ProductCard(props) {

    const [visible, setVisible] = useState(false)
    const [id, setId] = useState(props.data.value.id)

    const deleteButton = async () => {
        const confirmation = window.confirm("Are you sure want to delete this product ?")
        if(confirmation === true){
            const deleteResult = await deleteProduct(id)
            alert('delete product success')
            setTimeout(() => window.location.reload(), 1000)
        }
    }


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
            <button onClick={() => setVisible(true)} className="rounded-b w-full h-9 flex justify-center items-center absolute bottom-0 bg-blue-700 text-white hover:bg-blue-900 hover:cursor-pointer">
                Details
            </button>

            <Modal show={visible} onClose={() => setVisible(false)}>
                <Modal.Header>
                    Product Details
                </Modal.Header>
                <Modal.Body>
                    <div className="flex gap-5">
                        <div className="w-1/2">
                            <img src={props.data.value.image ? `http://localhost:3456/productImage/${props.data.value.image}` : ''} />
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
                    <Button className="w-1/5">Edit</Button>
                    <Button className="w-1/5" color='failure' onClick={deleteButton}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
