import { useParams } from "react-router"
import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function AssetList(){
    const { categoryId } = useParams();
    const [ assets, setAssets ] = useState([]);
    const [ category, setCategory ] = useState(null);

    useEffect(() => {
        let isCurrent = true;
        async function load(){
            try {
                const response1 = await fetch(`/api/assets?category=${categoryId}`);
                if (!response1.ok) throw new Error('에러 발생');
                const assets = await response1.json();

                const response2 = await fetch(`/api/categories/${categoryId}`);
                if (!response2.ok) throw new Error('에러 발생');
                const category = await response2.json();

                if (isCurrent){
                    setAssets(assets);
                    setCategory(category);
                }
            } catch (e) {
                console.error(e);
            }
        }
        load();
        return () => {
            isCurrent = false;
        }
    }, [categoryId]);


    return (
        <div>
            <h1>Category: {category?.name} </h1>
            <ul className="categories">
                {assets.map(asset => 
                    <Card key={asset.id} asset={asset} />)
                }
            </ul>
        </div>
    )
}

function Card({ asset }){
    return (
        <li className="card">
            <Link to={`/assets/${asset.id}`}>
                <img className="card-image"
                src={asset.image_url}
                alt={asset.name}
                />
            </Link>
        </li>
        
    )
}