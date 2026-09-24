INSERT INTO categories (name, image_url) VALUES
    ('Primitives', '/images/thumb-primitives.png'),
    ('Characters', '/images/thumb-characters.png'),
    ('Props', '/images/thumb-props.png');

INSERT INTO assets (category_id, name, image_url, glb_url) VALUES
    ((SELECT id FROM categories WHERE name = 'Characters'), 'Monkey', '/images/thumb-characters.png', '/glb/monkey.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'Snowman', '/images/thumb-snowman.png', '/glb/snowman.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb'),
    ((SELECT id FROM categories WHERE name = 'Characters'), 'BoxKid', '/images/thumb-boxKid.png', '/glb/boxKid.glb');