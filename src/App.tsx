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
  Paper,
  Divider,
  ListItemIcon,
  Collapse,
  Box,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
import { z } from "zod";

const optionSchema = z.object({
  id: z.number(),
  label: z.string(),
  description: z.string(),
});

type option = z.infer<typeof optionSchema>;

const options: option[] = [
  {
    id: 1,
    label: "How to deal with stress",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    label: "How to deal with anxiety",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    label: "What is PTSD?",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    label: "The benefits of meditation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    label: "What is insomnia",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 6,
    label: "Why you shouldn't self medicate",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

type AssetItemProps = {
  asset: option;
  onDelete: (id: number) => void;
};

const AssetItem: React.FC<AssetItemProps> = ({
  asset,
  onDelete: handleDelete,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const onDelete = (id: number) => {
    setOpenDelete(false);
    handleDelete(id);
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => setOpenDelete(true)}
          >
            <Delete />
          </IconButton>
        }
      >
        <ListItemButton>
          <ListItemIcon onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary={asset.label} />
        </ListItemButton>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box sx={{ margin: "0.75rem" }}>
          <Typography variant="body1" gutterBottom align="left">
            {asset.description}
          </Typography>
        </Box>
      </Collapse>
      <Dialog open={openDelete}>
        <DialogTitle>Delete asset?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will remove the asset from the selected program
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Canel</Button>
          <Button onClick={() => onDelete(asset.id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const AssetList: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Paper sx={{ width: "100%", marginTop: "0.5rem" }}>
      <List>{children}</List>
    </Paper>
  );
};

export default function App() {
  const [option, setOption] = React.useState<option | null>(null);
  const [assets, setAssets] = React.useState<option[]>([]);

  const onDeleteAsset = (id: number) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  const onSubmit = () => {
    // Add validation here
    if (option) {
      setAssets([...assets, option]);
    }
  };

  return (
    <Container>
      <Stack sx={{ width: "100%" }} direction="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
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
          <AssetList>
            {assets.map((asset, i) => (
              <>
                <AssetItem asset={asset} onDelete={onDeleteAsset} />
                {i !== assets.length - 1 && <Divider />}
              </>
            ))}
          </AssetList>
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
