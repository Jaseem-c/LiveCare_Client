import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container } from '@mui/material';
import Table from 'react-bootstrap/Table';
import { getAllAttendanceApi } from '../../Services/allApi';
import Pagination from "@mui/material/Pagination";
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import the locale you need
import localizedFormat from 'dayjs/plugin/localizedFormat'; // Import the plugin for localized formats
import UserAside from './UserAside';

dayjs.locale('en'); // Set default locale
dayjs.extend(localizedFormat); // Extend dayjs with the localizedFormat plugin

function ServiceAttendance() {
  // State variables
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const dateFormat = 'DD-MM-YYYY';

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getAttendance = async () => {
    try {
      const result = await getAllAttendanceApi();
      setAttendance(result.data?.AllAttendence);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const formattedDate = selectedDate ? dayjs(selectedDate).format(dateFormat) : null;

  const filteredAttendance = selectedDate
    ? attendance.filter(
      (entry) =>
        dayjs(entry.date, dateFormat).format(dateFormat) === formattedDate
    )
    : [];

  return (
    <div style={{display:"flex"}}>
      <UserAside/>
    <Container>
      <h1 className='mt-5 text-center' style={{ color: "#B08968" }} >Service Provider Attendance</h1>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DatePicker',
            'TimePicker',
            'DateTimePicker',
            'DateRangePicker',
          ]}
        >
          <DemoItem label="Choose Date">
            <DatePicker
              onChange={handleDateChange}
              placeholder={dateFormat.toUpperCase()}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>

      {selectedDate && filteredAttendance.length > 0 && (
        <div className='mt-5 text-center'>
          <Table bordered style={{ border: "1px solid black" }}>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>E-mail</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Working Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.serviceProviderEmail}</td>
                    <td>{entry.time_in}</td>
                    <td>{entry.time_out}</td>
                    <td>{entry.working_hours}</td>
                    <td>{entry.present?"PRESENT":"🔴"}</td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <Stack spacing={2} className="text-center mt-3">
            <Pagination
              count={Math.ceil(filteredAttendance.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
              style={{ color: "#B08968" }}
            />
          </Stack>
        </div>
      )}

      {selectedDate && filteredAttendance.length === 0 && (
        <div className="mt-5 text-center">
          <p>No attendance available for {formattedDate}</p>
        </div>
      )}
    </Container>
    </div>
  );
}

export default ServiceAttendance;
