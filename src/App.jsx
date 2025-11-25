import React, { useState, useEffect } from 'react';
import { Book, Clock, Search, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import SearchArea from './components/SearchArea';
import DefinitionView from './components/DefinitionView';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [currentView, setCurrentView] = useState('search'); // 'search', 'history', 'bookmarks', 'settings'
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // Load history and bookmarks from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('dictionary_history');
    const savedBookmarks = localStorage.getItem('dictionary_bookmarks');

    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
  }, []);

  // Save to history when a new search result is received
  useEffect(() => {
    if (searchResult && searchResult.word) {
      const newHistory = [
        { word: searchResult.word, timestamp: Date.now(), data: searchResult },
        ...history.filter(h => h.word.toLowerCase() !== searchResult.word.toLowerCase())
      ].slice(0, 10); // Keep only last 10

      setHistory(newHistory);
      localStorage.setItem('dictionary_history', JSON.stringify(newHistory));
    }
  }, [searchResult]);

  const toggleBookmark = (data) => {
    const existingIndex = bookmarks.findIndex(b => b.word.toLowerCase() === data.word.toLowerCase());
    let newBookmarks;

    if (existingIndex >= 0) {
      // Remove bookmark
      newBookmarks = bookmarks.filter((_, i) => i !== existingIndex);
    } else {
      // Add bookmark
      newBookmarks = [...bookmarks, { ...data, timestamp: Date.now() }];
    }

    setBookmarks(newBookmarks);
    localStorage.setItem('dictionary_bookmarks', JSON.stringify(newBookmarks));
  };

  const isBookmarked = searchResult
    ? bookmarks.some(b => b.word.toLowerCase() === searchResult.word.toLowerCase())
    : false;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {isSidebarOpen && window.innerWidth < 768 && (
        <div
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 15
          }}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        currentView={currentView}
        setCurrentView={setCurrentView}
        history={history}
        bookmarks={bookmarks}
        onSelectWord={(data) => {
          setSearchResult(data);
          setCurrentView('search');
          // Close sidebar on mobile after selection
          if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
          }
        }}
      />

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        marginLeft: window.innerWidth >= 768 && isSidebarOpen ? '260px' : '0',
        transition: 'margin-left 0.3s ease',
        overflow: 'hidden'
      }}>
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              zIndex: 10
            }}
          >
            <Menu size={20} />
          </button>
        )}

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: searchResult ? 'flex-start' : 'center',
          padding: window.innerWidth < 768 ? '1rem' : '2rem',
          overflowY: 'auto',
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%'
        }}>
          <SearchArea
            setSearchResult={setSearchResult}
            setIsLoading={setIsLoading}
            hasResult={!!searchResult}
          />

          {isLoading && (
            <div style={{ marginTop: '2rem', color: 'var(--color-text-secondary)' }}>
              Searching...
            </div>
          )}

          {searchResult && !isLoading && (
            <DefinitionView
              data={searchResult}
              onBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
