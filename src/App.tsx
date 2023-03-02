import * as React from "react";
import {
  Typography,
  Autocomplete,
  TextField,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Container,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { z } from "zod";

const optionSchema = z.object({
  id: z.number(),
  label: z.string(),
});

type option = z.infer<typeof optionSchema>;

const options: option[] = [
  {
    id: 1,
    label: "How to deal with stress",
  },
  {
    id: 2,
    label: "How deal with anxiety",
  },
  {
    id: 3,
    label: "What is PTSD?",
  },
  {
    id: 4,
    label: "The benefits of meditation",
  },
  {
    id: 5,
    label: "What is insomnia",
  },
  {
    id: 6,
    label: "Why you shouldn't self medicate",
  },
];

const AssetList: React.FC<{ assets: option[] }> = ({ assets }) => (
  <Paper sx={{ width: "100%", marginTop: "0.5rem" }}>
    <List>
      {assets.map((asset, i) => (
        <>
          <ListItem
            disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <Delete />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemText primary={asset.label} />
            </ListItemButton>
          </ListItem>
          {i !== assets.length - 1 && <Divider />}
        </>
      ))}
    </List>
  </Paper>
);

export default function App() {
  const [option, setOption] = React.useState<option | null>(null);
  const [assets, setAssets] = React.useState<option[]>([]);

  const onSubmit = () => {
    // Add validation here
    if (option) {
      setAssets([...assets, option]);
    }
  };

  return (
    <Container>
      <Stack sx={{ width: "100%" }} direction="column" alignItems="center">
        <Typography variant="h3" gutterBottom>
          Program Assets
        </Typography>
        <Stack
          sx={{ width: "100%" }}
          direction={{
            xs: "row",
            md: "row",
          }}
          spacing={1}
          justifyContent="space-around"
        >
          <Autocomplete
            sx={{ width: "100%" }}
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Add assignment" />
            )}
            onChange={(_, value) => {
              setOption(value);
            }}
          />
          <Button onClick={onSubmit}> Add </Button>
        </Stack>
        {assets.length > 0 ? (
          <AssetList assets={assets} />
        ) : (
          <Typography
            variant="body1"
            color="gray"
            align="center"
            sx={{ marginTop: "0.75rem" }}
          >
            There are no assets in this program
          </Typography>
        )}
      </Stack>
    </Container>
  );
}
