import React, { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import VehicleManagement from "../../components/admin/VehicleManagement.tsx";
import ReservationManagement from "../../components/admin/ReservationsManagement.tsx";
import NavBar from "../../components/navbar/NavBar.tsx";

const AdminPanel = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex);
    };

    return (
        <>
            <NavBar/>
            <Box sx={{ display: "flex", justifyContent: "center", minHeight: "60vh", pt: 5, marginTop: "100px"}}>
                <Container sx={{ maxWidth: "90%", padding: "16px", bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3, minHeight: "70vh" }}>
                    <Tabs value={tabIndex} onChange={handleChange} centered sx={{ mb: 3 }}>
                        <Tab label="Zarządzanie pojazdami" />
                        <Tab label="Rezerwacje" />
                    </Tabs>
                    <Box mt={3} p={2} minHeight="50vh">
                        {tabIndex === 0 && <VehicleManagement />}
                        {tabIndex === 1 && <ReservationManagement />}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default AdminPanel;