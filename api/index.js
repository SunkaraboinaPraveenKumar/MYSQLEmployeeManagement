import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath function
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { adminRouter } from './Routes/AdminRoute.js';
import { EmployeeRouter } from './Routes/EmployeeRoute.js';

const __filename = fileURLToPath(import.meta.url); // Get filename from meta URL
const __dirname = path.dirname(__filename); // Get directory name from filename

const app = express();

app.use(cors({
    origin: ["http://localhost:5173","https://mysql-employee-management.vercel.app"],
    methods: ['GET', 'POST', 'PUT','DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', adminRouter);

app.use('/employee',EmployeeRouter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;
    if(token){
        jwt.verify(token,"~!#$%^&*()_+",(err,decoded)=>{
            if(err){
                return res.json({Status:false,Error:"Wrong Token"});
            }
            req.id=decoded.id;
            req.role=decoded.role;
            next();
        })
    }
    else{
        return res.json({Status:false,Error:"Wrong Token"});
    }
}
app.get('/verify',verifyUser,(req,res)=>{
    return res.json({Status:true,id:req.id,role:req.role})
})


app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
