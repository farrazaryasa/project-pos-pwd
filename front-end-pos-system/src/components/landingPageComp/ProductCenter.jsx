import ProductCard from "./ProductCard";
import { useEffect, useRef, useState } from 'react';
import { createProducts, filterProducts, getAllProducts } from '../../api/products';
import { getAllCategories } from "../../api/categories";
import { Button, Dropdown, Radio, FileInput, Label, Modal, Select, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineLineChart } from 'react-icons/ai'


export default function ProductCenter() {
    const [data, setData] = useState([])
    let [page, setPage] = useState(1)
    const [category, setCategory] = useState([])
    const [visible, setVisible] = useState(false)
    const [filterCategory, setFilterCategory] = useState('')

    const _name = useRef()
    const _price = useRef()
    const _stock = useRef()
    const _image = useRef()
    const _category = useRef()

    const getProducts = async () => {
        const catQuery = filterCategory.replaceAll(' ', '%')
        // console.log('filter => ', filterCategory);
        const result = await getAllProducts({ page, filterCategory })
        console.log('data => ', result.data);
        setData(result.data)
    }

    const nextPage = () => {
        if (page !== data.totalPage) {
            setPage(page += 1)
            getProducts()
        }
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page -= 1)
            getProducts()
        }
    }

    const newProducts = async () => {
        const name = _name.current.value
        const price = _price.current.value
        const stock = _stock.current.value
        const image = _image.current.files[0]
        const category = _category.current.value

        if (!name || !price || !stock || !image || !category) {
            alert('Please fill all the fields')
        } else {
            const result = await createProducts({
                name: name,
                price: price,
                stock: stock,
                image: image,
                category: category
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

    const categoryList = async () => {
        const result = await getAllCategories()
        setCategory(result.data)
    }

    const filter = async (category) => {
        setFilterCategory(category.name)
        getProducts()
    }

    useEffect(() => {
        getProducts()
        categoryList()
    }, [filterCategory])

    return (
        <div className="flex">
            <div className="h-full w-full flex flex-col gap-5 flex-1">

                <div className="flex justify-between items-center">
                    <div className="flex gap-9 items-center">
                        <div> <Button onClick={() => setVisible(true)} className=" h-9" gradientDuoTone="purpleToBlue">Add New Product</Button> </div>
                        <Link to={'/report'}>
                            <div>
                                <Button color={'gray'}><AiOutlineLineChart className="mr-2" size={23} />Generate Report</Button>
                            </div>
                        </Link>
                    </div>

                    {/* Bagian Kanan ==> filter dan search */}
                    <div className="h-full px-5 flex gap-5 items-center">
                        {/* Filter dropdown */}
                        <div>
                            <Dropdown label='Filter' className="px-5">
                                <Label>Category</Label>
                                <div className="flex flex-col gap-2 mt-2">
                                    {
                                        category ?
                                            category?.data?.map((value, index) => {
                                                return (
                                                    <div key={index} className="flex gap-1 items-center">
                                                        <Radio id={value.name} name="category" onClick={() => filter(value)} value={value.name} />
                                                        <Label>{value.name}</Label>
                                                    </div>
                                                )
                                            }) :
                                            ''
                                    }
                                </div>
                            </Dropdown>
                        </div>
                        {/* Sort Dropdown */}
                        <div>
                            <Dropdown label='Sort'>
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="flex gap-2">
                                        <Radio />
                                        <Label>A - Z</Label>
                                    </div>
                                    <div className="flex gap-2">
                                        <Radio />
                                        <Label>Z - A</Label>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                        <div className="flex items-center gap-2">
                            <TextInput placeholder='Search'></TextInput>
                            <Button><AiOutlineSearch /></Button>
                        </div>
                    </div>

                </div>

                <div className="flex-1 h-full mx-12 flex gap-5 flex-wrap items-center">
                    {
                        data?.data?.rows?.map((value, index) => {
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
                                <Select ref={_category}>
                                    <option>

                                    </option>
                                    {
                                        category?.data?.map((value, index) => {
                                            return (
                                                <option key={index} value={value.name} >
                                                    {value.name}
                                                </option>
                                            )
                                        })
                                    }
                                </Select>
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
        </div>
    )
}
