# My Kanban Board

A modern, responsive Kanban board application built with Next.js 16, Material-UI, and React Query for efficient task management.

## Features

- **Real-time Search**: Filter tasks by title or description
- **CRUD Operations**: Create, read, update, and delete tasks
- **Column-based Organization**: Backlog, In Progress, Review, and Done columns
- **Responsive Design**: Material-UI components for a polished interface
- **Optimistic Updates**: React Query for efficient data fetching and caching
- **Modal Editing**: Edit tasks in a dedicated modal interface

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: Material-UI (MUI) v7.3.8
- **State Management**: Zustand v5.0.11
- **Data Fetching**: TanStack React Query v5.90.21
- **HTTP Client**: Axios v1.13.5
- **Styling**: Emotion (CSS-in-JS)

## Project Structure

```
my-kanban/
├── app/
│   ├── components/
│   │   ├── AddTask.jsx          # Inline task creation component
│   │   ├── BoardContent.jsx     # Main Kanban board layout
│   │   ├── EditTaskModal.jsx    # Task editing modal
│   │   ├── Providers.jsx        # React Query provider wrapper
│   │   └── TaskCard.jsx         # Individual task card component
│   ├── hooks/
│   │   └── useBoardData.js      # Custom hook for API operations
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.jsx                 # Home page
├── public/                      # Static assets
├── db.json                      # JSON Server database
├── package.json
└── next.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hend-essam/my-kanban.git
cd my-kanban
```

2. Install dependencies:

```bash
npm install
```

3. Start the JSON Server (backend):

```bash
npx json-server --watch db.json --port 4000
```

4. In a new terminal, start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## API Endpoints

The application uses JSON Server running on `http://localhost:4000`:

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `GET /categories` - Fetch all categories

## Data Structure

### Task Object

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "column": "backlog | in_progress | review | done"
}
```

### Category Object

```json
{
  "id": "string",
  "title": "string"
}
```

## Key Components

- **BoardContent**: Main Kanban board with search functionality and column layout
- **TaskCard**: Individual task display with edit capability
- **AddTask**: Inline form for quick task creation
- **EditTaskModal**: Full-featured modal for task editing and deletion
- **useBoardData**: Custom hook managing all API calls with React Query

## Features in Detail

### Search Functionality

Real-time filtering of tasks by title or description across all columns.

### Task Management

- Add tasks directly within any column
- Edit task details via modal
- Delete tasks with confirmation
- Move tasks between columns (drag & drop ready)

### Responsive Layout

- Horizontal scrolling for columns
- Vertical scrolling within columns
- Custom scrollbar styling
- Mobile-friendly design

## Configuration

### JSON Server Port

Default: `4000` (configured in `app/hooks/useBoardData.js`)

To change the port, update the `BASE_URL` constant:

```javascript
const BASE_URL = "http://localhost:YOUR_PORT";
```

## Browser Support

Modern browsers with ES6+ support:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project

## Version

0.1.0
