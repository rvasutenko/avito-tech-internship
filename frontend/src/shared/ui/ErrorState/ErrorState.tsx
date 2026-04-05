import { Button, Center, Stack, Text, Title } from "@mantine/core";

type ErrorStateProps = {
  icon: React.ReactNode;
  title: string;
  message: React.ReactNode;
  actionText: string;
  onClick: () => void;
};

export const ErrorState = ({
  icon,
  title,
  message,
  actionText,
  onClick,
}: ErrorStateProps) => {
  return (
    <Center style={{ height: "100%" }}>
      <Stack align="center" gap={4}>
        {icon}
        <Title order={3} fw={500} mt={4}>
          {title}
        </Title>
        <Text ta={"center"} lh={"xs"}>
          {message}
        </Text>
        <Button variant="subtle" color="gray" onClick={onClick} mt={8}>
          {actionText}
        </Button>
      </Stack>
    </Center>
  );
};
