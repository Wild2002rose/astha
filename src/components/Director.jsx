import Navbar from "../components/Navbar"
import End from "./home/End";
import dir2 from "../components/home/dir1.avif"
import ln from "../components/home/link (2).png"
import fb from "../components/home/fb.png"
import In from "../components/home/insta.png"
import dir1 from "../components/home/dir1.avif"


function Director(){
    return(
        <div>
        <Navbar/>
        
        <div className="director">
        <h1 className="bg-transparent text-lime-400 text-5xl  font-semibold text-center ">Meet Our Directors</h1>

        <div className="grid grid-cols-4 gap-10 directors ">

            <div className="class">
            <div className="dir1">
                <img src={dir1} className="rounded-full h-40 ml-12 "/>
            </div>
            <div className="bg-white director1">
                
                <div className="bg-white ">
                <h2 className="bg-transparent text-gray-700 text-lg font-semibold text-center ">Excecutive Vice Chairperson</h2>

                <h2 className="bg-transparent text-lime-400  font-bold  text-lg text-center ">Dr. Priya Biswas</h2>

                <p className="bg-transparent text-center text-gray-600 font-semibold text-md">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore optio rerum non, et iste, soluta consequuntur fugit officiis </p>

                <div className="bg-transparent icon flex ml-16">
                    <strong><img src={ln} className="bg-transparent h-10 w-10"/></strong>
                    <strong><img src={fb} className="bg-transparent h-14 w-14"/></strong>
                    <strong><img src={In} className="bg-transparent h-10 w-10"/></strong>
                </div>
                </div>
            </div>
            </div>

            <div className="bg-transparent  ">
            <div className="dir1">
                <img src={dir2} className="rounded-full h-40 ml-12 "/>
            </div>
            <div className="bg-white director1">
                
                <div className="bg-white ">
                <h2 className="bg-transparent text-gray-700 text-lg font-semibold text-center ">Promotor Director</h2>

                <h2 className="bg-transparent text-lime-400  font-bold  text-lg text-center ">Dr. Hayat Alam</h2>

                <p className="bg-transparent text-center text-gray-600 font-semibold text-md">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore optio rerum non, et iste, soluta consequuntur fugit officiis </p>

                <div className="bg-transparent icon flex ml-16">
                    <strong><img src={ln} className="bg-transparent h-10 w-10"/></strong>
                    <strong><img src={fb} className="bg-transparent h-14 w-14"/></strong>
                    <strong><img src={In} className="bg-transparent h-10 w-10"/></strong>
                </div>
                </div>
            </div>
            </div>

            <div className="bg-transparent  ">
            <div className="dir1">
                <img src={dir1} className="rounded-full h-40 ml-12 "/>
            </div>
            <div className="bg-white director1">
                
                <div className="bg-white ">
                <h2 className="bg-transparent text-gray-700 text-lg font-semibold text-center "> Managing Director</h2>

                <h2 className="bg-transparent text-lime-400  font-bold  text-lg text-center ">Hasibur Rahaman</h2>

                <p className="bg-transparent text-center text-gray-600 font-semibold text-md">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore optio rerum non, et iste, soluta consequuntur fugit officiis </p>

                <div className="bg-transparent icon flex ml-16">
                    <strong><img src={ln} className="bg-transparent h-10 w-10"/></strong>
                    <strong><img src={fb} className="bg-transparent h-14 w-14"/></strong>
                    <strong><img src={In} className="bg-transparent h-10 w-10"/></strong>
                </div>
                </div>
            </div>
            </div>

            <div className="bg-transparent  ">
            <div className="dir1">
                <img src={dir1} className="rounded-full h-40 ml-12 "/>
            </div>
            <div className="bg-white director1">
                
                <div className="bg-white ">
                <h2 className="bg-transparent text-gray-700 text-lg font-semibold text-center ">Joint Managing Director</h2>

                <h2 className="bg-transparent text-lime-400  font-bold  text-lg text-center ">Sabnam Parvin</h2>

                <p className="bg-transparent text-center text-gray-600 font-semibold text-md">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore optio rerum non, et iste, soluta consequuntur fugit officiis </p>

                <div className="bg-transparent icon flex ml-16">
                    <strong><img src={ln} className="bg-transparent h-10 w-10"/></strong>
                    <strong><img src={fb} className="bg-transparent h-14 w-14"/></strong>
                    <strong><img src={In} className="bg-transparent h-10 w-10"/></strong>
                </div>
                </div>
            </div>
            </div>

        </div>
        </div>

        
        
        <div className="bg-transparent mt-10">
        <End/>
        </div>
        </div>
    )
}
export default Director;