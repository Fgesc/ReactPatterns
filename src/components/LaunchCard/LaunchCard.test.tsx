import { screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { customRender } from '../../test/utils';
import { LaunchCard } from './LaunchCard';
import type { typeLaunches } from '../../types/typeLaunches';

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

const mockLaunch: typeLaunches = {
    mission_name: 'FalconSat',
    rocket: { rocket_name: 'Falcon 1' },
    links: {
        mission_patch: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
        mission_patch_small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
    },
    details: 'Engine failure at 33 seconds and loss of vehicle',
};

describe('LaunchCard Component (UI)', () => {
    it('должен корректно отрисовать карточку запуска', () => {
        customRender(<LaunchCard launch={mockLaunch} />);
        const card = screen.getByTestId('launch-card');
        expect(card).toBeInTheDocument();
    });

    it('должен корректно отрисовать изображение миссии', () => {
        customRender(<LaunchCard launch={mockLaunch} />);
        const image = screen.getByRole('img', { name: mockLaunch.mission_name });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockLaunch.links.mission_patch_small);
        expect(image).toHaveAttribute('alt', mockLaunch.mission_name);
    });

    it('должен корректно отрисовать название миссии', () => {
        customRender(<LaunchCard launch={mockLaunch} />);
        expect(screen.getByText(mockLaunch.mission_name)).toBeInTheDocument();
    });

    it('должен корректно отрисовать название ракеты', () => {
        customRender(<LaunchCard launch={mockLaunch} />);
        expect(screen.getByText(mockLaunch.rocket.rocket_name)).toBeInTheDocument();
    });

    it('должен корректно отрисовать кнопку "See more"', () => {
        customRender(<LaunchCard launch={mockLaunch} />);
        const button = screen.getByRole('button', { name: /see more/i });
        expect(button).toBeInTheDocument();
    });
});

