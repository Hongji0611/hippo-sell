import LoginScreen from "./containers/login/LoginScreen";
import ChattingScreen from "./containers/chatting/ChattingScreen";
import AppProvider from "./context/AppProvider";
import PrivateRoute from "./components/Route/PrivateRoute";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route
              path="/chat"
              element={
                <PrivateRoute
                  component={<ChattingScreen />}
                />
              }
            />
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
