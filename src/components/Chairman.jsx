import Navbar from "./Navbar";
import chairman from "../components/home/chairman.avif";
import End from "./home/End";

function Chairman(){
    return(
        <div>
            <Navbar/>
            <div className="chair1">
                <div className="bg-transparent">
                    <div className="bg-transparent">
                        <h1 className="bg-transparent  text-5xl font-bold text-center
                         border-b-2 ">Chairman's Desk</h1>
                    </div>

                    <div className="grid grid-cols-3 gap-20 p-10 bg-transparent">
                    
                    <div className="chair3 p-10 mr-8 border ml-8  bg-transparent  rounded-2xl ">
                        <img src={chairman} className="h-48 ml-10 rounded-full border cursor-pointer" />
                        <h2 className="bg-transparent text-3xl text-center mt-6 font-bold cursor-pointer">Wild Rose</h2>
                        <h2 className="bg-transparent mt-4 text-lg text-center font-semibold">Chairman of Astha Health Network</h2>
                    </div>

                    <div className="bg-transparent chair3 border ml-16">
                        <h2 className="bg-transparent text-center text-3xl mt-2 font-bold">Her Views</h2>
                        <p className="bg-transparent mt-4 ml-2 text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni harum fuga tenetur corrupti, quia velit dicta ullam consequatur quam soluta, obcaecati veritatis atque. Commodi neque quos quam nihil vitae quisquam!
                        </p>
                        <p className="bg-transparent mt-2 ml-2 text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolor est aut asperiores ipsum temporibus corrupti ducimus assumenda, natus animi? Itaque ipsam voluptate soluta distinctio minima eligendi placeat quo et.
                        </p>
                    </div>

                    <div className="bg-transparent chair3 border ml-20">
                        <div className="h-60 w-60 ml-14 mt-8">
                            nasrin
                        </div>
                        <h2 className="bg-transparent text-center mt-4 text-white">See Her Speech</h2>
                        
                    </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-10">
                <End/>
            </div>
        </div>
    )
}
export default Chairman;