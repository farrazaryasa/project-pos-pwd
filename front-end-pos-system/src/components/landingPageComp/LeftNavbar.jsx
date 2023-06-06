import { IoFastFoodOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { LuLogIn } from 'react-icons/lu';
import { BsPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';


export default function LeftNavbar() {
    return (
        <div className="flex-2 w-[150px] h-inherit mx-9">
            <Link to={'/'}>
                <div className="my-5">
                    <img src="https://i.pinimg.com/originals/6e/cb/91/6ecb91e73eab30f51b0b29a880338147.png" alt='logo pos system'/>
                </div>
            </Link>
            <div className="border my-5 px-2 w-full h-[100px] flex items-center justify-center text-lg font-bold rounded-lg hover:bg-blue-800 hover:text-white hover:cursor-pointer">
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-center'><IoFastFoodOutline size={'25px'} /></div>
                    <div>New Order</div>
                </div>
            </div>
            <Link to={'/products'}>
                <div className="border my-5 px-5 w-full h-[100px] flex items-center justify-center text-lg font-bold rounded-lg hover:bg-blue-800 hover:text-white hover:cursor-pointer">
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center justify-center'><RxDashboard size={'25px'} /></div>
                        <div>Dashboard</div>
                    </div>
                </div>
            </Link>
            <div className="border my-5 px-5 w-full h-[100px] flex items-center justify-center text-lg font-bold rounded-lg hover:bg-blue-800 hover:text-white hover:cursor-pointer">
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-center'><BsPeopleFill size={'25px'} /></div>
                    <div>Staff</div>
                </div>
            </div>
            <div className="border my-5 px-5 w-full h-[100px] flex items-center justify-center text-lg font-bold rounded-lg hover:bg-blue-800 hover:text-white hover:cursor-pointer">
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-center'><LuLogIn size={'25px'} /></div>
                    <div>Login</div>
                </div>
            </div>
        </div>
    )
}
