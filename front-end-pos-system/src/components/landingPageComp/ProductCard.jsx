


export default function ProductCard() {
    return(
        <div className="w-[250px] flex flex-col items-center rounded-lg gap-5 border py-9 hover:bg-orange-200 hover:cursor-pointer">
            <div className="w-[200px] h-[200px]  flex items-center justify-center">
                <img src="https://media.istockphoto.com/id/1184633031/id/vektor/ilustrasi-terisolasi-vektor-burger-kartun.jpg?s=612x612&w=0&k=20&c=k3FK5h62eTxOC6Tte_gdrnFinLsBtyFD1WNFe1aFSc8=" 
                className="drop-shadow-lg object-fit "/>
            </div>
            <div className="font-bold">
                Rp.xxx.xxx
            </div>
            <div className="font-bold">
                CheeseBurger
            </div>
        </div>
    )
}
