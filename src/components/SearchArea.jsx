import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const SearchArea = ({ setSearchResult, setIsLoading, hasResult }) => {
    const [query, setQuery] = useState('');
    const textareaRef = useRef(null);

    const handleInput = (e) => {
        setQuery(e.target.value);
        // Auto-expand
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleSubmit = async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        setSearchResult(null); // Clear previous result

        try {
            const { getDefinition } = await import('../services/gemini');
            const data = await getDefinition(query);
            setSearchResult(data);
        } catch (error) {
            console.error(error);
            if (error.message === 'API_KEY_MISSING') {
                alert('Please set your Gemini API Key in the code or .env file.');
            } else {
                alert('Failed to fetch definition. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Reset height when query is empty
    useEffect(() => {
        if (query === '' && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }, [query]);

    return (
        <div style={{
            width: '100%',
            maxWidth: '700px',
            transition: 'all 0.5s ease'
        }}>
            {!hasResult && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '2.5rem',
                        marginBottom: '0.5rem',
                        color: 'var(--color-text)'
                    }}>
                        What are you looking for?
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Discover definitions, etymologies, and nuances.
                    </p>
                </div>
            )}

            <div style={{
                position: 'relative',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                padding: '0.75rem',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <textarea
                    ref={textareaRef}
                    value={query}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a word or phrase..."
                    rows={1}
                    style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        fontSize: '1.1rem',
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--color-text)',
                        backgroundColor: 'transparent',
                        maxHeight: '200px',
                        lineHeight: '1.5',
                        padding: '0.2rem 0',
                        overflow: 'hidden'
                    }}
                />
                <button
                    onClick={handleSubmit}
                    disabled={!query.trim()}
                    style={{
                        flexShrink: 0,
                        backgroundColor: query.trim() ? 'var(--color-accent)' : '#E6E2DD',
                        color: '#fff',
                        borderRadius: '6px',
                        padding: '0.5rem',
                        transition: 'background-color 0.2s ease',
                        cursor: query.trim() ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ArrowUp size={20} />
                </button>
            </div>
        </div>
    );
};

export default SearchArea;
