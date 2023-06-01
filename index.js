import './server/http.js'
import './server/websockets.js'
import { serverHttp } from './server/http.js';

serverHttp.listen(3000, () => {
    console.log('Api on')
});