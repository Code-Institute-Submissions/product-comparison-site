import axios from 'axios';

// Sets the CSRF token header name and cookie name
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

export default axios;
