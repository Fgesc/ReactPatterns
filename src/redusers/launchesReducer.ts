import type { typeLaunches } from '../types/typeLaunches';

export type LaunchesState =
    | { status: 'initialize'; launches: typeLaunches[] }
    | { status: 'loading'; launches: typeLaunches[] }
    | { status: 'success'; launches: typeLaunches[] }
    | { status: 'error'; launches: typeLaunches[]; error: string };

type LaunchesAction =
    | { type: 'fetch_start' }
    | { type: 'fetch_success'; payload: typeLaunches[] }
    | { type: 'fetch_error'; messageError: string };

export function launchesReducer(
    state: LaunchesState,
    action: LaunchesAction
): LaunchesState {
    switch (action.type) {
        case 'fetch_start':
            return { status: 'loading', launches: state.launches };
        case 'fetch_success':
            return { status: 'success', launches: action.payload };
        case 'fetch_error':
            return { status: 'error', launches: [], error: action.messageError };
        default:
            return state;
    }
}
