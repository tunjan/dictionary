import React from 'react';
import { Plus, Clock, Bookmark, Settings, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, currentView, setCurrentView, history = [], bookmarks = [], onSelectWord }) => {
    const sidebarStyle = {
        width: '260px',
        height: '100%',
        backgroundColor: '#F5F2EB',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        position: 'absolute',
        left: isOpen ? 0 : '-260px',
        top: 0,
        transition: 'left 0.3s ease',
        zIndex: 20,
    };

    const itemStyle = (view) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        color: currentView === view ? 'var(--color-text)' : 'var(--color-text-secondary)',
        backgroundColor: currentView === view ? '#E6E2DD' : 'transparent',
        marginBottom: '0.25rem',
        transition: 'background-color 0.2s ease',
        fontSize: '0.95rem',
        fontWeight: 500,
        minHeight: '44px'
    });

    const listItemStyle = {
        padding: '0.75rem 1rem',
        cursor: 'pointer',
        borderRadius: '4px',
        marginBottom: '0.25rem',
        transition: 'background-color 0.2s ease',
        fontSize: '0.9rem',
        color: 'var(--color-text-secondary)',
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center'
    };

    const renderContent = () => {
        if (currentView === 'history') {
            return (
                <div style={{ flex: 1, overflowY: 'auto', marginTop: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8A847A', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
                        Recent Searches
                    </div>
                    {history.length === 0 ? (
                        <div style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                            No history yet
                        </div>
                    ) : (
                        history.map((item, index) => (
                            <div
                                key={index}
                                style={listItemStyle}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E6E2DD'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={() => onSelectWord && onSelectWord(item.data)}
                            >
                                {item.word}
                            </div>
                        ))
                    )}
                </div>
            );
        }

        if (currentView === 'bookmarks') {
            return (
                <div style={{ flex: 1, overflowY: 'auto', marginTop: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8A847A', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
                        Saved Words
                    </div>
                    {bookmarks.length === 0 ? (
                        <div style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                            No bookmarks yet
                        </div>
                    ) : (
                        bookmarks.map((item, index) => (
                            <div
                                key={index}
                                style={listItemStyle}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E6E2DD'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={() => onSelectWord && onSelectWord(item)}
                            >
                                {item.word}
                            </div>
                        ))
                    )}
                </div>
            );
        }

        if (currentView === 'settings') {
            return (
                <div style={{ flex: 1, overflowY: 'auto', marginTop: '1rem', padding: '1rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem' }}>Settings</h3>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        <p style={{ marginBottom: '0.5rem' }}>To use this dictionary, you need a Gemini API key.</p>
                        <p style={{ marginBottom: '0.5rem' }}>Create a <code style={{ backgroundColor: '#E6E2DD', padding: '2px 6px', borderRadius: '3px' }}>.env</code> file in the project root:</p>
                        <code style={{ display: 'block', backgroundColor: '#E6E2DD', padding: '0.5rem', borderRadius: '4px', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                            VITE_GEMINI_API_KEY=your_key_here
                        </code>
                    </div>
                </div>
            );
        }

        // Default: show recent history in sidebar
        return (
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8A847A', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
                    Recent
                </div>
                {history.slice(0, 5).map((item, index) => (
                    <div
                        key={index}
                        style={listItemStyle}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E6E2DD'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => onSelectWord && onSelectWord(item.data)}
                    >
                        {item.word}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={sidebarStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-text)' }}>Dictionary</h2>
                <button onClick={toggleSidebar} style={{ color: 'var(--color-text-secondary)' }}>
                    <X size={20} />
                </button>
            </div>

            <div
                style={{ ...itemStyle('search'), backgroundColor: '#E8E4DC', color: 'var(--color-accent)', marginBottom: '1.5rem' }}
                onClick={() => setCurrentView('search')}
            >
                <Plus size={18} />
                <span>New Search</span>
            </div>

            <div style={{ borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}></div>

            <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8A847A', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
                    Library
                </div>

                <div style={itemStyle('history')} onClick={() => setCurrentView('history')}>
                    <Clock size={18} />
                    <span>History</span>
                </div>

                <div style={itemStyle('bookmarks')} onClick={() => setCurrentView('bookmarks')}>
                    <Bookmark size={18} />
                    <span>Bookmarks</span>
                </div>
            </div>

            {renderContent()}

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: 'auto' }}>
                <div style={itemStyle('settings')} onClick={() => setCurrentView('settings')}>
                    <Settings size={18} />
                    <span>Settings</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
