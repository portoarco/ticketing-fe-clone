
export default function HeroSection() {

    return (

        <header className="flex justify-center relative  px-6 sm:px-8">
            <div className="w-full h-[85vh] max-h-[750px]  bg-ut-orange rounded-b-3xl">
                <div className="w-full h-full flex items-end p-14 px-15 text-white">
                    <div className="space-y-6">
                        <h1 className="font-display text-7xl font-bold">Loremipsum</h1>
                        <p className="font-sans text-lg">Lorem ipsum Morbi erat ex, lacinia nec efficitur eget, sagittis ut orci. <br/> Etiam in dolor placerat, pharetra ligula et, bibendum neque. </p>
                        <a href="" className="font-sans text-xl font-bold
                        ">Morbi mollis</a>
                    </div>
                </div>
            </div>
        </header>

    );
}
