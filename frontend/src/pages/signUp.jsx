import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/contextProvider";
import { toast } from "react-hot-toast";
import { useToken } from "../Hook/useToken";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const [signUpEmail, setSignUpEmail] = useState('')
    const [token] = useToken(signUpEmail)
    const navigate = useNavigate()


    useEffect(() => {
        if (token) {
            console.log('alhamdulillah token set hoyeche');
            navigate('/');
        }
    }, [token, navigate]);

    const handleSignUp = (data) => {
        const name = data.FName + ' ' + data.LName
        console.log(data.email, data.password);
        createUser(data.email, data.password)
            .then(result => {
                console.log(result);
                const userInfo = {
                    displayName: data.FName + ' ' + data.LName, photoURL: data.photo
                };
                updateUser(userInfo)
                    .then(result => {
                        console.log(result);
                        toast.success('user create and info update success')
                        saveUserDataToDb(data.email, name)
                    }

                    )
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);

                // Swal.fire("Opps", error.message, "error");
            });
    }

    const saveUserDataToDb = (email, name) => {
        const user = { email, name };
        fetch("https://tempo-psi.vercel.app/users", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledge === false) {
                    console.log(data);
                    setSignUpEmail(email);
                    toast.success(data.message)
                    console.log(data.message);
                    return;
                }
                setSignUpEmail(email);
                toast.success('User data saved to DB')

            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-500 rounded-lg shadow-md p-8">
                <div className="text-center">
                    <img
                        className="mx-auto h-40 w-auto"
                        src={logo}
                        alt="Logo"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignUp)}>

                    <div className='flex justify-center gap-2'>
                        <div>
                            <input
                                type="text"
                                {...register('FName', {
                                    required: 'First Name is required',
                                    pattern: {
                                        message: 'Enter Your Name',
                                    },
                                })}
                                className={`${errors.FName ? 'border-red-500' : 'border-gray-300'
                                    } appearance-none block w-[100%]  px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
                                placeholder="First Name"
                            />
                            {errors.FName && (
                                <p className="mt-2 text-sm text-gray-100 bg-red-500 rounded py-1 text-center mr-5 "> {errors.FName.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                {...register('LName', {
                                    required: 'Last Name is required',
                                    pattern: {

                                        message: 'Last Name',
                                    },
                                })}
                                className={`${errors.LName ? 'border-red-500' : 'border-gray-300'
                                    } appearance-none block w-[100%] px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
                                placeholder="Last Name"
                            />
                            {errors.LName && (
                                <p className="mt-2 text-sm text-gray-100 bg-red-500 rounded py-1 text-center mr-5">{errors.LName.message}</p>
                            )}
                        </div>

                    </div>
                    <div>
                        <input
                            type="url"
                            {...register('photo', {
                                required: '',
                                pattern: {
                                    message: 'Photo Url',
                                },
                            })}
                            className={`${errors.LName ? 'border-red-500' : 'border-gray-300'
                                } appearance-none block w-full  px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
                            placeholder="Photo Url"
                        />
                        {errors.photo && (
                            <p className="mt-2 text-sm text-gray-100 bg-red-500 rounded py-1 text-center mr-5">{errors.LName.message}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            className={`${errors.email ? 'border-red-500' : 'border-gray-300'
                                } appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
                            placeholder="Email address"
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-gray-100 bg-red-500 rounded py-1 text-center w-1/2">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className={`${errors.password ? 'border-red-500' : 'border-gray-300'
                                } appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
                            placeholder="Password"
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-gray-100 bg-red-500 rounded py-1  text-center w-1/2">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                {...register('rememberMe')}
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-indigo-200">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link href="#" className="font-medium text-red-200 hover:text-gray-100">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                        <p className='text-center text-xs'> <Link href="#" className="font-medium text-red-200 hover:text-gray-200">

                        </Link> </p>
                    </div>
                    <div className='mb-[-500px]'>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;