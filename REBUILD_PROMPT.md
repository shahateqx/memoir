# ZTM Notion Clone - JavaScript/React

## Project Overview

Build a **Notion-like note-taking application** using **React with JavaScript**  with **Supabase** as the backend. This is a collaborative note application that allows users to create hierarchical pages, edit notes with multiple block types, and manage content with drag-and-drop reordering.

---

## Key Features to Implement

1. **Authentication**
   - Magic link authentication (passwordless login via email)
   - Session management using Supabase Auth
   - Automatic session persistence and state management

2. **Page Management**
   - Create new pages with unique slugs (using nanoid)
   - Fetch and load pages from database
   - Display page title and cover image
   - Navigate between pages via router

3. **Node/Block Management**
   - Multiple node types: `text`, `list`, `heading1`, `heading2`, `heading3`, `image`, `page`
   - Inline editing with contentEditable divs
   - Command panel (type "/" to trigger block type selection)
   - Add/delete/reorder nodes dynamically

4. **Content Types**
   - **Text blocks**: Editable text content
   - **Heading blocks**: H1, H2, H3 formatting
   - **List blocks**: List formatting
   - **Image blocks**: Upload images to Supabase storage and display
   - **Page blocks**: Links to sub-pages with page title preview

5. **UI/UX Features**
   - Cover image management (upload and display)
   - Page title editing
   - Drag-and-drop reordering of blocks using DndKit
   - Focus management for keyboard navigation
   - Responsive design with CSS modules

6. **Data Persistence**
   - Real-time syncing with Supabase database
   - Debounced updates (500ms debounce)
   - Optimistic UI updates using Immer
   - Auto-save on content changes

---

## Technology Stack

### Core Dependencies

- **React 18.2.0** - UI framework
- **React Router DOM 6.14.2** - Client-side routing
- **Supabase JS 2.31.0** - Backend services (auth, database, storage)
- **@dnd-kit/core & @dnd-kit/sortable** - Drag-and-drop functionality
- **use-immer 0.9.0** - Immutable state management
- **nanoid 4.0.2** - Unique ID generation
- **classnames 2.3.2** - Conditional CSS classes

### Build Tools

- **Vite 4.4.5** - Fast build tool
- **React Router DOM** for SPA routing

### Development Tools

- **ESLint** for code quality (no TypeScript linting)
- **CSS Modules** for scoped styling

---

## Project Structure

```
src/
├── App.jsx                           # Main routing component
├── main.jsx                         # Entry point
├── index.css                        # Global styles
├── supabaseClient.js                # Supabase initialization
├── utils.module.css                 # Utility styles
├── vite-env.d.js                    # Vite env types (converted to JSDoc)
│
├── auth/
│   ├── Auth.jsx                     # Magic link login form
│   ├── AuthSessionContext.jsx       # Session state context
│   └── Private.jsx                  # Route protection wrapper
│
├── components/
│   ├── FileImage.jsx                # Image display component
│   ├── Loader.jsx                   # Loading spinner
│   └── Loader.module.css
│
├── Node/
│   ├── BasicNode.jsx                # Editable text node component
│   ├── ImageNode.jsx                # Image upload/display component
│   ├── PageNode.jsx                 # Page link component
│   ├── CommandPanel.jsx             # "/" command block selector
│   ├── NodeTypeSwitcher.jsx         # Routes to appropriate node type component
│   ├── NodeContainer.jsx            # Drag-drop wrapper for nodes
│   ├── useOverflowsScreenBottom.ts  # Hook for detecting overflow
│   ├── Node.module.css
│   ├── NodeContainer.module.css
│   └── CommandPanel.module.css
│
├── Page/
│   ├── Page.jsx                     # Main page component with DndContext
│   ├── Cover.jsx                    # Page cover image component
│   ├── Title.jsx                    # Editable page title
│   ├── Spacer.jsx                   # Hint/add-node spacer
│   ├── useFocusedNodeIndex.js       # Hook managing node focus state
│   ├── Page.module.css
│   ├── Cover.module.css
│   ├── Title.module.css
│   └── Spacer.module.css
│
├── state/
│   ├── AppStateContext.jsx          # Main app state provider
│   ├── usePageState.js              # Page state and mutations
│   ├── useSyncedState.js            # Synced state with debounce callback
│   ├── withInitialState.jsx         # HOC to load initial page state
│   └── startPageScaffold.json       # Default empty page structure
│
└── utils/
    ├── types.js                     # Type definitions (as JSDoc)
    ├── createPage.js                # Create new page in database
    ├── updatePage.js                # Debounced page update
    ├── uploadImage.js               # Image upload to Supabase storage
    └── debounce.js                  # Debounce utility function
```

---

## Type Definitions (Convert to JSDoc)

```javascript
/**
 * @typedef {('text' | 'image' | 'list' | 'page' | 'heading1' | 'heading2' | 'heading3')} NodeType
 */

/**
 * @typedef {Object} NodeData
 * @property {string} id - Unique node identifier
 * @property {NodeType} type - Block type
 * @property {string} value - Content value
 */

/**
 * @typedef {Object} Page
 * @property {string} id - Page ID from database
 * @property {string} slug - URL-friendly page identifier
 * @property {string} title - Page title
 * @property {NodeData[]} nodes - Array of content blocks
 * @property {string} cover - Cover image file path
 */
```

---

## Key Implementation Details

### 1. Supabase Setup

```javascript
// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing supabase url or key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### 2. Authentication Flow

- Users enter email in Auth component
- Supabase sends magic link via email
- Users click link to authenticate
- Session stored in Supabase and checked on app load
- Protected routes redirect unauthenticated users to `/auth`

### 3. State Management

- **AppStateContext**: Global page state via React Context
- **usePageState**: CRUD operations on page nodes
- **useSyncedState**: Combines Immer for drafts + debounced sync to Supabase
- **withInitialState HOC**: Wraps providers to fetch initial page data

### 4. Contenteditable Nodes

- Use `contentEditable` divs for inline editing
- Track text via `textContent`
- Handle keyboard events (Enter to create new node, Backspace to delete)
- Command panel appears when typing "/" in text nodes

### 5. Drag and Drop

- Use `@dnd-kit` library with vertical list sorting
- `DndContext` wraps sortable node list
- `NodeContainer` provides drag handle and transforms
- `reorderNodes` method updates state on drop

### 6. Image Upload

- Store images in Supabase storage bucket `images`
- Generate random filename to avoid conflicts
- Display using `FileImage` component
- File input triggered when ImageNode lacks value

### 7. Debounced Updates

- Page changes debounced to 500ms
- Reduces database write frequency
- Uses custom debounce utility function

---

## Database Schema (Supabase)

### `pages` table

| Column     | Type      | Notes                               |
| ---------- | --------- | ----------------------------------- |
| id         | uuid      | Primary key                         |
| slug       | text      | URL identifier (unique per user)    |
| title      | text      | Page title                          |
| nodes      | jsonb     | Array of node objects               |
| cover      | text      | Cover image file path               |
| created_by | uuid      | User ID (foreign key to auth.users) |
| created_at | timestamp | Record creation time                |
| updated_at | timestamp | Last update time                    |

### `images` bucket (Storage)

- Bucket name: `images`
- Files stored as: `{random}.{extension}`
- Public access for reading

---

## Environment Variables

Create `.env` file with:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_API_KEY=your_supabase_public_key
```

---

## CSS Module Structure

- **Utility classes**: flexbox, centering, grid
- **Node styling**: Different styles per node type (headings larger, list indented, etc)
- **Component-scoped styles**: Each component has matching `.module.css`
- **Command panel**: Positioned dynamically (reverses if overflows bottom)

---

## Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Start Supabase locally (optional)
npm run supabase:start
```

---

## Key Patterns to Maintain

1. **Custom Hooks**: usePageState, useSyncedState, useFocusedNodeIndex, useAuthSession
2. **Context API**: AppStateContext for global state
3. **HOC Pattern**: withInitialState wrapper for initial data fetching
4. **Immer Drafts**: Use Immer for immutable-like state updates
5. **Event Delegation**: Command panel and keyboard shortcuts
6. **Optimistic Updates**: Update UI before database sync completes

---

## Common Tasks

### Adding a New Node Type

1. Create component in `Node/` folder
2. Add type to NodeType union
3. Add option in CommandPanel.jsx
4. Import in NodeTypeSwitcher.jsx
5. Add styling in Node.module.css

### Adding a New Feature

1. Identify if state is needed → usePageState
2. Create UI component in appropriate folder
3. Wire state via AppStateContext
4. Add Supabase query if data needed
5. Add tests and update types/JSDoc

### Debugging State Changes

- Use React DevTools Profiler to track rerenders
- Check Redux DevTools-style logging with Immer
- Verify Supabase subscriptions/syncing in browser console
- Test with network throttling in DevTools

---

## Notes for JavaScript Conversion

- Remove all TypeScript syntax (no types, interfaces, enums)
- Convert type definitions to JSDoc comments
- Remove `as` type assertions
- Keep all functional logic identical
- Use `.js` extensions instead of `.tsx`/`.ts`
- Keep CSS Modules and styling unchanged
- All imports/exports work the same in JavaScript

---

## Success Criteria

✅ Users can authenticate with magic links
✅ Create/read/update/delete pages and nodes
✅ Drag-and-drop reordering works smoothly
✅ Image uploads and display correctly
✅ Page title and cover editing functional
✅ Command palette appears on "/" input
✅ Real-time sync with Supabase
✅ Navigation between pages works
✅ Responsive design on mobile/tablet
✅ No console errors or warnings

---

This prompt should provide Claude AI with a complete blueprint to rebuild the project using JavaScript/React while maintaining full feature parity with the original TypeScript version.
