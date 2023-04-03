import { ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [page, setPage] = useState<number>(1);
  const [currentList, setCurrentList] = useState<Startup[]>([]);

  useEffect(() => {
    async function fetchData() {
      const startups = await StartupHttpService.getStartups();
      // console.log(startups);
      setStartups(startups);
      setCurrentList(startups.slice(0, 20));
    }

    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setCurrentList(startups.slice((value - 1) * 20, value * 20));
  };

  return (
    <div>
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={startups.length / 20} page={page} onChange={handleChange} />
      </Stack>
      <List>
        {currentList.map((el) => (
          <ListItem key={el.id}>
            <ListItemText primary={el.name} secondary={el.shortDescription} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
