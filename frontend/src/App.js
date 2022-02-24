import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import ProfilePage from "main/pages/ProfilePage";
import AdminUsersPage from "main/pages/AdminUsersPage";
import { hasRole, useCurrentUser } from "main/utils/currentUser";
import DiningCommonPage from "main/pages/DiningCommonPage";
import "bootstrap/dist/css/bootstrap.css";
import { useCommons } from "main/utils/commons";
import ItemPage from "main/pages/ItemPage/ItemPage";
import WriteReview from "main/components/Review/WriteReview/WriteReview";

// import { useMeals } from "main/utils/meals";
// import { useItems } from "main/utils/items";
// import ItemPage from "main/pages/ItemPage";

function App() {

  const { data : currentUser } = useCurrentUser();
  const { data : commonsList } = useCommons();

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage diningCommons = {[]}/>} />
          <Route path="/profile" element={<ProfilePage />} />
          {
            hasRole(currentUser, "ROLE_ADMIN") && <Route path="/admin/users" element={<AdminUsersPage />} />
          }
          {commonsList.map((c) => (<Route path={`commons/${c.code}`} element={<DiningCommonPage diningCommonName={c.name} diningCommonCode = {c.code}/>}/>))}
          <Route path='/itemPageTest' element={<ItemPage />} />
          <Route path='/dining/:hall/:food/:station' element={<ItemPage/>}/>
          <Route path='/write-review/:hall/:food/:station' element={<WriteReview />} />
          <Route path='/write-review/:hall/:food/:station/:edit' element={<WriteReview />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
