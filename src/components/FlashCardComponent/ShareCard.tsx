import api from "@/utils/flash-api";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICard } from "./FlashCards";
import Header from "./Header";

const Share = () => {

    const {user} = useUser();

    if(!user){
        // @ts-ignore 
        window.location ='/signin'
    }

    const [cards , setCards] = useState([{}]);
    const [deck_id ,setDeckId] = useState(0);
    const [sharedCards , setSharedCards] = useState([{}]);
    const [copied , setCopied] = useState(false);

    useEffect(() => {
        if(user){
            const userEmail = user?.emailAddresses[0].emailAddress;


                    axios.get(`${api}/card/getUserCards/${userEmail}`)
                .then((response : any) => {
                    
                    console.log(response , "response ...")
                    
                    
                    // const newCardsFormat = response.data.cards.map((card) => {
                        
                    //     console.log(card , "this is the card");
                    //     return {question : card?.question , answer : card?.answer , category : card?.category  }
                        
                    // })

                    // console.log(newCardsFormat);
                    setCards(response.data.cards);
                })
                .catch((err) => {
                    console.log(err);
                })
            
        }
    } , [user ]);

    useEffect(() => {   

        if(cards){
            const cardArr = cards.filter((card) => {
               return  Number(card.deck_id) === Number(deck_id);
            }).map((card) => {
                return (
                    {
                        category : card.category,
                        question : card.question,
                        answer : card.answer,
                    }
                )
            })
            setSharedCards(cardArr)
        }
    } , [deck_id]);

    console.log(sharedCards , "sharedCards");

    console.log(cards , "cards");
    console.log(deck_id);


    useEffect(() => {

        if(copied === true){
            setTimeout(() => {
                setCopied(false);
            } , 2000)
        }

    } , [copied])


    const handleChange = (deck_id) => {
        setDeckId(deck_id)
    }

    console.log(deck_id);

    return(
        <section className="flex flex-col">
            <section className="flex flex-col items-center justify-center h-[100%] mt-[100px]">
                <Header />
                <section className="my-[20px] text-center">
                    
                    <h2 className="text-[35px] font-extrabold"> Share your notes !</h2>
                    <p>To share your notes with other copy the following data and share it with your friends !</p>
                </section>
                <section>
                    <input type="text" placeholder="Enter deck id eg.7" className="p-[10px] rounded-md m-[10px]" onChange={(e) => {
                        handleChange(e.target.value);
                    }} required/>
                </section>
                <section className="min-w-[700px] max-[740px]:max-w-[300px] max-[740px]:min-w-[300px]  h-[30px] bg-[#efefef] border-t-gray rounded-tr-lg rounded-tl-lg flex items-center justify-center hover:cursor-pointer">
                        {
                            !copied ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" className="m-[5px] ml-[20px]"
                            onClick={() => {
                                // @ts-ignore 
                                navigator.clipboard.writeText(JSON.stringify(sharedCards));
                                setCopied(true);
                            }}
                            >
                            <path fill="currentColor" d="M200 32h-36.26a47.92 47.92 0 0 0-71.48 0H56a16 16 0 0 0-16 16v168a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-72 0a32 32 0 0 1 32 32H96a32 32 0 0 1 32-32m72 184H56V48h26.75A47.9 47.9 0 0 0 80 64v8a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-8a47.9 47.9 0 0 0-2.75-16H200Z" />
                            </svg>
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" className="m-[5px] ml-[20px]">
                                <path fill="none" stroke="#4db051" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.75 8.75l3.5 3.5l7-7.5" />
                            </svg>
                        }
                    
                </section>
                <section className="min-w-[700px] flex items-start justify-center max-[740px]:max-w-[100%] rounded-lg max-[740px]:min-w-[300px] min-h-[400px] max-w-[700px] max-h-[400px] border border-gray-300 overflow-y-scroll overflow-x-scroll">
                    <pre className="sharable-cards text-sm ">{`${JSON.stringify(sharedCards , null , "   ")}`}</pre>
                </section>
            </section>
        </section>
    )
}

export default Share;