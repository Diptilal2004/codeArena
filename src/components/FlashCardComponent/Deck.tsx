import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import api from "@/utils/flash-api"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"

interface Deck {
  id: number
  title: string
  cardCount: number
}

export default function FlashcardApp() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [newDeckTitle, setNewDeckTitle] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {user} = useUser();
  const [refresh , setRefresh] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
        const email = user.emailAddresses[0].emailAddress;
        axios.get(`${api}/card/getAllDecks/${email}`)
        .then((response : any) => {
            
            console.log(response , "decks");

                axios.get(`${api}/card/getUserCards/${email}`)
                .then((cardresponse : any) => {
                    console.log(cardresponse , "all cards");
                    let hashmap = new Object();
                    for(let card of cardresponse.data.cards){

                        // @ts-ignore 
                        if(hashmap[card.deck_id]){
                        // @ts-ignore 
                            hashmap[card.deck_id] = 1 + Number(hashmap[card.deck_id])
                        }else{
                            // @ts-ignore 
                            hashmap[card.deck_id] = 1
                        }
                    }
                    let deckMap = new Object();
                    response.data.decks.map((deck) => {
                        deck["cardCount"] = hashmap[deck.id] !== null && hashmap[deck.id] !== undefined  ? deck["cardCount"] = hashmap[deck.id] : deck["cardCount"] = 0 ;
                        return deck;
                            
                    })
                    console.log(response);
                    setDecks(response.data.decks);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
        
    }
  } , [user , refresh]);

  console.log(decks);

  const handleStudy = (id) => {
        navigate(`/deck/${id}`)
  }


  const handleCreateDeck = () => {
    if (newDeckTitle.trim()) {
     
        axios.post(`${api}/card/createDeck` , {
            deck : JSON.stringify({
                title : newDeckTitle,
                user_id :  user?.emailAddresses[0].emailAddress
            })
        })
        .then((response) => {
            
            if(response.status === 200){
                toast({
                    title : "card creted successfully ✅",
                    description : "cards have been added to your deck "
                })

                setRefresh((c) => !c);
                
            }else{
                toast({
                    title : "❌ some error occured",
                    description : " please check if the data is valid and try again"
                })
            }
        }).catch(err => { 
            console.log(err);
            toast({
                title : "❌ some error occured",
                description : " please check if the data is valid and try again"
            })
        })
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Flashcard Decks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {decks.map((deck) => (
          <Card key={deck.id} className="flex flex-col min-h-[200px]">
            <section className="flex items-center ">
                <CardHeader>
                <CardTitle className="text-2xl font-normal">{deck.title}</CardTitle>
                </CardHeader>
                <span className="text-md font-normal">(deck id : {deck.id})</span>
            </section>
            <CardContent className="flex-grow">
              <p>{deck.cardCount} cards</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => {
                handleStudy(deck.id)
              }}>Study</Button>
            </CardFooter>
          </Card>
        ))}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-full min-h-[200px] flex flex-col items-center justify-center">
              <Plus className="h-8 w-8 mb-2" />
              <span>Create New Deck</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Deck</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Enter deck title"
              value={newDeckTitle}
              onChange={(e) => setNewDeckTitle(e.target.value)}
            />
            <DialogFooter>
              <Button onClick={handleCreateDeck}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}