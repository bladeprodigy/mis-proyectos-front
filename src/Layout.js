import React from 'react';
import {Box} from '@mui/material';
import {Routes, Route, useLocation} from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ProjectsPage from "./components/ProjectsPage";
import ProjectDetails from "./components/ProjectDetails";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function Layout() {
    const location = useLocation();
    const showLogout = location.pathname.startsWith('/projects');

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header showLogout={showLogout} />
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
            </Routes>
            <Footer />
        </Box>
    );
}

export default Layout;