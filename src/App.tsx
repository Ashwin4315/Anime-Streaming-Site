import { Routes, Route } from "react-router-dom"
import Layout from './Layout';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Stream from './pages/Stream';
import Search from "./pages/Search";
import './App.css';
import About from "./pages/About";


function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/stream/:streamId" element={<Stream />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>

    </div>
  );
}

export default App;
