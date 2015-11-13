import restful, { fetchBackend } from 'restful.js';

const api = restful('/api', fetchBackend(fetch));

export default api