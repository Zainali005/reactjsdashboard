import "./App.css";
import Dash from "./Components/Dash/Dash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignupForm from "./Components/Login/SIgnup";
import Protected from "./Components/Protected";
import Setting from "./Pages/Setting/Setting";
import DetailHistory from "./Pages/History/DetailHistory.jsx";
import AccountDetails from "./Pages/AccontsDetails/AccountDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Login />
            </Protected>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dash />
            </Protected>
          }
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/logout"
          element={
            <Protected>
              <Login />
            </Protected>
          }
        />
        <Route
          path="/setting"
          element={
            <Protected>
              <Setting />
            </Protected>
          }
        />
        <Route
          path="/detailhistory"
          element={
            <Protected>
              <DetailHistory />
            </Protected>
          }
        />
        {/* <Route path='/accountdetails' element={<Protected><AccountDetails /></Protected>} /> */}
        <Route
          path="/accountdetails/:accountId"
          element={
            <Protected>
              <AccountDetails />
            </Protected>
          }
        />

        <Route
          path="*"
          element={
            <div className="text-center" style={{ fontSize: "30px" }}>
              Route Not Found....
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
