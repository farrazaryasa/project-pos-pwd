import RightColumn from '../../components/landingPageComp/RightColumn';
import LeftNavbar from '../../components/landingPageComp/LeftNavbar';
import ProductCenter from '../../components/landingPageComp/ProductCenter';


export default function LandingPage() {
    return (
        <div className="flex gap-5 py-9 justify-between">
            {/* Navbar kiri */}
            <LeftNavbar />

            {/* Menu tengah */}
            <ProductCenter />

            {/* Transaction kanan */}
            <RightColumn />
        </div>
    )
}
