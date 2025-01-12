import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Layout } from "./sections/Layout";
import { Home } from "./pages/Home";
import { JobPost } from "./pages/JobPost";
import { About } from "./pages/About";
import { LoginPage } from "./pages/LoginPage";
import { SignInPage } from "./pages/SignInPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="post" element={<JobPost />} />
                    <Route path="about" element={<About />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="sign-in" element={<SignInPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
