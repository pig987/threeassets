import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { initViewer } from "./threeViewer.js";

export default function AssetPage(){
    const { assetId } = useParams();
    const [ asset, setAsset ] = useState(null);
    
    const ref = useRef();

    useEffect(() => {
        console.log("in");
        
        let outdated = false;
        async function load() {
            try{
                const response = await fetch(`/api/assets/${assetId}`);
                if (!response.ok) {
                    throw new Error('에러 발생');
                }
                const asset = await response.json();
                if (!outdated) { setAsset(asset); console.log(asset);}
            } catch (e) {
                console.error(e);
            }
        }

        load();
        return () => { outdated = true; console.log("dump"); }
    }, [assetId]);

    useEffect(() => {
        if (!asset) return;
        const cleanup = initViewer(ref.current, asset.glb_url);
        return cleanup;
    }, [asset]);

    return <div className="viewer" ref={ref}></div>
    
}