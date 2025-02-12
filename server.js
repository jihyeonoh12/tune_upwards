import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3031; 

const allowedOrigins = [
  "http://localhost:5173", 
  "https://tune-upwards-gules.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: "GET",
  credentials: true
}));

app.use(express.json());

const API_BASE_URL = "https://itunes.apple.com";

app.use((req, res, next) => {
  console.log(`Proxying request: ${req.method} ${req.url}`);
  next();
});

app.use("/api", async (req, res) => {
  try {
    const apiUrl = `${API_BASE_URL}${req.path}`;
    console.log(`Forwarding request to: ${apiUrl}`);

    const response = await axios.get(apiUrl, { params: req.query });
    res.json(response.data);
  } catch (error) {
    console.error("Error in proxy:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Error fetching data",
      details: error.message
    });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
