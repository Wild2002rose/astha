import chairman from "../home/chairman.avif"
import arrow from "../home/arrow.png"
import dir1 from "../home/dir1.avif"
import dir2 from "../home/dir2.avif"
import dir3 from "../home/dir3.jpg"
import dir4 from "../home/dir4.webp"

function SectionThree() {
    return (
        <div className="flex flex-row-2 mb-10 mt-10 ml-20 mr-20">

            <div className="flex-1  section_one  rounded-lg " style={{height:'600px'}}>
                <div className="flex bg-transparent"> 
                <img src={chairman} alt="" className="rounded-full h-40 w-40 ml-10 mt-10" />
                <div className="flex flex-col bg-transparent border-b border-blue-800 w-80 ml-5 h-40">
                <h1 className="bg-transparent text-2xl text-blue-700 font-bold mt-14 ml-14 ">Wild Rose</h1>
                <h2 className="bg-transparent text-lg text-blue-500 font-semibold  ml-14">Founder, Chairman</h2>
                <h3 className="bg-transparent text-md text-blue-500 font-semibold  ml-14">Astha Health Network</h3>
                </div>
                </div>

                <div className="bg-transparent text-blue-500 ml-15">
                    <p className="bg-transparent font-semibold ml-10 mt-4 mr-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus repellendus, voluptatibus asperiores possimus totam soluta in consectetur deserunt ut ducimus iste error corporis amet vero quos, quo, cupiditate impedit sint!</p>

                    <p className="bg-transparent font-semibold ml-10 mt-4 mr-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus repellendus, voluptatibus asperiores possimus totam soluta in consectetur deserunt ut ducimus iste error corporis amet vero quos, quo, cupiditate impedit sint!</p>

                    <p className="bg-transparent font-semibold ml-10 mt-4 mr-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus repellendus, voluptatibus asperiores possimus totam soluta in consectetur deserunt ut ducimus iste error corporis amet vero quos, quo, cupiditate impedit sint!</p>
                </div>
                <button className="mt-5 flex ml-10 font-bold hover:text-blue-600 cursor-pointer">View Profile <span className="bg-transparent"><img src={arrow} alt="" className="h-4 w-4 ml-2 mt-1 bg-transparent" /></span></button>
                
            </div>


            <div className="flex-1 section_one ml-10 rounded-lg" style={{height:'600px'}}>
                <div className="bg-transparent mt-10 h-10 border-b border-blue-700 w-80 items-center justify-center flex ml-40 ">
                    <h1 className="bg-transparent text-center font-bold text-3xl text-blue-700 ">Our Directors</h1>
                </div>

                <div className="flex flex-row h-60 bg-transparent ">

                    <div className=" w-60 ml-14 mt-5 rounded-md section_one cursor-pointer ">
                        <img src={dir1} alt="" className="h-40 w-full rounded-md border-2"/>
                        <h1 className="bg-transparent text-blue-700 font-bold text-md ml-2">Dr. Priya Biswas</h1>
                        <h4 className="bg-transparent text-blue-500 font-bold text-xs ml-2">Executive Vice Chairperson,Astha Health Network</h4>
                    </div>

                    <div className=" w-60 ml-10 mt-5 rounded-md section_one cursor-pointer">
                    <img src={dir1} alt="" className="h-40 w-full rounded-md border-2"/>
                    <h1 className="bg-transparent text-blue-700 font-bold text-md ml-2">Dr. Hayat Alam</h1>
                    <h4 className="bg-transparent text-blue-500 font-bold text-xs ml-2">Promoter Director, Astha Health Co Ltd</h4>
                    </div>

                </div>

                <div className="flex flex-row h-60 bg-transparent ">

                    <div className=" w-60 ml-14 mt-5 rounded-md section_one cursor-pointer">
                    <img src={dir4} alt="" className="h-40 w-full rounded-md border-2"/>
                    <h1 className="bg-transparent text-blue-700 font-bold text-md ml-2">Hasibur Rahaman</h1>
                    <h4 className="bg-transparent text-blue-500 font-bold text-xs ml-2">Managing Director</h4>
                    </div>

                    <div className=" w-60 ml-10 mt-5 rounded-md section_one cursor-pointer">
                    <img src={dir2} alt="" className="h-40 w-full rounded-md border-2"/>
                    <h1 className="bg-transparent text-blue-700 font-bold text-md ml-2">Sabnam Parvin</h1>
                    <h4 className="bg-transparent text-blue-500 font-bold text-xs ml-2">Joint Managing Director</h4>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default SectionThree;
