import { launchesResponse } from '../../mocks/response';
import { LaunchesPage } from './LaunchesPage';
import { customRender } from '../../test/utils';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
});

describe('LaunchesPage Component', () => {
    it('Должен отрендерить компонент LaunchesPage', async () => {
        customRender(<LaunchesPage launches={launchesResponse} />);

        const title = await screen.findByText(/SpaceX Launches 2020/i);
        expect(title).toBeInTheDocument();
    });

    it('Должен отрисовать сетку с правильным количеством карточек запусков, когда список не пуст', async () => {
        const testLaunches = [launchesResponse[0], launchesResponse[1], launchesResponse[2]];
        const expectedLength = testLaunches.length;

        customRender(<LaunchesPage launches={testLaunches} />);

        const page = await screen.findByTestId('launches-page');
        expect(page).toBeInTheDocument();

        const grid = screen.getByTestId('launches-grid');
        expect(grid).toBeInTheDocument();

        const launchCards = screen.getAllByTestId('launch-card');
        expect(launchCards).toHaveLength(expectedLength);

        testLaunches.forEach(launch => {
            expect(screen.getByText(launch.mission_name)).toBeInTheDocument();
        });
    });

    it('Должен отрисовать все карточки запусков, когда передан полный список', async () => {
        const allLaunches = launchesResponse;
        const expectedLength = allLaunches.length;

        customRender(<LaunchesPage launches={allLaunches} />);

        const page = await screen.findByTestId('launches-page');
        expect(page).toBeInTheDocument();

        const grid = screen.getByTestId('launches-grid');
        expect(grid).toBeInTheDocument();

        const launchCards = screen.getAllByTestId('launch-card');
        expect(launchCards).toHaveLength(expectedLength);

        const firstLaunch = allLaunches[0];
        const lastLaunch = allLaunches[allLaunches.length - 1];

        expect(screen.getByText(firstLaunch.mission_name)).toBeInTheDocument();
        expect(screen.getByText(lastLaunch.mission_name)).toBeInTheDocument();
    });
});
