import "./App.css";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Room from "./pages/Room";
import SingleRoom from "./pages/SingleRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RoomProvider } from "./context";

function App() {
  return (
    <>
      <RoomProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/room" element={<Room />} />
            <Route exact path="/room/:slug" element={<SingleRoom />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </RoomProvider>
    </>
  );
}

export default App;
