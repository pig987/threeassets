import './Home.css'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router';

/*TODO
    - 검색창 카테고리는 검색 내용, 정렬 유지한채로 변경가능하게하기
    - 아무 곳이나 눌러도 드랍다운 메뉴 접히게 하기
*/

export default function Home(){
    const [ openDropdown, setOpenDropdown ] = useState(null);
    const [ assets, setAssets ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ keyword, setKeyword ] = useState('');
    const [ pageInput, setPageInput] = useState(1);

    const { type, category } = useParams();

    const params = new URLSearchParams(searchParams);

    if (type) params.set('type', type);
    if (category) params.set('category', category);
    if (!params.get('q')) params.delete('q');
    if (!params.get('sort')) params.set('sort', 'most_liked');
    const sort = params.get('sort');
    let url = `/api/assets?${params}`;
    const currentPage = Number(params.get('page')) || 1; // url에서 page가져오기. 없으면 1.
    const lastPage = Math.ceil(total/18); 

    useEffect(() => {
        async function load(){
            try {
                console.log(url);
                const response = await fetch(url);
                if (!response.ok) throw new Error('에러 발생');
                const data = await response.json();
                setAssets(data.assets);
                setTotal(data.total || 1);
                setPageInput(currentPage);
            } catch(e) {
                console.log(e);
            }
        }
        load();
    }, [url]);

    return (
        <div className="home">
            <header className="home-header">
                <Link to="/">
                    <img src="/images/logo.png" alt="Fetchmesh" height={60} style={{ position: 'relative', top: 5 }}/>
                </Link>
            </header>

            <div className="home-layout">
                <div className="home-left">
                    <nav className="home-category">
                        <h2 className="home-panel-title">Categories</h2>
                        <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                            <li className="home-li" style={{ marginTop: '25px', color: (!type && !category) ? 'white' : '#FF94C9', fontWeight: 'bold', fontSize: '18px' }}><Link to="/" onClick={()=> setKeyword('')}>All categories</Link></li>
                            <li className="home-li" style={{ marginTop: '20px', marginBottom: '10px', position: 'relative', color: (type === 'standalone' && !category) ? 'white' : '#FF94C9', fontWeight: 'bold', fontSize: '18px' }}><Link to="/categories/standalone" onClick={()=> setKeyword('')}>Standalone</Link>
                                <ul style={{ paddingLeft: '10px', listStyle: 'none', margin: 0, fontWeight: 'normal', fontSize: '16px' }}>
                                    <li style={{ color: (type === 'standalone' && category === 'characters') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/characters" onClick={()=> setKeyword('')}>Characters</Link></li>
                                    <li style={{ color: (type === 'standalone' && category === 'buildings') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/buildings" onClick={()=> setKeyword('')}>Buildings</Link></li>
                                    <li style={{ color: (type === 'standalone' && category === 'props') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/props" onClick={()=> setKeyword('')}>Props</Link></li>
                                    <li style={{ color: (type === 'standalone' && category === 'items') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/items" onClick={()=> setKeyword('')}>Items</Link></li>
                                    <li style={{ color: (type === 'standalone' && category === 'nature') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/nature" onClick={()=> setKeyword('')}>Nature</Link></li>
                                    <li style={{ color: (type === 'standalone' && category === 'vehicles') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/vehicles" onClick={()=> setKeyword('')}>Vehicles</Link></li>
                                    <li style={{ color: (type === 'standalone' && category === 'fx') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/fx" onClick={()=> setKeyword('')}>FX</Link></li>
                                </ul>
                            </li>
                            <li className="home-li" style={{ marginTop: '20px', color: (type === 'modular' && !category) ? 'white' : '#FF94C9', fontWeight: 'bold', fontSize: '18px' }}><Link to="/categories/modular" onClick={()=> setKeyword('')}>Modular</Link>
                                <ul style={{ paddingLeft: '10px', listStyle: 'none', margin: 0, fontWeight: 'normal', fontSize: '16px' }}>
                                    <li style={{ color: (type === 'modular' && category === 'terrain') ? 'white' : '#FF94C9' }}><Link to="/categories/modular/terrain" onClick={()=> setKeyword('')}>Terrain</Link></li>
                                    <li style={{ color: (type === 'modular' && category === 'building_kits') ? 'white' : '#FF94C9' }}><Link to="/categories/modular/building_kits" onClick={()=> setKeyword('')}>Building Kits</Link></li>
                                    <li style={{ color: (type === 'modular' && category === 'interiors') ? 'white' : '#FF94C9' }}><Link to="/categories/modular/interiors" onClick={()=> setKeyword('')}>Interiors</Link></li>
                                    <li style={{ color: (type === 'modular' && category === 'nature') ? 'white' : '#FF94C9' }}><Link to="/categories/modular/nature" onClick={()=> setKeyword('')}>Nature</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>

                <main className="home-center">
                    <section className="home-hero"> 
                        <p className="home-hero-text" style={{ fontSize: '32px' }}>Low-poly 3D assets for your projects.</p>
                        <p className="home-hero-text">All free under CC0 — no credit needed.</p>
                        <p className="home-hero-text">Plug in the MCP server and let your AI fetch them. → Docs</p>
                    </section>
                    <section className="home-search-area">
                        <input type="search" className="home-search-input" placeholder="Search assets..." value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setSearchParams(prev => {
                                            prev.set('q', keyword);
                                            return prev;
                                        });
                                        e.target.blur();
                                    }
                                }}/>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ position: 'relative' }}>
                                    <button className="home-category-dropdown-btn" 
                                            style={{ fontSize: '20px', marginTop: '5px', textTransform: 'capitalize'}} 
                                            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}>
                                        Category{' > '}{category || type || 'All categories'} ▼
                                    </button>
                                    { openDropdown === 'category' && (
                                        <div className="home-category-dropdown">
                                            <ul style={{ listStyle: 'none', margin: 0, padding: '0px 10px' }}>
                                                <li className="home-li" style={{ color: (!type && !category) ? 'white' : '#FF94C9', marginTop: '10px', fontWeight: 'bold', fontSize: '18px'}}><Link to="/">All categories</Link></li>
                                                <li className="home-li" style={{  color: (type === 'standalone' && !category) ? 'white' : '#FF94C9', position: 'relative', marginBottom: '10px', marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
                                                    <Link to="/categories/standalone">Standalone</Link>
                                                    <ul style={{ paddingLeft: '10px', listStyle: 'none', margin: 0, fontWeight: 'normal', fontSize: '16px' }}>
                                                        <li style={{ color: (type === 'standalone' && category === 'characters') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/characters">Characters</Link></li>
                                                        <li style={{ color: (type === 'standalone' && category === 'buildings') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/buildings">Buildings</Link></li>
                                                        <li style={{ color: (type === 'standalone' && category === 'props') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/props">Props</Link></li>
                                                        <li style={{ color: (type === 'standalone' && category === 'items') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/items">Items</Link></li>
                                                        <li style={{ color: (type === 'standalone' && category === 'nature') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/nature">Nature</Link></li>
                                                        <li style={{ color: (type === 'standalone' && category === 'vehicles') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/vehicles">Vehicles</Link></li>
                                                        <li style={{ color: (type === 'standalone' && category === 'fx') ? 'white' : '#FF94C9' }}><Link to="/categories/standalone/fx">FX</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="home-li" style={{  color: (type === 'modular' && !category) ? 'white' : '#FF94C9', position: 'relative', marginBottom: '10px', marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
                                                    <Link to="/categories/modular">Modular</Link>
                                                    <ul style={{ paddingLeft: '10px', listStyle: 'none', margin: 0, fontWeight: 'normal', fontSize: '16px' }}>
                                                        <li style={{ color: (type === 'modular' && category === 'terrain') ? 'white' : '#FF94C9' }}><Link to="/categories/modular/terrain">Terrain</Link></li>
                                                        <li style={{ color: (type === 'modular' && category === 'building_kits') ? 'white' : '#FF94C9' }}><Link to="/categories/modular/building_kits">Building Kits</Link></li>
                                                        <li style={{ color: (type === 'modular' && category === 'interiors') ? 'white' : '#FF94C9' }}><Link to="/categories/modular/interiors">Interiors</Link></li>
                                                        <li style={{ color: (type === 'modular' && category === 'nature') ? 'white' : '#FF94C9' }}><Link to="/categories/modular/nature">Nature</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <button className="home-category-dropdown-btn" 
                                            style={{ marginTop: '5px'}} 
                                            onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}>
                                        Sort By{' > '}{sort === 'most_liked' ? 'Most Liked' : 'Newest'} ▼
                                    </button>
                                    {openDropdown === 'sort' && (
                                        <div className="home-category-dropdown" style={{ width: '130px', right: 0 }}>
                                            <ul className="home-li" style={{ color: '#FF94C9', padding: '10px' }}>
                                                <li className="home-li-item" 
                                                    style={{ color: sort === 'most_liked' ? 'white' : null, cursor: 'pointer' }}
                                                    onClick={()=>setSearchParams(prev => {
                                                    prev.set('sort', 'most_liked'); return prev;
                                                })}>Most Liked</li>
                                                <li className="home-li-item" 
                                                    style={{ color: sort === 'newest' ? 'white' : null, cursor: 'pointer' }}
                                                    onClick={() => setSearchParams(prev => {
                                                        prev.set('sort', 'newest');
                                                        return prev;
                                                    })}
                                                >Newest</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="home-assets-area">
                        <ul className="home-assets-ul">
                            {assets.map(asset => 
                                <Card key={asset.id} asset={asset} />
                            )}
                        </ul>
                    </section>
                    <nav style={{ height: '50px', margin: '100px 0', display: 'flex', justifyContent: 'center',
                                    alignItems: 'center', color: '#FF94C9', whiteSpace: 'pre', fontSize: '20px'}}>
                        <span style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => {
                            if (currentPage <= 1) return;
                            setSearchParams(prev => {
                            prev.set('page', currentPage - 1);
                            return prev;
                        })}}>
                            {'<     '}</span>
                        <input type='text' maxLength={3} value={pageInput} 
                            onChange={(e) => {
                                setPageInput(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                // 음수랑 0 못 치게 거르기
                                if (e.key === 'Enter'){
                                    let page = Number(e.target.value) || 1; // 입력이 글자면 앞부분 NaN이 됨.
                                    if (page <= 0) {page = 1; setPageInput(1);}
                                    else if (page >= lastPage) {page = lastPage; setPageInput(lastPage);}

                                    setSearchParams(prev => {
                                        prev.set('page', page);
                                        return prev;
                                    });
                                    e.target.blur();
                                }
                            }}
                            style={{ font: 'inherit', width: '4ch', textAlign: 'center', color: 'white', background: 'transparent', border: '1px solid #FF94C9'}} />
                        {'  /'} {lastPage} 
                        <span style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => {
                            if (currentPage >= lastPage) return;
                            setSearchParams(prev => {
                            prev.set('page', currentPage + 1);
                            return prev;
                        })}}>
                            {'     >'}</span>
                    </nav>
                </main>

                <div className="home-right">
                    <div className="home-right-wrapper">
                        <div className="home-login">
                        <h2 className="home-panel-title">User</h2>
                        <p className="home-ul-login" style={{ marginTop: '10px' }}>
                            <Link to="/">Login</Link>
                            { ' / ' }
                            <Link to="/">Sign Up</Link>
                        </p>
                        </div>
                        <nav className="home-docs">
                            <h2 className="home-panel-title">Docs</h2>
                            <ul className="home-li" style={{ marginTop: '10px', color: '#FF94C9' }}>
                                <li><Link to="/">Overview</Link></li>
                                <li><Link to="/">MCP</Link></li>
                                <li><Link to="/">API</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <footer className="home-footer">
                <div>
                    <p className="home-footer-text"><b>Terms · Privacy</b></p>
                    <p className="home-footer-text">All assets are CC0 — free to use, no credit needed.</p>
                    <p className="home-footer-text">Inny Kim · inny@fetchmesh.dev</p>
                </div>
                <p className="home-footer-text">© 2026 fetchmesh</p>
            </footer>
        </div>
    )
}

function Card({ asset }){
    const name = `${asset.name}`;
    return (
        <li className="home-card">
            <Link to={`/assets/${asset.id}`}>
                <img style={{ width: '100%', display: 'block' }}
                src="/images/ic-chip.png"
                alt="asset background image"
                />
                <img style={{ width: '50%', display: 'block', position: 'absolute', top: 40, left: 62}}
                src={asset.image_url}
                alt={asset.name}
                />
                <div className="home-card-text-area">
                    <p className="home-card-text" style={{ fontSize: name.length > 12 ? 14 : 18 }}>
                    {name}
                    </p>
                </div>
                
            </Link>
        </li>
    )
}