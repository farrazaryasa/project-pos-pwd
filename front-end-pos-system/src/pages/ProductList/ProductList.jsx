import LeftNavbar from '../../components/landingPageComp/LeftNavbar';
import ProductCenter from '../../components/landingPageComp/ProductCenter';

export default function ProductsList() {
    return (
        <div className="flex gap-5 py-9 justify-between">
            {/* Navbar kiri */}
            <LeftNavbar />

            {/* Menu tengah */}
            <ProductCenter />
        </div>
    )
}
