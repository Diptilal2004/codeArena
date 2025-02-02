import './App.css'
import {BrowserRouter , Routes , Route, Navigate} from 'react-router-dom'
// import Playground from './components/Playground'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import Dashboard from './components/Dashboard'
import SignInPage from './sign-in/[[index]]'
import SignUpPage from './sign-up/[[index]]'
import PlaygroundRepl from './components/PlaygroundRepl'
import PlaygroundContextProvider from './context/playgroundData'
import SocketProvider from './context/socketContext'
import FileContextProvider from './context/fileContext'
import ActiveTabContextProvider from './context/activeTabContext'
import SocketContextProvider from './context/socketContext'
import RoleContextProvider from './context/getRoleContext'
import Playground from './components/Playground'
import Import from './components/FlashCardComponent/Import'
import Share from './components/FlashCardComponent/ShareCard'
import Ai from './components/FlashCardComponent/Ai'
import CreateCards from './components/FlashCardComponent/CreateCards'
import FlashCard from './components/FlashCardComponent/FlashCards'



function App() {
  
  return (
      <header>
        <SignedOut>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/sign-in" replace={true} />} ></Route>
              <Route path="/sign-in" element={ <SignInPage/> }></Route>
              <Route path="/sign-up" element={ <SignUpPage />} ></Route>
              <Route path="/share" element={<Share />} />
              <Route path="/import" element={<Import />} />
              <Route path="/ai" element={<Ai />} />
            </Routes>
          </BrowserRouter>
        </SignedOut>
        <SignedIn>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SocketContextProvider><PlaygroundContextProvider><RoleContextProvider><Dashboard/></RoleContextProvider></PlaygroundContextProvider></SocketContextProvider>} />
                <Route path="/playground-dashboard" element={<SocketContextProvider><Playground/></SocketContextProvider>} />
                <Route path='/playground' element={<SocketContextProvider><FileContextProvider><ActiveTabContextProvider>< PlaygroundRepl /></ActiveTabContextProvider></FileContextProvider></SocketContextProvider>} />
                <Route path="/" element={<FlashCard />}/> 
                <Route path="/createCards" element={<CreateCards />} />
                <Route path="/share" element={<Share />} />
                <Route path="/import" element={<Import />} />
                <Route path="/ai" element={<Ai />} />
                <Route element={<FlashCard />} path="deck/:deck_id"/>
              </Routes>
          </BrowserRouter>    
        </SignedIn>
      </header>
      
  )
}

export default App
