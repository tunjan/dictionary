import React, { useState } from 'react';
import { Volume2, Bookmark, Share2, BookmarkCheck } from 'lucide-react';

const DefinitionView = ({ data, onBookmark, isBookmarked }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    if (!data) return null;

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            if (!isPlaying) {
                const utterance = new SpeechSynthesisUtterance(data.word);
                utterance.rate = 0.8;
                utterance.pitch = 1;
                utterance.onend = () => setIsPlaying(false);
                utterance.onerror = () => setIsPlaying(false);

                setIsPlaying(true);
                window.speechSynthesis.speak(utterance);
            }
        } else {
            alert('Text-to-speech is not supported in your browser.');
        }
    };

    const handleShare = () => {
        const shareText = `${data.word}: ${data.definition}`;
        if (navigator.share) {
            navigator.share({
                title: data.word,
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText);
            alert('Definition copied to clipboard!');
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '700px', marginTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '3rem',
                        color: 'var(--color-text)',
                        marginBottom: '0.5rem'
                    }}>
                        {data.word || 'Word'}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-secondary)' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>/{data.phonetic || 'phonetic'}/</span>
                        <span style={{ fontStyle: 'italic' }}>{data.partOfSpeech || 'noun'}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={handleSpeak}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            color: isPlaying ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: isPlaying ? '#F5F2EB' : 'transparent',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Volume2 size={20} />
                    </button>
                    <button
                        onClick={() => onBookmark && onBookmark(data)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            color: isBookmarked ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: isBookmarked ? '#F5F2EB' : 'transparent',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
                    <button
                        onClick={handleShare}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            color: 'var(--color-text-secondary)',
                            border: '1px solid var(--color-border)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', margin: '1.5rem 0' }}></div>

            <section style={{ marginBottom: '2rem' }}>
                <h3 style={{
                    fontFamily: 'var(--font-sans)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.85rem',
                    color: '#8A847A',
                    marginBottom: '1rem'
                }}>
                    Definition
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                    {data.definition}
                </p>

                {data.multipleMeanings && data.multipleMeanings.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                        {data.multipleMeanings.map((meaning, index) => (
                            <div key={index} style={{ marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                <span style={{ fontStyle: 'italic', marginRight: '0.5rem' }}>{meaning.partOfSpeech}</span>
                                <span>{meaning.definition}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h3 style={{
                    fontFamily: 'var(--font-sans)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.85rem',
                    color: '#8A847A',
                    marginBottom: '1rem'
                }}>
                    Example
                </h3>
                <div style={{
                    borderLeft: '3px solid var(--color-accent)',
                    paddingLeft: '1rem',
                    fontStyle: 'italic',
                    color: 'var(--color-text-secondary)'
                }}>
                    "{data.example}"
                </div>
            </section>

            {data.etymology && (
                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-sans)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: '0.85rem',
                        color: '#8A847A',
                        marginBottom: '1rem'
                    }}>
                        Etymology
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{data.etymology}</p>
                </section>
            )}

            {data.synonyms && data.synonyms.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-sans)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: '0.85rem',
                        color: '#8A847A',
                        marginBottom: '1rem'
                    }}>
                        Synonyms
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {data.synonyms.map((syn, i) => (
                            <span key={i} style={{
                                backgroundColor: '#E6E2DD',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '16px',
                                fontSize: '0.9rem'
                            }}>
                                {syn}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {data.antonyms && data.antonyms.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-sans)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: '0.85rem',
                        color: '#8A847A',
                        marginBottom: '1rem'
                    }}>
                        Antonyms
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {data.antonyms.map((ant, i) => (
                            <span key={i} style={{
                                backgroundColor: '#E6E2DD',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '16px',
                                fontSize: '0.9rem'
                            }}>
                                {ant}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {data.idioms && data.idioms.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-sans)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: '0.85rem',
                        color: '#8A847A',
                        marginBottom: '1rem'
                    }}>
                        Common Phrases & Idioms
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {data.idioms.map((idiom, i) => (
                            <div key={i} style={{
                                color: 'var(--color-text-secondary)',
                                fontStyle: 'italic'
                            }}>
                                • {idiom}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default DefinitionView;
