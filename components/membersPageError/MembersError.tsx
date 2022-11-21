import { Title, Text, Center, Stack } from '@mantine/core';

export type ErrorObject = {
    errorTitle?: string,
    errorMessage?: string,
};

export function MembersError({ errorTitle, errorMessage }: ErrorObject)
{
    return (
        <Center style={{ height: "100%", textAlign: 'center' }}>
            <div>
                <Stack>
                    <Title order={1} color={'red.7'}>
                        {errorTitle}
                    </Title>
                    <Text size="md">{errorMessage}</Text>
                </Stack>
            </div>
        </Center>
    );
}