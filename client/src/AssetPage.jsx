import './AssetPage.css'
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { initViewer } from "./threeViewer.js";

async function handleDownload(id){
    window.location.href = `/api/assets/${id}/download`;
}

export default function AssetPage(){
    const { assetId } = useParams();
    const [ asset, setAsset ] = useState(null);
    const [ idx, setIdx ] = useState(0);
    
    const ref = useRef(null);
    const viewerRef = useRef(null);

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
                console.log('asset: ', asset);
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
        const viewer = initViewer(ref.current, asset.glb_url);
        viewerRef.current = viewer;
        return viewer.cleanup;
    }, [asset]);

    useEffect(() => {
        console.log('hahaha');
        if (!viewerRef.current) return;
            viewerRef.current.showVariant(idx);
    }, [idx]);

    return (
        <>
            <div style={{ position: 'relative' }}>
                <div className="viewer" ref={ref}></div>
                <div className='asset-preset-area'>
                    <div className='asset-preset' style={{ background: 'red'}}/>
                    <div className='asset-preset' style={{ background: 'orange'}}/>
                    <div className='asset-preset' style={{ background: 'yellow'}}/>
                    <div className='asset-preset' style={{ background: 'green'}}/>
                    <div className='asset-preset' style={{ background: 'blue'}}/>
                </div>
                <div style={{ position: 'absolute', bottom: 20, left: '50%', width: '100px', transform: 'translateX(-50%)', display: 'flex',
                            justifyContent: 'center', border: '0px solid white', whiteSpace: 'pre', color: 'white',
                            fontSize: 20, fontWeight: 'bold', opacity: '80%', userSelect: 'none' }}>
                    <button style={{ background: 'white',  font: 'inherit', cursor: 'pointer' }} onClick={() => {
                        setIdx(Math.max((idx - 1), 0));
                    }}>{'<'}</button>
                    <span>  {idx + 1}  /  </span>
                    <span>{asset?.variant_count}  </span>
                    <button style={{ background: 'white',  font: 'inherit', cursor: 'pointer' }} onClick={() => {
                        setIdx(Math.min((idx + 1), asset?.variant_count - 1));
                    }}>{'>'}</button>
                </div>
            </div>
            {asset && (
                <div style={{ padding: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'lightgrey' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                            <h2 style={{ margin: 0 }}>{asset.name}</h2>
                            <dl style={{ display: 'flex', gap: '25px', margin: 0 }}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <dt>Liked</dt>
                                    <dd style={{ margin: 0 }}>{asset.liked}</dd>
                                </div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <dt>Download</dt>
                                    <dd style={{ margin: 0 }}>{asset.download_count}</dd>
                                </div>
                            </dl>
                        </div>
                        <div>
                            <button>Like</button>
                            <button onClick={() => handleDownload(assetId)}>Download</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '25px', marginTop: 30 }}>
                        <dl style={{ display: 'flex', flexDirection: 'column', gap: 5, margin: 0 }}>
                            <div style={{ display: 'flex', gap: '4px'}}>
                                <dt style={{ fontWeight: 'bold' }}>Triangles</dt>
                                <dd style={{ margin: 0 }}>{asset.triangle_count}</dd>
                            </div>
                            <div style={{ display: 'flex', gap: '4px'}}>
                                <dt style={{ fontWeight: 'bold' }}>File size</dt>
                                <dd style={{ margin: 0 }}>{(asset.filesize/1024).toFixed(2)} KB</dd>
                            </div>
                            <div style={{ display: 'flex', gap: '4px'}}>
                                <dt style={{ fontWeight: 'bold' }}>File type</dt>
                                <dd style={{ margin: 0 }}>{asset.filetype}</dd>
                            </div>
                            <div style={{ display: 'flex', gap: '4px'}}>
                                <dt style={{ fontWeight: 'bold' }}>Texture Res</dt>
                                <dd style={{ margin: 0 }}>{asset.texture_res}x{asset.texture_res}</dd>
                            </div>
                            <div style={{ display: 'flex', gap: '4px'}}>
                                <dt style={{ fontWeight: 'bold' }}>Material</dt>
                                <dd style={{ margin: 0 }}>{asset.material_count}</dd>
                            </div>
                            <div style={{ display: 'flex', gap: '4px'}}>
                                <dt style={{ fontWeight: 'bold' }}>Created Date</dt>
                                <dd style={{ margin: 0 }}>{asset.created_at}</dd>
                            </div>
                            <div style={{ display: 'flex', gap: '4px'}}>
                                <dt style={{ fontWeight: 'bold' }}>License</dt>
                                <dd style={{ margin: 0 }}>CC0 — no credit needed</dd>
                            </div>
                        </dl>
                    </div>
                    <div style={{ display: 'flex', marginTop: 10, background: 'lightgrey' }}>
                        <span style={{ fontWeight: 'bold' }}>Category</span>
                    </div>
                    <div style={{ display: 'flex', marginTop: 10, background: 'lightgrey' }}>
                        <span style={{ fontWeight: 'bold' }}>Tag</span>
                    </div>
                </div>
            )}
        </>
    )
}