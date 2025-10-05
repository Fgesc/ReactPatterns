import ky from 'ky';
import type { typeLaunches } from '../types/typeLaunches';

export default class LaunchesService {
    static async getAll() {
        const data = await ky
            .get<typeLaunches[]> ('https://api.spacexdata.com/v3/launches', {
                    searchParams: {
                        launch_year: '2020',
                        filter: 'mission_name,rocket/rocket_name,links/mission_patch,links/mission_patch_small,details'
                    }
                } ).json();
        return data;
    }
}