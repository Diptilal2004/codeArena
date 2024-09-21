import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/utils/flash-api";
import {TableOfCards} from "./TableOfCards"
import { useNavigate } from "react-router-dom";


const CreateCards = () => {
    
    const {user} = useUser();
    const [userCards , setCards] = useState<any>([]);
    const [refresh , setRefresh] = useState<boolean>(false);
    const navigate = useNavigate();
    if(!user){
        // @ts-ignore 
        window.location  = "/signin";
        return null;
    }


    useEffect(() => {
        if(user){
            
            const userEmail = user.emailAddresses[0].emailAddress;

            axios.get(`${api}/card/getUserCards/${userEmail}`)
            .then((response : any) => {
                setCards(response.data.cards);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    } , [user]);


    useEffect(() => {

        const userEmail = user.emailAddresses[0].emailAddress;
        console.log("refreshing");

        axios.get(`${api}/card/getUserCards/${userEmail}`)
        .then((response : any) => {
            setCards(response.data.cards);
        })
        .catch((err) => {
            console.log(err);
        })

    } , [refresh])
    console.log(userCards);

    return (
        <section className="w-[100%]">
            <section className="m-[20px] mt-[70px] w-[94%] flex flex-col items-center justify-center">
                <TableOfCards cards={userCards} userEmail={user.emailAddresses[0].emailAddress} setRefresh={setRefresh}/>
            </section>
        </section>
    )
}




export default CreateCards;