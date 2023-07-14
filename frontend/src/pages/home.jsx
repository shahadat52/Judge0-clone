import { useContext } from "react";
import { AuthContext } from "../context/contextProvider";
// import {FaPlay} from "react-icons"

const Home = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    return (
        <div className="grid lg:grid-cols-4 gap-4">
            <div className="col-span-3 bg-gray-800">
                <div>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>Pick your favorite Simpson</option>
                        <option>Homer</option>
                        <option>Marge</option>
                        <option>Bart</option>
                        <option>Lisa</option>
                        <option>Maggie</option>
                    </select>
                    <button className="btn btn-primary">Button</button>
                    {/* <p> <FaPlay/> </p> */}

                </div>
                <div>
                    editor
                </div>
            </div>
            <div className="col-span-1 bg-gray-400">
                output
            </div>
        </div>
    );
};

export default Home;