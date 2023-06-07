import ProductCard from "./ProductCard";
import { useEffect, useRef, useState } from 'react';
import { createProducts, getAllProducts } from '../../api/products';
import { Button, Dropdown, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";


export default function ProductCenter() {
    const [data, setData] = useState([])
    let [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const _name = useRef()
    const _price = useRef()
    const _stock = useRef()
    const _image = useRef()


    const getProducts = async () => {
        const result = await getAllProducts(page)
        setData(result.data)
    }

    const nextPage = () => {
        if (page !== data.totalPage) {
            setPage(page += 1)
            getProducts(page)
        }
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page -= 1)
            getProducts(page)
        }
    }

    const newProducts = async () => {
        const name = _name.current.value
        const price = _price.current.value
        const stock = _stock.current.value
        const image = _image.current.files[0]

        if (!name || !price || !stock || !image) {
            alert('Please fill all the fields')
        } else {
            const result = await createProducts({
                name: name,
                price: price,
                stock: stock,
                image: image
            })

            if (result.data.success) {
                alert('Create new product success')
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            } else {
                alert('Create new product failed')
            }
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="h-full w-full flex flex-col gap-5 flex-1">

            <div> <Button onClick={() => setVisible(true)} className=" h-9" gradientDuoTone="purpleToBlue">Add New Product</Button> </div>

            <div className="flex-1 h-full mx-12 flex gap-5 flex-wrap items-center ">
                {
                    data?.data?.map((value, index) => {
                        return (
                            <ProductCard key={index} data={{ value }} />
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

            <Modal show={visible} onClose={() => setVisible(false)}>
                <Modal.Header>
                    Add New Product
                </Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col gap-4">
                        <div>
                            <Label value="Product Name"></Label>
                            <TextInput ref={_name}></TextInput>
                        </div>
                        <div>
                            <Label value='Category'></Label>
                            <Dropdown label='Choose One'>
                            </Dropdown>
                        </div>
                        <div>
                            <Label value="Price"></Label>
                            <TextInput ref={_price}></TextInput>
                        </div>
                        <div>
                            <Label value="Stock"></Label>
                            <TextInput ref={_stock}></TextInput>
                        </div>
                        <div>
                            <Label value="Image"></Label>
                            <FileInput ref={_image}></FileInput>
                        </div>
                        <div className="pt-5 flex gap-5">
                            <Button onClick={newProducts} type="submit" className="w-1/5">
                                Submit
                            </Button>
                            <Button onClick={() => setVisible(false)} color="failure" className="w-1/5">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
