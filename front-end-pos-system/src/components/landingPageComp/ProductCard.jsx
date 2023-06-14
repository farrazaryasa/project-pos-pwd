import { Button, FileInput, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, modifyProducts } from "../../api/products";


export default function ProductCard(props) {

    const [visible, setVisible] = useState(false)
    const id = props.data.value.id
    const [edit, setEdit] = useState(false)
    const _name = useRef()
    const _price = useRef()
    const _stock = useRef()
    const _image = useRef()

    const deleteButton = async () => {
        const confirmation = window.confirm("Are you sure want to delete this product ?")
        if (confirmation === true) {
            const deleteResult = await deleteProduct(id)
            alert('delete product success')
            setTimeout(() => window.location.reload(), 1000)
        }
    }

    const closeModal = () => {
        setEdit(false)
        setVisible(false)
    }

    const editProduct = async () => {
        const name = _name.current.value ? _name.current.value : ''
        const price = _price.current.value ? _price.current.value : ''
        const stock = _stock.current.value ? _stock.current.value : ''
        const image = _image.current.files[0] ? _image.current.files[0] : ''

        if (!name && !price && !stock && !image) {
            alert('Please fill at least one field')
        } else {
            const confirmation = window.confirm("Are you sure want to update this product ?")
            if (confirmation === true) {
                const result = await modifyProducts({ id, name, price, stock, image })
                if (result.data.success === true) {
                    alert('Update data success')
                    setTimeout(() => window.location.reload(), 500)
                } else {
                    alert('Update data failed')
                }
            }
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

            <Modal show={visible} onClose={closeModal}>
                {edit ?
                    <div>
                        <Modal.Header>Edit Product</Modal.Header>
                        <Modal.Body>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <Label>Product Name</Label>
                                    <TextInput ref={_name} defaultValue={''} placeholder={props.data.value.name}></TextInput>
                                </div>
                                <div>
                                    <Label>Price</Label>
                                    <TextInput ref={_price} defaultValue={''} placeholder={props.data.value.price}></TextInput>
                                </div>
                                <div>
                                    <Label>Stock</Label>
                                    <TextInput ref={_stock} defaultValue={''} placeholder={props.data.value.stock}></TextInput>
                                </div>
                                <div>
                                    <Label>Image</Label>
                                    <FileInput ref={_image} defaultValue={''}></FileInput>
                                </div>
                                <div className="flex items-center gap-5 mt-5">
                                    <Button onClick={editProduct}>SUBMIT</Button>
                                    <Button color='failure' onClick={() => setEdit(false)}>CANCEL</Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </div>
                    :
                    <div>
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
                                        {/* Category :
                                        <div className="font-normal">
                                            -
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="w-1/5" onClick={() => setEdit(true)}>Edit</Button>
                            <Button className="w-1/5" color='failure' onClick={deleteButton}>Delete</Button>
                        </Modal.Footer></div>}
            </Modal>
        </div>
    )
}
