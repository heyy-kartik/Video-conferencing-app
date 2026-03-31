# EZMeet

A modern video conferencing application built with Next.js, featuring real-time video calls, screen sharing, meeting scheduling, and more.

## Features

- 🎥 Real-time video conferencing
- 🔐 Secure authentication with Clerk
- 📅 Schedule meetings for later
- 🏠 Personal meeting rooms
- 📹 Meeting recordings
- 📱 Responsive design for all devices
- 🎨 Modern UI with shadcn/ui components
- ⌨️ **Keyboard Echo** — renders every keystroke on-screen with a typewriter effect

## Tech Stack

| Technology | Description |
|------------|-------------|
| **Next.js 16** | React framework for production |
| **React 19** | UI library |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Clerk** | Authentication and user management |
| **Stream Video SDK** | Real-time video calling infrastructure |
| **shadcn/ui** | Beautiful, accessible UI components |
| **Radix UI** | Unstyled, accessible component primitives |
| **Lucide React** | Beautiful & consistent icons |
| **date-fns** | Modern date utility library |
| **Sonner** | Toast notifications |

## Screenshots

<!-- Add your screenshots below. Uncomment the image lines and update the paths -->

### Home Page
<!-- ![Home Page](./screenshots/home.png) -->
*Add screenshot here*

### Meeting Room
<!-- ![Meeting Room](./screenshots/meeting-room.png) -->
*Add screenshot here*

### Personal Room
<!-- ![Personal Room](./screenshots/personal-room.png) -->
*Add screenshot here*

### Upcoming Meetings
<!-- ![Upcoming Meetings](./screenshots/upcoming.png) -->
*Add screenshot here*

### Recordings
<!-- ![Recordings](./screenshots/recordings.png) -->
*Add screenshot here*

### Previous Meetings
<!-- ![Previous Meetings](./screenshots/previous.png) -->
*Add screenshot here*

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ezmeet.git
   cd ezmeet/my-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_STREAM_API_KEY=
   STREAM_SECRET_KEY=
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
my-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages
│   │   └── (root)/          # Main application pages
│   ├── components/          # React components
│   │   └── ui/              # shadcn/ui components
│   ├── actions/             # Server actions
│   ├── constants/           # App constants
│   └── lib/                 # Utility functions
├── hooks/                   # Custom React hooks
├── providers/               # Context providers
└── public/                  # Static assets
```

## Keyboard Echo

Navigate to **Keyboard Echo** in the sidebar (or visit `/home/keyboard`) to open the feature.

- Click **"Start Capture"** to enable keystroke recording.
- Type anywhere on the page — characters appear in the panel with a typewriter effect.
- Special keys behave as follows:

| Key | Behaviour |
|-----|-----------|
| `Backspace` | Deletes the last character |
| `Enter` | Inserts a new line |
| `Tab` | Inserts a tab stop (no focus switch) |
| `Escape` | Clears the entire panel |
| `Space` | Renders as a space |
| Other non-printable keys | Rendered as `[KeyName]` tokens |

- Click **"Clear"** to empty the panel at any time.
- Typing inside form inputs / textareas is **never** captured — the listener is scoped to elements outside normal input fields.
- The typewriter animation queues characters internally so no keystroke is missed at fast typing speeds.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Stream](https://getstream.io/) for the video SDK
- [Clerk](https://clerk.com/) for authentication
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
