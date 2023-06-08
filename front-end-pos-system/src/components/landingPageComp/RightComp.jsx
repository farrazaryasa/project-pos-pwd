import { Button, Dropdown, Label, Radio, TextInput } from "flowbite-react";
import { AiOutlineSearch } from 'react-icons/ai';


export default function RightComp() {
    return (
        <div className="h-full border-l px-5 flex flex-col gap-5 py-14 items-center">
            <div className="flex items-center gap-2">
                <TextInput placeholder='Search'></TextInput>
                <Button><AiOutlineSearch /></Button>
            </div>
            {/* Filter dropdown */}
            <div>
                <Dropdown label='Filter' className="px-5">
                    <Label>Category</Label>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex gap-1 items-center"> 
                            <Radio id="indonesianFood" name="category" value='indonesian%food'/>
                            <Label>Indonesian Food</Label>
                        </div>
                        <div className="flex gap-1 items-center">
                            <Radio id="westernFood" name="category" value='western%food'/>
                            <Label>Western Food</Label>
                        </div>
                        <div className="flex gap-1 items-center">
                            <Radio id="coldBeverages" name="category" value='cold%beverages'/>
                            <Label>Cold Beverages</Label>
                        </div>
                        <div className="flex gap-1 items-center">
                            <Radio id="hotBeverages" name="category" value='hot%beverages'/>
                            <Label>Hot Beverages</Label>
                        </div>
                        <div className="flex gap-1 items-center">
                            <Radio id="softDrink" name="category" value='soft%drink'/>
                            <Label>Soft Drink</Label>
                        </div>
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
