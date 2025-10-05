import { describe, it, expect, beforeAll } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { customRender } from '../../test/utils';
import App from './App';

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

describe('App Component', () => {

    beforeEach(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(modalRoot);
    });

    afterEach(() => {
        const modalRoot = document.getElementById('modal-root');
        if (modalRoot) document.body.removeChild(modalRoot);
    });

    it('Должен отрендерить компонент App', async () => {
        customRender(<App />);

        const title = await screen.findByText(/SpaceX Launches 2020/i);
        expect(title).toBeInTheDocument();
    });

    it('Должен показывать и скрывать лоадер при загрузке', async () => {
        customRender(<App />);
        expect(screen.getByTestId('custom-loader')).toBeInTheDocument();

        const page = await screen.findByTestId('launches-page');
        expect(page).toBeInTheDocument();

        expect(screen.queryByTestId('custom-loader')).not.toBeInTheDocument();
    });


    it('Должен отрендерить список карточек', async () => {
        customRender(<App />);
        const page = await screen.findByTestId('launches-page');
        expect(page).toBeInTheDocument();
    });

    it('Должен открыть модальное окно при нажатии на кнопку карточки', async () => {
        customRender(<App />);

        const page = await screen.findByTestId('launches-page');
        expect(page).toBeInTheDocument();

        const cards = await screen.findAllByTestId('launch-card');
        expect(cards.length).toBeGreaterThan(0);

        const firstCard = cards[0];
        await userEvent.click(within(firstCard).getByRole('button', { name: /see more/i }));

        const modal = await screen.findByTestId('modalLaunch');
        expect(modal).toBeInTheDocument();
        expect(screen.getByText(/mission name/i)).toBeInTheDocument();

    });

    it('Должен закрыть модальное окно при нажатии на крестик внутри модального окна', async () => {
        customRender(<App />);

        const page = await screen.findByTestId('launches-page');
        expect(page).toBeInTheDocument();
    
        const cards = await screen.findAllByTestId('launch-card');
        expect(cards.length).toBeGreaterThan(0);

        const firstCard = cards[0];
        const button = within(firstCard).getByRole('button', { name: /see more/i });
        await userEvent.click(button);

        const modal = await screen.findByTestId('modalLaunch');
        expect(modal).toBeInTheDocument();

        const closeButton = screen.getByTestId('closeButtonModal');
        await userEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByTestId('modalLaunch')).not.toBeInTheDocument();
        });
    });

    it('Должен отображать сообщение об ошибке, если загрузка списка карточек завершилась неудачей', async () => {
        server.use(
            http.get('https://api.spacexdata.com/v3/launches*', () => {
            return HttpResponse.error();
            })
        );

        customRender(<App />);

        const errorMessage = await screen.findByTestId('app-error-message');

        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent(/Произошла ошибка:/);
        expect(screen.queryByTestId('custom-loader')).not.toBeInTheDocument();

    });

});