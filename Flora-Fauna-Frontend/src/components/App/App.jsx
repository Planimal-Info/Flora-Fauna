import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import AboutPage from "../AboutPage/AboutPage";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import Hero from "../Hero/Hero";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import Navbar from "../Navbar/Navbar";
import NotFound from "../NotFound/NotFound";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import AdminOverview from "../AdminOverview/AdminOverview.jsx";
import UserFeed from "../UserFeed/UserFeed.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import AnimalDetails from "../AnimalDetails/AnimalDetails.jsx";
import AdminDetails from "../AdminDetails/AdminDetails.jsx";
import "./App.css";

import { AuthContextProvider, useAuthContext } from "../../contexts/auth.jsx";
import { SearchContextProvider } from "../../contexts/search.jsx";
import { PostContextProvider } from "../../contexts/posts";
import { AdminContextProvider, useAdminContext } from "../../contexts/admin.jsx";
import UploadPage from "../UploadPage/UploadPage";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <AdminContextProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
        </AdminContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  );
}

function App() {
  const { user, isLoading } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoading={isLoading} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/userfeed" element={<UserFeed />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/animaldetails" element={<AnimalDetails />} />
          <Route path="/post/:productId" element={<AdminDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/denied" element={<AccessForbidden />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
