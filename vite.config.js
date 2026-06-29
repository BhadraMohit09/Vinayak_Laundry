import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sendFormEmails } from './src/utils/emailService.js'

const resendApiPlugin = () => ({
  name: 'resend-api-plugin',
  configureServer(server) {
    server.middlewares.use('/api/send-email', async (req, res) => {
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
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), resendApiPlugin()],
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
})
