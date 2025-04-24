const BASE_URL = import.meta.env.DEV ? '/api' : 'http://localhost:5000';

export const BACKEND_URL = `${BASE_URL}/messages`;
export const SEND_TOPIC_URL = `${BASE_URL}/send-topic`;
export const SIGNAL_URL = `${BASE_URL}/signal`;
export const FETCH_INTERVAL = 3000; // 3 seconds