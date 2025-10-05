import { http, HttpResponse } from 'msw';
import { launchesResponse } from './response';

const LAUNCHES_API_URL = 'https://api.spacexdata.com/v3/launches*';

export const handlers = [
    http.get(LAUNCHES_API_URL, () => {
        return HttpResponse.json(launchesResponse);
    }),
];
