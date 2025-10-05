import { useCallback, useEffect, useReducer } from 'react';
import { HTTPError } from 'ky';
import { LaunchesPage } from '../LaunchesPage/LaunchesPage';
import { CustomLoader } from '../../ui/Loader';
import { ModalProvider } from '../../providers/ModalProvider';
import LaunchesService from '../../api/LaunchesService';
import { launchesReducer, type LaunchesState } from '../../redusers/launchesReducer';


function App() {

    const [state, dispatch] = useReducer(launchesReducer, {
        status: 'initialize',
        launches: [],
    } as LaunchesState);

    const loadLaunches = useCallback(async () => {
        dispatch({ type: 'fetch_start' });
        try {
            const newLaunches = await LaunchesService.getAll();
            // console.log( newLaunches);
            dispatch({ type: 'fetch_success', payload: newLaunches });
        } catch (e) {
            if (e instanceof HTTPError) {
                const status = e.response.status;
                const statusText = e.response.statusText;
                switch (status) {
                    case 404:
                        dispatch({ type: 'fetch_error', messageError: 'Запрос не найден (404)' });
                        break;
                    case 500:
                        dispatch({ type: 'fetch_error', messageError: 'Ошибка сервера (500)' });
                        break;
                    default:
                        dispatch({ type: 'fetch_error', messageError: `Ошибка HTTP: ${status} ${statusText}` });
                }
            } else if (e instanceof Error) {
                dispatch( { type: 'fetch_error', messageError: `Ошибка сети или нет подключения: ${e.message}`});
            } else {
                dispatch({ type: 'fetch_error', messageError: 'Неизвестная ошибка' });
            }
        }   
    }, []);

    useEffect(() => {
        loadLaunches();
        const interval = setInterval(() => {
            loadLaunches();
            console.log('вызвалась с интервалом 10 секунд');
        }, 10000);

        return () => clearInterval(interval);
    }, [loadLaunches]);

    return (
        <ModalProvider>
            {state.status === 'error' && ( <h1 data-testid='app-error-message'>Произошла ошибка: {state.error}</h1>)}
            <LaunchesPage launches={state.launches} />
            {state.status === 'loading' && <CustomLoader />}
        </ModalProvider>
    );
}

export default App;

