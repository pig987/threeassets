import pg from 'pg';
import express from 'express';
import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import { createMcpExpressApp } from '@modelcontextprotocol/express'; // 일단 안씀.
import { toNodeHandler } from '@modelcontextprotocol/node';
import { z } from "zod";
import { rateLimit } from 'express-rate-limit';
import path from 'path';
const { Pool } = pg;
const app = express();

/** TODO
 * R2에 헤더 'Content-Disposition', 'attachment' 
*/

app.use('/static', express.static('../client/dist/static', { maxAge: '1y', immutable: true }));
app.use(express.static('../client/dist'));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    keyGenerator: (req) => req.headers['cf-connecting-ip'] || req.ip,
});

const handler = createMcpHandler(() => {
    const server = new McpServer({name: "fetchmesh", version: "1.0.0"});
    server.registerTool("list_categories", {
        description: "List all asset categories. Each category is either 'standalone' (single ready-to-use models) or 'modular' (kits of pieces that snap together). Call this first to find valid category names for search_assets.", 
    },
    async () => {
        const result = await pool.query(`SELECT type, name FROM categories`);
        const grouped = { standalone: [], modular: [] };
        for (const row of result.rows){
            grouped[row.type].push(row.name);
        }
        return {
            content: [{ type: "text", text: JSON.stringify(grouped)} ]
        };
    });
    
    server.registerTool("search_assets", {
        description: "Search lightweight GLB 3D assets for three.js. Filter by any combination of keyword, category, and type (at least one is required). Returns a list of matching assets with id and name only.",
        inputSchema: z.object({
            query: z.string().describe("Keyword matched against asset names (e.g. cat, kid)").optional(),
            category: z.enum(["characters", "props", "items", "nature", "terrain", "building_kits"]).optional(),
            type: z.enum(["standalone", "modular"]).describe("'standalone': single ready-to-use models. 'modular': pieces that snap together to build larger structures (walls, floors, terrain tiles).").optional()
        })
    },
    async ({query, category, type}) => {
        const conditions = [];
        if (query) conditions.push(query);
        if (category) conditions.push(category);
        if (type) conditions.push(type);

        if (conditions.length === 0){
            return {
                content: [{ type: "text", text: "Provide at least one of query, category, or type"}],
                isError: true
            };
        }
        let sql, params;
        if (query){
            if (!category && !type) {
                sql = `SELECT id, name FROM assets WHERE name ILIKE $1`;
                params = [`%${query}%`];
            }
            else if (category && !type){
                sql = `SELECT a.id, a.name FROM assets a JOIN categories c ON a.category_id = c.id WHERE a.name ILIKE $1 AND c.name = $2`;
                params = [`%${query}%`, category];
            }
            else if (!category && type){
                sql = `SELECT a.id, a.name FROM assets a JOIN categories c ON a.category_id = c.id WHERE a.name ILIKE $1 AND c.type = $2`;
                params = [`%${query}%`, type];
            }
            else if (category && type){
                sql = `SELECT a.id, a.name FROM assets a JOIN categories c ON a.category_id = c.id WHERE a.name ILIKE $1 AND c.name = $2 AND c.type = $3`;
                params = [`%${query}%`, category, type];
            }
        }
        else {
            if (category && !type){
                sql = `SELECT a.id, a.name FROM assets a JOIN categories c ON a.category_id = c.id WHERE c.name = $1`;
                params = [category];
            }
            else if (!category && type){
                sql = `SELECT a.id, a.name FROM assets a JOIN categories c ON a.category_id = c.id WHERE c.type = $1`;
                params = [type];
            }
            else if (category && type){
                sql = `SELECT a.id, a.name FROM assets a JOIN categories c ON a.category_id = c.id WHERE c.name = $1 AND c.type = $2`;
                params = [category, type];
            }
        }
        const result = await pool.query(sql, params);
        if (result.rows.length === 0) return {
            content: [{ type: "text", text: "No assets found. Try a different query or check list_categories."}]
        };

        return {
            content: [{ type: "text", text: JSON.stringify(result.rows) }]
        };
    });

    server.registerTool("get_asset_url", {
        description: "Get the download URL of a GLB asset by its id. Use an id returned by search_assets. The URL cannot be loaded directly from other websites (blocked by CORS), so download the file into the project and load it from there.", 
        inputSchema: z.object({
            id: z.number().int().describe("Asset id from search_assets results")
        })
    },
    async ({id}) => {
        const result = await pool.query(`SELECT glb_url FROM assets WHERE id = $1`, [id]);
        if (result.rows.length === 0){
            return {
                content: [{ type: "text", text: "Asset not found. Use an id from search_assets." }],
                isError: true
            };
        }
        const url = process.env.ASSET_BASE_URL + result.rows[0].glb_url;
        return {
            content: [{  type: "text", text: url}]
        };
    });

    return server;
});

const node = toNodeHandler(handler);

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST, // server도 컨테이너로 만들면 db라고 쓰고 소통
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME
});

app.use(limiter); // 제한 횟수 안넘으면 next()로 아래 라우터로 내려감

app.get('/api/assets/:id/download', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(`SELECT glb_url FROM assets WHERE id=$1`, [id]);
        if (!result.rows.length) return res.sendStatus(404);
        res.redirect(process.env.ASSET_BASE_URL + result.rows[0].glb_url);
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
        const result = await pool.query(`SELECT assets.*, categories.type AS category_type, categories.name AS category_name 
                                        FROM assets JOIN categories ON assets.category_id = categories.id
                                        WHERE assets.id=$1`, [id]);
        const asset = result.rows[0];
        if (!asset) return res.sendStatus(404);
        asset.glb_url = process.env.ASSET_BASE_URL + asset.glb_url;
        res.send(asset);
    } catch (e) {
        res.sendStatus(500);
        console.error(e);
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

app.all('/mcp', express.json(), (req, res) => {
    node(req, res, req.body);
});

app.use('/api', (req, res) => { // React Router 깨우기
    res.sendStatus(404);
});

app.use((req, res) => {
    res.sendFile(path.resolve('../client/dist/index.html'));
});

app.listen(3000, () => {
    console.log('서버 실행 중: http://localhost:3000');
});