import { Title, Text, Center, Stack } from '@mantine/core';

export type ErrorObject = {
    errorTitle?: string,
    errorMessage?: string,
};

export function MembersError({ errorTitle, errorMessage }: ErrorObject)
{
    return (
        <Center className="h-full text-center">
            <div className="flex flex-col gap-3">
                <Title className="text-4xl text-red-500">
                    {errorTitle}
                </Title>
                <Text className="text-xl text-slate-200">{errorMessage}</Text>
            </div>
        </Center>
    );
}