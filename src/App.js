import './App.css';
import NavTop from './component/NavTop';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './pages/main/Main'
import Map from './pages/map/Map'
import List from './component/list/List';
import ListDetail from './pages/listdetail/ListDetail'
import MyPage from './pages/mypage/MyPage'
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Bookmark from './pages/bookmark/Bookmark';
import Notice from './pages/notice/Notice'
import Faq from './pages/faq/Faq'
import Filter from './pages/filter/Filter';
import NavBottom from './component/NavBottom';
import { useAuthContext } from './hooks/useAuthContext';
import SearchMap from './component/search/SearchMap';

function App() {
  const {user} = useAuthContext();

  return (
    <div>
      <NavTop />

      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/filter' element={<Filter />} />
        <Route path='/map' element={<SearchMap/>}/>
        <Route path='/list' element={<List/>} />
        <Route path='/list/:id' element={<ListDetail />}/>
        <Route path='/mypage' element={<MyPage />}/> 
        <Route path='/login' element={<Login />}/> 
        <Route path='/signup' element={<Signup />}/> 
        <Route path='/bookmark' element={user ? <Bookmark/> : <Navigate to='/login' /> } />
        <Route path='/notice' element={<Notice/>}/>
        <Route path='/faq' element={<Faq/>}/>
      </Routes>
      
      <NavBottom />
    </div>
  );
}

export default App;
