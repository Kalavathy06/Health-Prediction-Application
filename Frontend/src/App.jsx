import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreatePatient from "./pages/CreatePatient";
import ViewPatient from "./pages/ViewPatient";
import EditPatient from "./pages/EditPatient";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreatePatient />} />
        <Route
  path="/view/:id"
  element={<ViewPatient />}
/>
      
      <Route
  path="/edit/:id"
  element={<EditPatient />}
/>
</Routes>
    </BrowserRouter>
  );
}


export default App;