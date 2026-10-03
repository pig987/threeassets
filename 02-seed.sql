INSERT INTO categories (type, name) VALUES
    ('standalone', 'characters'),
    ('standalone', 'buildings'),
    ('standalone', 'props'),
    ('standalone', 'items'),
    ('standalone', 'nature'),
    ('standalone', 'vehicles'),
    ('standalone', 'fx'),
    ('modular', 'terrain'),
    ('modular', 'building_kits'),
    ('modular', 'interiors'),
    ('modular', 'nature');

INSERT INTO assets (category_id, name, image_url, glb_url, created_at, liked, triangle_count, filesize, variant_count) VALUES
    ((SELECT id FROM categories WHERE type='standalone' AND name ='characters'), 'monkey_01', '/images/thumb-characters.png', '/glb/monkey.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 1),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='characters'), 'snowman_01', '/images/thumb-snowman.png', '/glb/snowman.glb', NOW() - INTERVAL '4 days', 5, 581, 17936, 1),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='characters'), 'box_kid_0', '/images/thumb-boxKid.png', '/glb/boxKid.glb', NOW() - INTERVAL '3 days', 1, 84, 6928, 1),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='props'), 'box_kid_00', '/images/thumb-boxKid.png', '/glb/boxKid.glb', NOW() - INTERVAL '3 days', 1, 84, 6928, 1),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='nature'), 'box_kid_000', '/images/thumb-boxKid.png', '/glb/boxKid.glb', NOW() - INTERVAL '3 days', 1, 84, 6928, 1),
    ((SELECT id FROM categories WHERE type='standalone' AND name ='nature'), 'box_kid_0000', '/images/thumb-boxKid.png', '/glb/boxKid.glb', NOW() - INTERVAL '3 days', 1, 84, 6928, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_ground_01', '/images/grass_ground_01.png', '/glb/grass_ground_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 3),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_to_concrete_ground_01', '/images/grass_to_concrete_ground_01.png', '/glb/grass_to_concrete_ground_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 2),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_to_concrete_ground_corner_01', '/images/grass_to_concrete_ground_corner_01.png', '/glb/grass_to_concrete_ground_corner_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_to_dirt_ground_01', '/images/grass_to_dirt_ground_01.png', '/glb/grass_to_dirt_ground_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 2),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'grass_to_dirt_ground_corner_01', '/images/grass_to_dirt_ground_corner_01.png', '/glb/grass_to_dirt_ground_corner_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 1),

    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_ground_01', '/images/dirt_ground_01.png', '/glb/dirt_ground_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 3),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_to_concrete_ground_01', '/images/dirt_to_concrete_ground_01.png', '/glb/dirt_to_concrete_ground_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 2),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_to_concrete_ground_corner_01', '/images/dirt_to_concrete_ground_corner_01.png', '/glb/dirt_to_concrete_ground_corner_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_to_grass_ground_01', '/images/dirt_to_grass_ground_01.png', '/glb/dirt_to_grass_ground_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 2),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'dirt_to_grass_ground_corner_01', '/images/dirt_to_grass_ground_corner_01.png', '/glb/dirt_to_grass_ground_corner_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 1),

    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_ground_01', '/images/concrete_ground_01.png', '/glb/concrete_ground_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 3),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_to_dirt_ground_01', '/images/concrete_to_dirt_ground_01.png', '/glb/concrete_to_dirt_ground_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 2),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_to_dirt_ground_corner_01', '/images/concrete_to_dirt_ground_corner_01.png', '/glb/concrete_to_dirt_ground_corner_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 1),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_to_grass_ground_01', '/images/concrete_to_grass_ground_01.png', '/glb/concrete_to_grass_ground_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 2),
    ((SELECT id FROM categories WHERE type='modular' AND name ='terrain'), 'concrete_to_grass_ground_corner_01', '/images/concrete_to_grass_ground_corner_01.png', '/glb/concrete_to_grass_ground_corner_01.glb', NOW() - INTERVAL '5 days', 10, 968, 69684, 1);

INSERT INTO assets (category_id, name, image_url, glb_url, created_at, liked, triangle_count, filesize)
SELECT
    (SELECT id FROM categories WHERE type='modular' AND name ='nature'),
    'box_kid_' || LPAD(n::text, 2, '0'),
    '/images/thumb-boxKid.png',
    '/glb/boxKid.glb',
    NOW() - INTERVAL '3 days',
    1,
    84,
    6928
FROM generate_series(1, 80) AS n;
    
    