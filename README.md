# Dictionary App

A sophisticated dictionary application with AI-powered definitions from Google Gemini.

## Features

- 🔍 **Comprehensive Definitions** - Get detailed word definitions, pronunciations, etymologies, and more
- 🎯 **Multiple Meanings** - See all different uses and contexts of a word
- 📚 **Etymology** - Learn the origin and history of words
- 🔊 **Audio Pronunciation** - Hear words spoken using Text-to-Speech
- 📖 **Example Sentences** - Understand usage through contextual examples
- 🔄 **Synonyms & Antonyms** - Discover related and opposite words
- 💬 **Idioms & Phrases** - Learn common expressions using the word
- 📝 **Search History** - Access your last 10 searches
- ⭐ **Bookmarks** - Save your favorite words for later
- 📤 **Share** - Copy or share definitions easily

## Design Philosophy

Inspired by Claude's elegant aesthetic:
- Warm, editorial design with serif typography
- Earthy tones and terracotta accents
- Abundant whitespace for calm reading
- Minimalist, focused interface
- Refined interactions and transitions

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Get a Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key

3. **Configure environment**
   - Copy `.env.example` to `.env`
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_key_here
     ```

4. **Run the app**
   ```bash
   npm run dev
   ```

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Google Gemini AI** - Definition generation
- **Web Speech API** - Text-to-speech
- **LocalStorage** - History & bookmarks persistence
- **Lucide Icons** - Beautiful, minimal icons
- **Vanilla CSS** - Custom styling with CSS variables

## Usage

1. Enter a word in the search box
2. View comprehensive definition with all details
3. Click the speaker icon to hear pronunciation
4. Bookmark words you want to save
5. Access your history from the sidebar
6. Share definitions with others

---

Built with attention to detail and a love for words. 📖
