import { Link } from 'react-router'

const pink = '#FF94C9';

const codeStyle = {
    display: 'block',
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '12px 16px',
    whiteSpace: 'pre',
    overflowX: 'auto',
    fontFamily: 'monospace',
    fontSize: '14px',
};

const sectionStyle = { marginTop: '40px' };
const headingStyle = { color: pink, fontSize: '22px', marginBottom: '12px' };
const cellStyle = { padding: '8px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'left', verticalAlign: 'top' };

export default function McpDocs(){
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', color: 'white', lineHeight: 1.6 }}>
            <Link to="/" style={{ color: pink }}>← Back to assets</Link>

            <h1 style={{ marginTop: '20px' }}>MCP Server</h1>
            <p>
                Connect fetchmesh to your AI assistant. It can search low-poly GLB assets
                and download them straight into your three.js project.
            </p>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Server URL</h2>
                <code style={codeStyle}>https://fetchmesh.dev/mcp</code>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Connect</h2>

                <h3>Claude</h3>
                <ol>
                    <li>Settings → Connectors → Add custom connector</li>
                    <li>Paste the server URL above</li>
                    <li>Ask Claude: "Find me a low-poly cat"</li>
                </ol>

                <h3>Claude Code</h3>
                <code style={codeStyle}>claude mcp add --transport http fetchmesh https://fetchmesh.dev/mcp</code>

                <h3>Cursor</h3>
                <p>Add this to <code>.cursor/mcp.json</code>:</p>
                <code style={codeStyle}>{`{
  "mcpServers": {
    "fetchmesh": { "url": "https://fetchmesh.dev/mcp" }
  }
}`}</code>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Tools</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Tool</th>
                            <th style={cellStyle}>Description</th>
                            <th style={cellStyle}>Input</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={cellStyle}><code>list_categories</code></td>
                            <td style={cellStyle}>Lists all categories, grouped into standalone and modular.</td>
                            <td style={cellStyle}>None</td>
                        </tr>
                        <tr>
                            <td style={cellStyle}><code>search_assets</code></td>
                            <td style={cellStyle}>Searches assets. Returns id and name.</td>
                            <td style={cellStyle}><code>query</code>, <code>category</code>, <code>type</code> (at least one)</td>
                        </tr>
                        <tr>
                            <td style={cellStyle}><code>get_asset_url</code></td>
                            <td style={cellStyle}>Returns the GLB download URL.</td>
                            <td style={cellStyle}><code>id</code> from search_assets</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>How it works</h2>
                <p>When you ask "Find me a low-poly cat", the AI:</p>
                <ol>
                    <li>Calls <code>search_assets</code> with <code>query: "cat"</code></li>
                    <li>Calls <code>get_asset_url</code> with the id it found</li>
                    <li>Downloads the GLB file into your project</li>
                    <li>Loads it in three.js from your project folder</li>
                </ol>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Notes</h2>
                <ul>
                    <li>Asset URLs can't be loaded directly from other websites (blocked by CORS). Download the file into your project first.</li>
                    <li>Rate limit: 100 requests per minute.</li>
                    <li>All assets are CC0 — free to use, no credit needed.</li>
                </ul>
            </section>
        </div>
    )
}