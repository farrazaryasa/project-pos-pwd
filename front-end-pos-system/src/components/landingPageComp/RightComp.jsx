import { Button, Dropdown, Label, Radio, TextInput } from "flowbite-react";
import { AiOutlineSearch } from 'react-icons/ai';
import { getAllCategories } from "../../api/categories";
import { useEffect, useState } from "react";


export default function RightComp() {
    const [category, setCategory] = useState([])

    const categoryList = async () => {
        const result = await getAllCategories()
        setCategory(result.data)
    }

    useEffect(() => {
        categoryList()
    }, [])

    return (
        <div className="h-full border-l px-5 flex flex-col gap-5 py-14 items-center">
            <div className="flex items-center gap-2">
                {console.log(category)}
                <TextInput placeholder='Search'></TextInput>
                <Button><AiOutlineSearch /></Button>
            </div>
            {/* Filter dropdown */}
            <div>
                <Dropdown label='Filter' className="px-5">
                    <Label>Category</Label>
                    <div className="flex flex-col gap-2 mt-2">
                        {
                            category ?
                                category?.data?.map((value, index) => {
                                    return (
                                        <div className="flex gap-1 items-center">
                                            <Radio id={value.name} name="category" value={value.name} />
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
        </div>
    )
}
