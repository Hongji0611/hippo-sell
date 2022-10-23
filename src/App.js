import LoginScreen from "./containers/login/LoginScreen";
import ChattingScreen from "./containers/chatting/ChattingScreen";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/chat" element={<ChattingScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
