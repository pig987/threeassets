CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('standalone', 'modular')),
    name TEXT NOT NULL,
    UNIQUE (type, name)
);

CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    name TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL,
    glb_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    liked INTEGER NOT NULL DEFAULT 0,
    triangle_count INTEGER NOT NULL,
    filesize INTEGER NOT NULL,
    texture_res INTEGER NOT NULL DEFAULT 256,
    material_count INTEGER NOT NULL DEFAULT 1,
    download_count INTEGER NOT NULL DEFAULT 0,
    filetype TEXT NOT NULL DEFAULT 'glb',
    variant_count INTEGER NOT NULL DEFAULT 1,
    size_x REAL NOT NULL,
    size_y REAL NOT NULL,
    size_z REAL NOT NULL
);