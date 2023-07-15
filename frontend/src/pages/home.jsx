import { useContext } from "react";
import { AuthContext } from "../context/contextProvider";
import { FaPlay } from 'react-icons/fa';

const Home = () => {
    const { user } = useContext(AuthContext)
    console.log(user);

    const handelCompile = (event) => {
        event.preventDefault();
        const form = event.target;
        const lang = form.lang.value;
        const code = form.code.value;
        // console.log(lang, code);
        const inputData = {
            lang,
            code
        };
        console.log(inputData);

        fetch('https://tempo-psi.vercel.app/compile', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ lang: lang, code: code })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });

    }
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <form onSubmit={handelCompile} className="col-span-3 ">
                <div className="flex justify-between items-center mb-5 bg-[#192a56] rounded p-4  ">
                    <div>
                        <select name="lang" className="select w-full max-w-xs">
                            <option>C++</option>
                            <option>C</option>
                            <option>Python</option>
                            <option>PHP</option>
                            <option>JAVASCRIPT</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <input type="submit" className="btn btn-primary" value="Code Run" />
                        <p className="text-white text-[38px]  "> <FaPlay /> </p>
                    </div>

                </div>
                <div className="text-white bg-[#192a56] rounded p-4">
                    <textarea name="code" className="textarea bg-[#192a56] textarea-bordered textarea-lg w-full h-[500px] " ></textarea>
                </div>
            </form>
            <div className="lg:col  bg-[#192a56] text-white rounded">
                <h1 className="text-4xl font-bold text-center my-5">Output</h1>
                <textarea className=" h-[500px] border-4 border-[#192a56] rounded bg-[#fafafa] p-4 w-full" rows="full" cols="5"></textarea>
            </div>
        </div>
    );
};

export default Home;




