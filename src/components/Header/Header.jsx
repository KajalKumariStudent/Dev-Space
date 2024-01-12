import React from 'react'
import{Link, NavLink} from 'react-router-dom'

export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                           src="https://devspaceit.com/wp-content/uploads/2020/10/final_logo_big.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                   
                    <div
                        className="hidden justify-between items-center 
                        w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 
                                        ${isActive ? "text-cyan-600" : "text-grey-700"}
                                        border-b
                                         border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent 
                                         lg:border-0 hover:text-sky-600 lg:p-0`
                                    }
                                >
                                   Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/posts"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 
                                        ${isActive ? "text-blue-600" : "text-grey-700"}
                                        border-b
                                         border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent 
                                         lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                   Posts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/albums"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 
                                        ${isActive ? "text-blue-600" : "text-grey-700"}
                                        border-b
                                         border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent 
                                         lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Albums
                                </NavLink>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
<img  alt="" />