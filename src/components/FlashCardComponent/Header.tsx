import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"

const Header = () => {
    const {isSignedIn}  = useUser();
    const navigate = useNavigate(); 
    return (
        <>
            <section className="w-[100vw] h-[7%] absolute top-0 left-0 border-b border-b-[#E4E4E7] flex items-center justify-end gap-10 px-[20px]">
                        <span
                        className="cursor-pointer"
                        onClick={() => {
                            navigate('/')
                        }}>Home</span>
                        
                        <span
                        className="cursor-pointer" 
                        onClick={() => {
                            navigate('/createCards')
                        }}>create cards</span>
                        
                        <span
                        className="cursor-pointer" 
                        onClick={() => {
                            navigate('/ai')
                        }}>Generate with ai</span>
                        
                        <span
                        className="cursor-pointer" 
                        onClick={() => {
                            navigate('/share')
                        }}>Share</span>
                        
                        <span
                        className="cursor-pointer" 
                        onClick={() => {
                            navigate('/import')
                        }}>Import</span>
                        {isSignedIn ? <UserButton /> : null }
                        {/* <span>Teach on CodeArena</span> */}
                </section>
        </>
    )
}

export default Header;