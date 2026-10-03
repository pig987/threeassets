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

app.use('/api/glb', express.static('../client/public/glb', {
    setHeaders: (res) => {
        res.setHeader('Content-Disposition', 'attachment');
    }
}));

app.get('/api/assets/:id/download', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(`SELECT glb_url FROM assets WHERE id=$1`, [id]);
        if (!result.rows.length) return res.sendStatus(404);
        res.redirect("/api"+result.rows[0].glb_url);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
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
        const type = req.query.type;
        const category = req.query.category;
        let q = req.query.q;
        const sort = req.query.sort;
        const page = req.query.page;

        const conditions = [];
        const values = [];

        if (type) {
            values.push(type);
            conditions.push(`type=$${values.length}`);
        }
        if (category) {
            values.push(category);
            conditions.push(`categories.name=$${values.length}`);
        }
        if (q) {
            q = q.toLowerCase();
            values.push(`%${q}%`);
            conditions.push(`LOWER(assets.name) LIKE $${values.length}`);
        }

        let where = ' WHERE ' + conditions.join(' AND ');

        let sql = `SELECT assets.* FROM assets JOIN categories ON assets.category_id = categories.id`;
        let sqlForCount = `SELECT COUNT(*) FROM assets JOIN categories ON assets.category_id = categories.id`;

        if (conditions.length){
            sql += where;
            sqlForCount += where;
        }

        // 불러온 전체 행 개수
        const countResult = await pool.query(sqlForCount, values);
        const total = Number(countResult.rows[0].count);
        //
        
        // 정렬과 페이지네이션
        const order = sort === 'most_liked' ? 'assets.liked' : 'assets.created_at';
        sql += ` ORDER BY ${order} DESC`;

        const currentPage = Number(page) || 1;
        sql += ` LIMIT 18 OFFSET ${ 18*(currentPage-1) }`;

        const result = await pool.query(sql, values);
        res.send({ assets: result.rows, total });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

/*app.get('/api/assets', async (req, res) => {
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
});*/



app.listen(3000, () => {
    console.log('서버 실행 중: http://localhost:3000');
});