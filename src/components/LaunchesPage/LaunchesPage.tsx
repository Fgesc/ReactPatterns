import { memo } from 'react';
import { Container, Grid, Title } from '@mantine/core';
import { LaunchCard } from '../LaunchCard/LaunchCard';
import type { typeLaunches } from '../../types/typeLaunches';

type LaunchesListProp = {
    launches: Array<typeLaunches>;
};

export const LaunchesPage = memo(({ launches }: LaunchesListProp) => {
    return (
        <main data-testid='main-content' style={{ padding: '16px' }}>
            <Container size='lg' px='md'>

                <Title order={1} ta='center' mb='md' fw={900}>
                    SpaceX Launches 2020
                </Title>

                <Grid
                    data-testid='products-grid'
                    gutter = {24}
                    style={{ maxWidth: '968px', margin: '0 auto' }}
                >
                    {launches.map(launch => (
                        <Grid.Col
                            key={launch.mission_name}
                            span={{
                                base: 12,
                                xs: 6,
                                sm: 6,
                                md: 4,
                                lg: 4,
                            }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <LaunchCard launch={launch} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </main>
    );
});
