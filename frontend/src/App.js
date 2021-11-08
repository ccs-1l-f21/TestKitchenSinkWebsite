import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import ProfilePage from "main/pages/ProfilePage";
import AdminUsersPage from "main/pages/AdminUsersPage";
import { hasRole, useCurrentUser } from "main/utils/currentUser";
import OrtegaEntrees from "main/components/Nav/OrtegaPage";
import DLGEntrees from "main/components/Nav/DLGPage";
import CarrilloEntrees from "main/components/Nav/CarrilloPage";
import PortolaEntrees from "main/components/Nav/PortolaPage";

import "bootstrap/dist/css/bootstrap.css";


function App() {

  const { data: currentUser } = useCurrentUser();

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {
            hasRole(currentUser, "ROLE_ADMIN") && <Route path="/admin/users" element={<AdminUsersPage />} />
          }
          <Route path="/ortega" element={<OrtegaEntrees />} />
          <Route path="/de-la-guerra" element={<DLGEntrees />} />
          <Route path="/carrillo" element={<CarrilloEntrees />} />
          <Route path="/portola" element={<PortolaEntrees />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
