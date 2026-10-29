INSERT INTO categories (type, name) VALUES
    ('standalone', 'characters'),
    /*('standalone', 'buildings'),*/
    ('standalone', 'props'),
    ('standalone', 'items'),
    ('standalone', 'nature'),
    /*('standalone', 'vehicles'),*/
    ('modular', 'terrain'),
    ('modular', 'building_kits');

INSERT INTO assets (category_id, name, image_url, glb_url, created_at, liked, triangle_count, filesize, variant_count, size_x, size_y, size_z) VALUES
    ((SELECT id FROM categories WHERE type='standalone' AND name ='characters'), 'cat', '/images/cat.png', '/glb/cat.glb', NOW() - INTERVAL '5 days', 96, 800, 26064, 1, 0.235, 0.435, 0.346),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='characters'), 'snowman', '/images/snowman.png', '/glb/snowman.glb', NOW() - INTERVAL '4 days', 97, 668, 21788, 1, 0.493, 0.993, 0.493),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='characters'), 'box_kid', '/images/box_kid.png', '/glb/box_kid.glb', NOW() - INTERVAL '3 days', 97, 84, 8932, 1, 0.397, 0.626, 0.226),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='props'), 'barrel', '/images/barrel.png', '/glb/barrel.glb', NOW() - INTERVAL '3 days', 98, 704, 54392, 1, 0.34, 0.344, 0.34),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='props'), 'box', '/images/box.png', '/glb/box.glb', NOW() - INTERVAL '3 days', 96, 32, 5024, 1, 0.256, 0.269, 0.255),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='items'), 'coin', '/images/coin.png', '/glb/coin.glb', NOW() - INTERVAL '3 days', 97, 322, 20356, 1, 0.422, 0.422, 0.0825),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='nature'), 'mushroom', '/images/mushroom.png', '/glb/mushroom.glb', NOW() - INTERVAL '3 days', 98, 344, 17892, 1, 0.202, 0.17, 0.199),
    ((SELECT id FROM categories WHERE type='modular' AND name ='building_kits'), 'fence', '/images/fence.png', '/glb/fence.glb', NOW() - INTERVAL '3 days', 90, 164, 13076, 1, 1, 0.559, 0.0468),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_ground_01', '/images/grass_ground_01.png', '/glb/grass_ground_01.glb', NOW() - INTERVAL '5 days', 100, 196, 22576, 3, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_to_concrete_ground_01', '/images/grass_to_concrete_ground_01.png', '/glb/grass_to_concrete_ground_01.glb', NOW() - INTERVAL '5 days', 99, 314, 27424, 2, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_to_concrete_ground_corner_01', '/images/grass_to_concrete_ground_corner_01.png', '/glb/grass_to_concrete_ground_corner_01.glb', NOW() - INTERVAL '5 days', 99, 156, 13056, 1, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_to_dirt_ground_01', '/images/grass_to_dirt_ground_01.png', '/glb/grass_to_dirt_ground_01.glb', NOW() - INTERVAL '5 days', 1, 258, 25988, 2, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_to_dirt_ground_corner_01', '/images/grass_to_dirt_ground_corner_01.png', '/glb/grass_to_dirt_ground_corner_01.glb', NOW() - INTERVAL '5 days', 1, 108, 10896, 1, 1, 0.1, 1),

    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_ground_01', '/images/dirt_ground_01.png', '/glb/dirt_ground_01.glb', NOW() - INTERVAL '5 days', 99, 200, 19272, 3, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_to_concrete_ground_01', '/images/dirt_to_concrete_ground_01.png', '/glb/dirt_to_concrete_ground_01.glb', NOW() - INTERVAL '5 days', 99, 306, 23340, 2, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_to_concrete_ground_corner_01', '/images/dirt_to_concrete_ground_corner_01.png', '/glb/dirt_to_concrete_ground_corner_01.glb', NOW() - INTERVAL '5 days', 1, 132, 10480, 1, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_to_grass_ground_01', '/images/dirt_to_grass_ground_01.png', '/glb/dirt_to_grass_ground_01.glb', NOW() - INTERVAL '5 days', 1, 234, 24240, 2, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_to_grass_ground_corner_01', '/images/dirt_to_grass_ground_corner_01.png', '/glb/dirt_to_grass_ground_corner_01.glb', NOW() - INTERVAL '5 days', 1, 122, 13092, 1, 1, 0.1, 1),

    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_ground_01', '/images/concrete_ground_01.png', '/glb/concrete_ground_01.glb', NOW() - INTERVAL '5 days', 1, 354, 24448, 3, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_to_dirt_ground_01', '/images/concrete_to_dirt_ground_01.png', '/glb/concrete_to_dirt_ground_01.glb', NOW() - INTERVAL '5 days', 1, 256, 19704, 2, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_to_dirt_ground_corner_01', '/images/concrete_to_dirt_ground_corner_01.png', '/glb/concrete_to_dirt_ground_corner_01.glb', NOW() - INTERVAL '5 days', 1, 198, 14320, 1, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_to_grass_ground_01', '/images/concrete_to_grass_ground_01.png', '/glb/concrete_to_grass_ground_01.glb', NOW() - INTERVAL '5 days', 1, 316, 27044, 2, 1, 0.1, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_to_grass_ground_corner_01', '/images/concrete_to_grass_ground_corner_01.png', '/glb/concrete_to_grass_ground_corner_01.glb', NOW() - INTERVAL '5 days', 1, 142, 13984, 1, 1, 0.1, 1);

/*
INSERT INTO assets (category_id, name, image_url, glb_url, created_at, liked, triangle_count, filesize)
SELECT
    (SELECT id FROM categories WHERE type='modular' AND name ='building_kits'),
    'box_kid_' || LPAD(n::text, 2, '0'),
    '/images/thumb-boxKid.png',
    '/glb/boxKid.glb',
    NOW() - INTERVAL '3 days',
    1,
    84,
    6928
FROM generate_series(1, 80) AS n;
*/
    