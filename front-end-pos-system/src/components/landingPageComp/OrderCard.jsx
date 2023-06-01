import { BsTrash3 } from 'react-icons/bs';


export default function OrderCard() {
    return (
        <div className="border flex flex-col gap-5 rounded-lg px-2 py-5">
            <div className="flex items-center gap-5">
                <div className="w-[100px] h-[100px]">
                    <img src="https://media.istockphoto.com/id/1184633031/id/vektor/ilustrasi-terisolasi-vektor-burger-kartun.jpg?s=612x612&w=0&k=20&c=k3FK5h62eTxOC6Tte_gdrnFinLsBtyFD1WNFe1aFSc8="
                        className="object-fit" />
                </div>
                <div className="font-bold">CheeseBurger</div>
                <div className="font-bold">Rp.xxx.xxx</div>
            </div>
            <div className="flex gap-3 items-center justify-center relative">
                <div className='flex gap-3 items-center justify-center'>
                    <button className="border w-7 h-7 text-lg rounded-lg flex items-center justify-center hover:bg-blue-800 hover:text-white">-</button>
                    <div>5</div>
                    <button className="border w-7 h-7 text-lg rounded-lg flex items-center justify-center hover:bg-blue-800 hover:text-white">+</button>
                </div>

                <div className='absolute end-0 px-2 hover:cursor-pointer'><BsTrash3 size={'20px'}/></div>
            </div>
        </div>
    )
}
