import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Layout } from "./sections/Layout";
import { Home } from "./pages/Home";
import JobPost from "./pages/JobPost";
import { About } from "./pages/About";
import { LoginPage } from "./pages/LoginPage";
import { EditJobPost } from "./pages/JobEdit";
import { JobDetails } from "./pages/JobDetails";
import { SignUpPage } from "./pages/SignUpPage";
import { MyPosts } from "./pages/MyPosts";
import { Dashboard } from "./pages/Dashboard";
import { ApplicationPage } from "./pages/ApplicationPage";
import { ApplicationsList } from "./pages/ApplicationsList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="post" element={<JobPost />} />
                    <Route path="my-posts" element={<MyPosts />} />
                    <Route path="about" element={<About />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="sign-in" element={<SignUpPage />} />
                    <Route path="/job/:id" element={<JobDetails />} />
                    <Route path="/job/edit/:id" element={<EditJobPost />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/job/:id/apply" element={<ApplicationPage />} />
                    <Route path="/job/:id/applications" element={<ApplicationsList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
