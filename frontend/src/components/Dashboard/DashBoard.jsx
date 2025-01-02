import { Box, Typography, Button, TextField, InputAdornment    } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './sideBar/Sidebar';
import { useNavigate } from 'react-router-dom';
import EventList from '../../admin/eventList/EventList';

const Dashboard = () => {
  const Send = useNavigate()
const Sender = ()=>{
  Send('/create')
}
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: 250, height: '100vh', backgroundColor: '#f4f4f4', padding: 2 }}>
        <Sidebar />
      </Box>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search events..."
            size="small"
            sx={{ flexGrow: 1, marginRight: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" onClick={Sender}>
            Add Event
          </Button>
        </Box>
        <EventList/>
      </Box>
    </Box>
  );
};

export default Dashboard;
