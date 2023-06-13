import { Button, Dropdown, Radio, FileInput, Label, Modal, Select, TextInput } from "flowbite-react";
import { AiOutlineSearch } from 'react-icons/ai';


export default function TopButton() {
    return (
        <div className="flex gap-9">
            <div>
                <Dropdown label='Filter' className="flex items-center justify-center px-5">
                    <Label>Category</Label>
                    <div className="flex gap-1 items-center">
                        <Radio />
                        <Label>Category 1</Label>
                    </div>
                </Dropdown>
            </div>
            <div>
                <Dropdown label='Sort'>
                    <Label>Sort</Label>
                </Dropdown>
            </div>
        </div>
    )
}
