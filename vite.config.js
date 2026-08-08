import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { sendFormEmails } from './src/utils/emailService.js'

const resendApiPlugin = (env) => ({
  name: 'resend-api-plugin',
  configureServer(server) {
    server.middlewares.use('/api/send-email', async (req, res) => {
      Object.assign(process.env, env);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
      }

      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const result = await sendFormEmails(data);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(result));
          } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message || 'Error sending email' }));
          }
        });
      }
    });

    server.middlewares.use('/api/chat', async (req, res) => {
      Object.assign(process.env, env);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
      }

      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
            const systemPrompt = `You are Vinayak AI, an advanced conversational garment care concierge developed for Siddhi Vinayak Laundry (SVL) located in Jamnagar, Gujarat, India. 
Your tone should be professional, polite, and deeply knowledgeable about fabric care chemistry and laundry logistics. 
Key Information you should know:
- Contact: Phone/WhatsApp: +91 6351674100, Email: svinayaklaundry@gmail.com
- Pricing: All services are charged per piece. Contact via WhatsApp for rates.
- Location: Jamnagar. 100% FREE doorstep pickup & delivery.
- Turnaround: 24-48 hours. Express 12-Hour available.
Format your responses using Markdown and keep them concise.`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                system_instruction: { parts: [{ text: systemPrompt }] },
                contents: data.contents,
                generationConfig: { temperature: 0.4, maxOutputTokens: 250 }
              })
            });
            const geminiData = await response.json();
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(geminiData));
          } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message || 'Error communicating with Gemini' }));
          }
        });
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), resendApiPlugin(env)],
    build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('lucide-react')) {
              return 'ui';
            }
            return 'dependencies';
          }
        }
      }
    }
  }
  };
})
