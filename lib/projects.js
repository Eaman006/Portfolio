import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');

const INITIAL_PROJECTS = [
  {
    id: "task-manager",
    title: "Task Manager",
    image: "/task-manager.png",
    features: [
      "Effectively Plan your daily task and Goals.",
      "Realtime Monitoring your Tasks.",
      "Graph to keep track on your progress."
    ],
    github: "https://github.com/Eaman006/Task-Manager.git",
    website: "https://task-manager-livid-phi.vercel.app/"
  },
  {
    id: "campus-navigator",
    title: "Campus Navigator",
    image: "/campus1.png",
    features: [
      "🔍 Search for Directions – Get the best path between buildings and rooms.",
      "🎙️ Voice-Based Navigation – Speak your query instead of typing.",
      "🗺️ Dynamic Floor Maps – Interactive SVG-based maps for easy navigation.",
      "📡 REST API Integration – Fetches real-time navigation paths from the backend."
    ],
    github: "https://github.com/Eaman006/Campus-Navigator.git",
    website: "https://campus-navigator-five.vercel.app/"
  },
  {
    id: "url-flix",
    title: "Url Flix",
    image: "/url.png",
    features: [
      "🔗Make short Url for free",
      "🛜No signup Required"
    ],
    github: "https://github.com/Eaman006/URLfix.git",
    website: "https://ur-lfix.vercel.app"
  },
  {
    id: "todo-app",
    title: "Todo App",
    image: "/todo.png",
    features: [
      "🗃️Manage Your Todos very effectively",
      "🎙️ Use voice Typing to save your Todos"
    ],
    github: "https://github.com/Eaman006/TodoAPP.git",
    website: "https://todo-app-lac-phi-13.vercel.app/"
  },
  {
    id: "automatic-attendance-system",
    title: "Automatic Attendance System",
    image: "/attendance.png",
    features: [
      "Build Using OpenCV and face_recognition in Python",
      "Take Attendance precisely with date and time"
    ],
    github: "https://github.com/Eaman006/AutomaticAttendanceSystem.git",
    website: ""
  },
  {
    id: "musico-player",
    title: "Musico Player",
    image: "/musico.png",
    features: [
      "🔍 Search and Make playlist",
      "🎙️ Clear High Quality Audio",
      "🗺️ Stream music all over the world.",
      "📡 Enjoy Ads free music for free"
    ],
    github: "https://github.com/Eaman006/MusicoPlayer.git",
    website: "https://musico-player-sigma.vercel.app/"
  }
];

export function getProjects() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      saveProjects(INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading projects file:", error);
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects) {
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error saving projects file:", error);
    return false;
  }
}
