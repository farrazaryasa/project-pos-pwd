import LeftNavbar from '../../components/landingPageComp/LeftNavbar';
import ProductCenter from '../../components/landingPageComp/ProductCenter';
import RightComp from '../../components/landingPageComp/RightComp';

export default function ProductsList() {
    return (
        <div className="flex-1 py-9 flex">
            {/* Menu tengah */}
            <div>
                <ProductCenter />
            </div>
            {/* Bagian Kanan ==> filter dan search */}
            <div className='w-1/4'>
                <RightComp />
            </div>
        </div>
    )
}
