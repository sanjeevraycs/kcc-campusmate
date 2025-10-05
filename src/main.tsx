import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Check if environment variables are loaded
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; background: linear-gradient(to bottom right, #1a1a1a, #2d2d2d);">
        <div style="text-align: center; max-width: 500px; color: white;">
          <h1 style="font-size: 24px; margin-bottom: 16px;">Backend Initializing...</h1>
          <p style="color: #a0a0a0; margin-bottom: 24px;">
            Your Lovable Cloud backend is being set up. Please wait a moment and refresh the page.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="padding: 12px 24px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;"
          >
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
