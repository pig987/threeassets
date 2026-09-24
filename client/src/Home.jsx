import './Home.css'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'

export default function Home(){
    const [ openDropdown, setOpenDropdown ] = useState(null);
    const [ assets, setAssets ] = useState([]);

    useEffect(() => {
        async function load(){
            try {
                const response = await fetch('/api/assets');
                if (!response.ok) throw new Error('에러 발생');
                const assets = await response.json();
                setAssets(assets);
            } catch(e) {
                console.log(e);
            }
        }
        load();
    }, []);

    return (
        <>
            <header className="site-header">
                <Link to="/">
                    <img src="/images/logo.png" alt="Fetchmesh" height={60} style={{ position: 'relative', top: 5 }}/>
                </Link>
            </header>

            <div className="home-layout">
                <div className="home-left">
                    <nav className="home-category">
                        <h2 className="home-panel-title">Categories</h2>
                        <section className="home-standalone">
                            <h3 style={{ marginBottom: '10px' }}>Standalone</h3>
                            <ul className="home-ul">
                                <li><Link to="/">All</Link></li>
                                <li><Link to="/">Props</Link></li>
                                <li><Link to="/">Characters</Link></li>
                                <li><Link to="/">Furniture</Link></li>
                                <li><Link to="/">Nature</Link></li>
                                <li><Link to="/">Transport</Link></li>
                                <li><Link to="/">Other</Link></li>
                            </ul>
                        </section>
                        <section className="home-standalone">
                            <h3 style={{ marginBottom: '10px' }}>Modular</h3>
                            <ul className="home-ul">
                                <li><Link to="/">All</Link></li>
                                <li><Link to="/">Tiles</Link></li>
                                <li><Link to="/">Buildings</Link></li>
                                <li><Link to="/">Nature</Link></li>
                            </ul>
                        </section>
                    </nav>
                </div>

                <main className="home-center">
                    <section className="home-hero"> 
                        <p className="home-hero-text" style={{ fontSize: '32px' }}>Low-poly 3D assets for your projects.</p>
                        <p className="home-hero-text">All free under CC0 — no credit needed.</p>
                        <p className="home-hero-text">Plug in the MCP server and let your AI fetch them. → Docs</p>
                    </section>
                    <section className="home-search-area">
                        <form>
                            <input type="search" className="home-search-input" placeholder="Search assets..."/>
                        </form>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ position: 'relative' }}>
                                    <button className="home-category-dropdown-btn" 
                                            style={{ fontSize: '20px', marginTop: '5px'}} 
                                            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}>
                                        Category{' > '}All categories ▼
                                    </button>
                                    { openDropdown === 'category' && (
                                        <div className="home-category-dropdown">
                                            <ul style={{ listStyle: 'none', margin: 0, padding: '20px' }}>
                                                <li><button className="home-category-dropdown-btn" style={{ fontWeight: 'bold', fontSize: '18px' }}>All categories</button></li>
                                                <li style={{ color: '#FF94C9', marginTop: '10px', fontWeight: 'bold'}}>
                                                    Standalone
                                                    <ul style={{ listStyle: 'none', margin: 0, paddingLeft: '15px' }}>
                                                        <li><button className="home-category-dropdown-btn">Props</button></li>
                                                        <li><button className="home-category-dropdown-btn">Characters</button></li>
                                                        <li><button className="home-category-dropdown-btn">Furniture</button></li>
                                                        <li><button className="home-category-dropdown-btn">Nature</button></li>
                                                        <li><button className="home-category-dropdown-btn">Transport</button></li>
                                                        <li><button className="home-category-dropdown-btn">Other</button></li>
                                                    </ul>
                                                </li>
                                                <li style={{ color: '#FF94C9', marginTop: '10px', fontWeight: 'bold'}}>
                                                    Modular
                                                    <ul style={{ listStyle: 'none', margin: 0, paddingLeft: '15px' }}>
                                                        <li><button className="home-category-dropdown-btn">Tiles</button></li>
                                                        <li><button className="home-category-dropdown-btn">Buildings</button></li>
                                                        <li><button className="home-category-dropdown-btn">Nature</button></li>
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
                                        Sort By{' > '}Most Liked ▼
                                    </button>
                                    {openDropdown === 'sort' && (
                                        <div className="home-category-dropdown" style={{ width: '130px', right: 0 }}>
                                            <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
                                                <li><button className="home-category-dropdown-btn">Most Liked</button></li>
                                                <li><button className="home-category-dropdown-btn">Newest</button></li>
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
                    <nav>pagination</nav>
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
                            <ul className="home-ul" style={{ marginTop: '10px' }}>
                                <li><Link to="/">Overview</Link></li>
                                <li><Link to="/">MCP</Link></li>
                                <li><Link to="/">API</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <footer className="site-footer">
                <div>
                    <p className="home-footer-text"><b>Terms · Privacy</b></p>
                    <p className="home-footer-text">All assets are CC0 — free to use, no credit needed.</p>
                    <p className="home-footer-text">Inny Kim · inny@fetchmesh.dev</p>
                </div>
                <p className="home-footer-text">© 2026 fetchmesh</p>
            </footer>
        </>
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