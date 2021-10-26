import supertest from 'supertest';

import server from '../src/index';

const requestWithSupertest = supertest(server);

export default requestWithSupertest;
