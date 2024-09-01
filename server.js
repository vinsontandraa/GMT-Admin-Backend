const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const globalCashDailyRoutes = require('./routes/globalCashDaily');
const plateRoutes = require('./routes/plate');
const vehicleDataRoutes = require('./routes/vehicleData');
const mitraRoutes = require('./routes/mitra');
const jenisRoutes = require('./routes/type');
const mutasiKasBankRoutes = require("./routes/mutasiKasBank");
const mutasiKasBankListGiro = require("./routes/mutasiKasBankListGiro");
const mutasiKasBankPiutang = require("./routes/mutasiKasPiutang");
const dataSuratKendaraan = require("./routes/dataSuratKendaraan");
const sparePartRoutes = require('./routes/sparePartController');
const sparePartPORoutes = require('./routes/sparePartPO');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/global-cash-daily', globalCashDailyRoutes);
app.use('/api/plates', plateRoutes);
app.use('/api/vehicle-data', vehicleDataRoutes);
app.use('/api/mitra', mitraRoutes);
app.use('/api/jenis', jenisRoutes);
app.use("/api/mutasi-kas-bank", mutasiKasBankRoutes);
app.use("/api/mutasi-kas-bank-piutang", mutasiKasBankPiutang);
app.use("/api/mutasi-kas-bank-list-giro", mutasiKasBankListGiro);
app.use("/api/data-surat-kendaraan", dataSuratKendaraan);
app.use('/api/spareparts', sparePartRoutes);
app.use('/api/sparepartpo', sparePartPORoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
