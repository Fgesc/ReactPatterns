import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ModalProvider } from '../providers/ModalProvider';

export function customRender(ui: React.ReactElement, options = {}) {
    const AllProviders = ({ children }: { children: React.ReactNode }) => (
        <MantineProvider>
            <ModalProvider>{children}</ModalProvider>
        </MantineProvider>
    );

    return render(ui, {
        wrapper: AllProviders,
        ...options,
    });
}
