import { Routes, Route } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Stream from './pages/Stream';
import Search from "./pages/Search";
import Display from "./pages/Display";
import Favorite from "./pages/Favorite";
import './App.css';


function App() {

  
  return (


    <div className="App">
      <div>hello</div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/stream/:streamId" element={<Stream />} />
          <Route path="/search" element={<Search />} />
          <Route path="/display/:type" element={<Display />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </Layout>

    </div>
  );
}

export default App;
