import { Card, Image, Text, Button, Stack } from '@mantine/core';
import { useModal } from '../../hooks/useModal';
import { type typeLaunches } from '../../types/typeLaunches';
import stub from '../../assets/stub.png'

type LaunchCardProps = {
    launch: typeLaunches;
};

export const LaunchCard = ({ launch }: LaunchCardProps) => {
    const { openModal } = useModal();

    return (
        <Card
            shadow='sm'
            radius='md'
            withBorder
            w={300}
            h={400}
            p={32}
            pb={32}
            m={0}
            data-testid ='launch-card'
        >
            <Stack h='100%' align='center' gap='md'>
                <Image
                    src={launch.links.mission_patch_small || stub}
                    alt={launch.mission_name}
                    height={140}
                    width={140}
                    fit='contain'
                    fallbackSrc={stub}
                />

                <Stack gap={24} align='center'>
                    <Text size='lg' ta='center' fw={600}>
                        {launch.mission_name}
                    </Text>
                    <Text size='lg' ta='center' fw={600} c='gray.5'>
                        {launch.rocket.rocket_name}
                    </Text>
                </Stack>

                <Button
                    mt='auto'
                    w={220}
                    h={38}
                    radius='md'
                    color='prime-blue.6'
                    onClick={() => openModal(launch)}
                >
                    See more
                </Button>
            </Stack>
        </Card>
    );
};


