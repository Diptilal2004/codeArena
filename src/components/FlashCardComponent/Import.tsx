import { useState } from "react";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import api from "@/utils/flash-api";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Import = () => {

    const [cardData , setCardData] = useState<null | []>(null);
    const {user , isSignedIn } = useUser();
    const [deck_id , setDeckId] = useState(0);
    const navigate = useNavigate();
    const {toast} = useToast();
    const [importing , setImporting] = useState(false);

    if(!user){
        // @ts-ignore
        window.location = "/signin"
    }

    const handleChange = (deck_id) => {
        setDeckId(deck_id)
    }


    return (


        <section className="flex flex-col items-center justify-center">
            <section className="flex flex-col gap-10 items-center justify-center h-[100%]">
                <Header />
                <section className="mt-[20px] mb-[50px] text-center">
                    <h2 className="text-[35px] font-extrabold m-[10px] mt-[70px]"> Import notes !</h2>
                    <p>To import notes , you need to paste the data that you copied from your friend's share section into the input box below !</p>
                </section>
                <section className="flex flex-col w-[100%] pl-[78px]">
                    <span>Enter Deck id : </span>
                    <input type="text" placeholder="Enter deck id eg.7" className="p-[10px] border rounded-md m-[10px] ml-[0] w-[300px]" onChange={(e) => {
                                handleChange(e.target.value);
                    }} required/>
                </section>
                <section className="min-w-[700px] max-[740px]:max-w-[300px] max-[740px]:min-w-[300px] flex flex-col ">
                    
                    
                    
                    <span>Enter data here : </span>
                    <textarea className="border border-gray-300 rounded-lg p-[10px] w-[100%]" name="card-import" id="" onChange={(e) => setCardData(JSON.parse(e.target.value))}></textarea>
                </section>

                <section>
                    {!cardData ? 
                        <Button className="bg-gray-300 hover:bg-gray-300">Import</Button>
                        :
                        <Button 
                        onClick={() => {
                            if(cardData){

                                const userEmail = user?.emailAddresses[0]?.emailAddress;

                                const newCardArr = cardData.map((cardpost : {question : string , answer : string , category : string  , user_id? : string, deck_id? : string}) => {
                                    return {...cardpost , user_id : `${userEmail}` , deck_id : `${deck_id}`}
                                })


                                importData(newCardArr , toast , setImporting);
                            }
                        }}
                        >{importing ? 'Importing....' : 'Import'}</Button>
                    }
                </section>
                <section className="min-w-[700px] min-h-[400px] max-[740px]:max-w-[90%] max-[740px]:min-w-[80%] max-w-[700px] m-[40px] max-h-[400px] border border-gray-300 overflow-y-scroll overflow-x-scroll">
                    <pre className="sharable-cards">{`${JSON.stringify(cardData , null , "   ")}`}</pre>
                </section>
            </section>
        
        </section>
    )
}

function importData(cardData : any , toast : any , setImporting : any){

    console.log(typeof JSON.stringify(cardData));
    
    axios.post(`${api}/card/createCards` , {
        cards : JSON.stringify(cardData)
    })
    .then((response) => {
        
        setImporting(false)
        if(response.status === 200){
            toast({
                title : "import successful ✅",
                description : "cards have been added to your deck "
            })
        }else{
            toast({
                title : "❌ some error occured",
                description : " please check if the data is valid and try again"
            })
        }
    }).catch(err => { 
        console.log(err)
        toast({
            title : "❌ some error occured",
            description : " please check if the data is valid and try again"
        })
    })
}

export default Import;