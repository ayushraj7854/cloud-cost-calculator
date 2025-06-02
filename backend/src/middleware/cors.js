const cors = require('cors');

const corsOptions = {
    origin: function(origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://your-frontend-domain.com',
            'https://cloudcalc.netlify.app',
            'https://cloudcalc.vercel.app'
        ];

        if (process.env.NODE_ENV === 'development') {
            allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:3000');
        }

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS policy'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'X-API-Key'
    ],
    exposedHeaders: ['X-Total-Count', 'X-Rate-Limit-Remaining']
};

module.exports = cors(corsOptions);