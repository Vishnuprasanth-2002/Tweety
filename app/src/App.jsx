import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
const Form = lazy(() => import("./pages/form"));

function Loading() {
  return <p>Loading ...</p>;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
