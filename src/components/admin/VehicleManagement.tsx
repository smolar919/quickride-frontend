import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from "@mui/material";
import {CarDTO} from "../../api/car/CarDTO.ts";
import {CarApiAxios} from "../../api/car/CarApiAxios.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {CarCategory} from "../../api/car/AddCarForm.ts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const VehicleManagement = () => {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [open, setOpen] = useState(false);
    const [editCarId, setEditCarId] = useState<string | null>(null);
    const [form, setForm] = useState({ make: "", model: "", year: 2022, pricePerDay: 0, category: CarCategory.ECONOMY });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const api = new CarApiAxios();
        const carsData = await api.getAllCars();
        setCars(carsData);
    };

    const handleSave = async () => {
        const api = new CarApiAxios();
        if (editCarId) {
            await api.editCar(editCarId, form);
        } else {
            await api.addCar(form);
        }
        setOpen(false);
        fetchCars();
    };

    const handleDelete = async (id: string) => {
        const api = new CarApiAxios();
        await api.deleteCar(id);
        fetchCars();
    };

    const handleEdit = (car: CarDTO) => {
        setForm({ ...car });
        setEditCarId(car.id);
        setOpen(true);
    };

    const columns: GridColDef[] = [
        { field: "make", headerName: "Marka", flex: 1 },
        { field: "model", headerName: "Model", flex: 1 },
        { field: "year", headerName: "Rok", flex: 1 },
        { field: "pricePerDay", headerName: "Cena za dzień", flex: 1 },
        { field: "category", headerName: "Kategoria", flex: 1 },
        {
            field: "actions",
            headerName: "Akcje",
            flex: 1,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => { setOpen(true); setEditCarId(null); }}
                sx={{marginBottom: "10px"}}
            >
                Dodaj Pojazd
            </Button>
            <DataGrid rows={cars} columns={columns} autoHeight getRowId={(row) => row.id} disableRowSelectionOnClick/>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editCarId ? "Edytuj Pojazd" : "Dodaj Pojazd"}</DialogTitle>
                <DialogContent>
                    <TextField label="Marka" fullWidth margin="dense" value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })} />
                    <TextField label="Model" fullWidth margin="dense" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
                    <TextField label="Rok" fullWidth margin="dense" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
                    <TextField label="Cena za dzień" fullWidth margin="dense" type="number" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })} />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Kategoria</InputLabel>
                        <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as CarCategory })}>
                            {Object.values(CarCategory).map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Anuluj</Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>Zapisz</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default VehicleManagement;
