import pg from 'pg';
import express from 'express';
const { Pool } = pg;
const app = express();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST, // server도 컨테이너로 만들면 db라고 쓰고 소통
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME
});

app.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM categories`);
        res.send(result.rows);  // send대신 json써라
    } catch (e) {
        res.status(500).json({ msg: 'server error'});
    }
});

app.get('/api/categories/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(`SELECT * FROM categories WHERE id=$1`, [id]);
        res.send(result.rows[0]);
    } catch (e) {
        res.sendStatus(500);
    }
});

app.get('/api/assets/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(`SELECT * FROM assets WHERE id=$1`, [id]);
        res.send(result.rows[0]);
    } catch (e) {
        res.sendStatus(500);
    }
});

app.get('/api/assets', async (req, res) => {
    try {
        const categoryId = req.query.category;
        if (categoryId){
            const result = await pool.query(`SELECT * FROM assets WHERE category_id=$1`, [categoryId]);
            res.send(result.rows);
        } else { // ?category 안넣으면 전체 목록 볼수있게 (나중에 화면에 구현)
            const result = await pool.query(`SELECT * FROM assets ORDER BY id`);
            res.send(result.rows);
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
    console.log('서버 실행 중: http://localhost:3000');
});