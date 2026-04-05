import { ROUTES_NAMES } from "@/app/router";
import {
  ItemDescription,
  ItemGallery,
  ItemHeader,
  ItemParameters,
  useItem,
} from "@/entities";
import { Grid } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound, ServerError } from "@/widgets";
import { NeedsRevision } from "./ui/NeedsRevision";

export const Item = observer(() => {
  const params = useParams();
  const nav = useNavigate();

  const id = Number(params.id);
  const { data, isLoading, isError, error } = useItem(id);

  useEffect(() => {
    if (!id) nav(ROUTES_NAMES.ADS_LIST);
  }, [id]);

  const handleEditClick = () =>
    nav(ROUTES_NAMES.AD_EDIT.replace(":id", String(id)));

  const handleBackClick = () => nav(ROUTES_NAMES.ADS_LIST);

  if (isError && error?.status === 404) return <NotFound />;

  if (isError && error?.status === 500) return <ServerError />;

  return (
    <Grid columnGap={40} rowGap="xl">
      <Grid.Col span={12}>
        <ItemHeader
          data={data!}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onBack={handleBackClick}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <ItemGallery isLoading={isLoading} />
      </Grid.Col>
      <Grid.Col span={8}>
        {data?.needsRevision && <NeedsRevision data={data} />}
        <ItemParameters
          category={data?.category!}
          params={data?.params!}
          isLoading={isLoading}
        />
      </Grid.Col>
      <ItemDescription description={data?.description} />
    </Grid>
  );
});
