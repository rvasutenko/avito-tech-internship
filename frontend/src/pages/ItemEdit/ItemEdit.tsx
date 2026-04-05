import { ROUTES_NAMES } from "@/app/router";
import { useItem } from "@/entities";
import { Grid, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound, ServerError } from "@/widgets";
import { EditItemForm } from "@/features/edit-item";

export const ItemEdit = observer(() => {
  const params = useParams();
  const nav = useNavigate();

  const id = Number(params.id);
  const { data, isLoading, isError, error } = useItem(id);

  useEffect(() => {
    if (!id) nav(ROUTES_NAMES.ADS_LIST);
  }, [id]);

  if (isError && error?.status === 404) return <NotFound />;

  if (isError && error?.status === 500) return <ServerError />;

  return (
    <Grid columnGap={40} rowGap="xl">
      <Grid.Col span={12}>
        <Title order={2}>Редактирование объявления</Title>
      </Grid.Col>
      <Grid.Col span={6}>
        <EditItemForm data={data!} isLoading={isLoading} />
      </Grid.Col>
    </Grid>
  );
});
