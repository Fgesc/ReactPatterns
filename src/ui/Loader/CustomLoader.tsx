import { Loader, Center, Text, Stack, Box } from '@mantine/core';
import { keyframes } from '@mantine/emotion';

const bounce = keyframes({
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
});

export const CustomLoader = () => {
    return (
        <Center style={{ height: '100vh' }}>
            <Stack align="center" gap="xl">
                <Box
                    style={{
                        animation: `${bounce} 1.5s ease-in-out infinite`,
                        transform: 'scale(1.5)',
                    }}
                >
                    <Loader data-testid='custom-loader' size='xl' color='prime-blue.6' />
                </Box>
                <Text size='xl' c='fresh-green.7'>
                    Идет загрузочка...
                </Text>
            </Stack>
        </Center>
    );
};
