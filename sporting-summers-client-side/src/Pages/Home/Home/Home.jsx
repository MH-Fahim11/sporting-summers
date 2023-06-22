import NewsLetter from "../NewsLetter/NewsLetter";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors ";
import TopSlider from "../TopSlider/TopSlider";


const Home = () => {
    return (
        <div>
            <TopSlider></TopSlider>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;