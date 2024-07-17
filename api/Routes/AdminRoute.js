import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import path from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';

const router = express.Router();



// Route to get admin profile
router.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ Status: false, Error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "~!#$%^&*()_+");
    const sql = "SELECT id, email FROM admin WHERE id = ?";
    con.query(sql, [decoded.id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error" });
        if (result.length === 0) return res.status(404).json({ Status: false, Error: "Admin not found" });
        return res.json({ Status: true, Result: result[0] });
    });
});

// Route to update admin profile
router.put('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ Status: false, Error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "~!#$%^&*()_+");
    const { email, password } = req.body;
    const sql = "UPDATE admin SET email = ?, password = ? WHERE id = ?";

    bcrypt.hash(password, 5, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Password hashing error" });

        con.query(sql, [email, hash, decoded.id], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query error" });
            return res.json({ Status: true, Result: result });
        });
    });
});

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email=? AND password=?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, Error: "Query error" });
        }
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email,id:result[0].id }, "~!#$%^&*()_+", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Invalid Credentials" });
        }
    });
});

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (name) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true });
    });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});



const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({
    storage:storage
})

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (name, email, password, salary, address, image, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    // Hashing the password before inserting into the database
    bcrypt.hash(req.body.password.toString(), 5, (err, hash) => {
        if (err) {
            console.error("Password hashing error:", err);
            return res.json({ Status: false, Error: "Password hashing error" });
        }
        
        // Extract the file path or handle file buffer based on multer configuration
        const imagePath = req.file.path; // Example: 'uploads/filename.jpg'
        
        const values = [
            req.body.name,
            req.body.email,
            hash,
            parseFloat(req.body.salary), // Convert salary to float if necessary
            req.body.address,
            imagePath, // Use the file path for image
            parseInt(req.body.category_id) // Convert category_id to integer
        ];

        con.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.json({ Status: false, Error: "Query Error", Details: err });
            }
            return res.json({ Status: true });
        });
    });
});

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/employee/:id', (req, res) => {
    const id=req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id],(err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error: "+err });
        return res.json({ Status: true, Result: result });
    });
});


router.put('/edit_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql=`UPDATE employee set name= ? , email=?, salary=?, address=? , category_id:=? WHERE id= ${id}`
    const values = [
        req.body.name,
        req.body.email,
        parseFloat(req.body.salary), // Convert salary to float if necessary
        req.body.address,
        parseInt(req.body.category_id) // Convert category_id to integer
    ];
    con.query(sql,values,(err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
})

router.delete('/delete_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql=`DELETE FROM employee WHERE id=?`
    con.query(sql,[id],(err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
})

router.get('/admin_count', (req, res) => {
    const sql = "SELECT COUNT(id) as admin FROM admin";
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error: "+err });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/employee_count', (req, res) => {
    const sql = "SELECT COUNT(id) as employee FROM employee";
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error: "+err });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/salary_count', (req, res) => {
    const sql = "SELECT SUM(salary) as salary FROM employee";
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error: "+err });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/admin_records', (req, res) => {
    const sql = "SELECT * from admin";
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error: "+err });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:true})
})

export { router as adminRouter };
