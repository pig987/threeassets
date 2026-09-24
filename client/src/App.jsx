import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

export default function CategoryLists(){
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let isCurrent = true;

        async function load(){
            try {
                const response = await fetch(`/api/categories`);
                if (!response.ok) {
                    throw new Error('에러 발생');
                }
                const categories = await response.json();
                console.log(categories);
                if (isCurrent) setCategories(categories);
            } catch (e) {
                console.error(e);
            }
        }

        load();
        return () => {
            isCurrent = false;
        }
    }, []);

    return (
        <div>
            <h1>Categories: </h1>
            <ul className='categories'>
                {categories.map(category =>
                    <Category key={category.id} category={category} />
                )}
            </ul>
        </div>
    );
}

function Category({ category }){
    return (
        <li className="card">
            <Link to={`/categories/${category.id}`}>
                <img
                    className="card-image"
                    src={category.image_url}
                    alt={category.name}
                />
                <span style={{
                    position: 'absolute',
                    color: 'white',
                    bottom: 8,
                    left: 8,
                    fontSize: 20
                }}>
                    {category.name}
                </span>
            </Link>
        </li>
    )
}