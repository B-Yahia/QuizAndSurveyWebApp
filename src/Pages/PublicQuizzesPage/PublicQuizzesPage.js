import {
  Autocomplete,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PublicQuizzesPage.css";
import QuizCard from "../../Comonents/PublicQuizPageComponent/QuizCard";

const options = [4, 5, 6, , 8, 10];
function PublicQuizzesPage() {
  const baseURL = "http://localhost:8080/quiz/all";
  const [eventDetails, setEventDetails] = useState([]);
  const [limitpage, setLimitPage] = useState();
  const [responseDetails, setResponseDetails] = useState();
  const [page, setPage] = useState(1);
  const paginationURL = "http://localhost:8080/quiz/pagination/";
  const [value, setValue] = useState(options[0]);

  async function getEventsWithPagination() {
    const newPage = page - 1;
    const pagination = paginationURL + newPage + "/4";
    console.log(pagination);
    try {
      const response = await axios.get(paginationURL + newPage + "/" + value);
      setResponseDetails(response.data);

      setLimitPage(response.data.totalPages);
      console.log(limitpage);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    getEventsWithPagination();
  }, [value]);

  return (
    <div>
      <Stack
        className="section-container"
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        spacing={2}
      >
        <div className="page-title"> List of the available quizzes</div>
        <Stack
          direction="row-reverse"
          justifyContent="space-around"
          alignItems="center"
        >
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            id="controllable-states-demo"
            options={options}
            size="small"
            sx={{ width: 100 }}
            renderInput={(params) => (
              <TextField {...params} label="Number of quizzes per page" />
            )}
          />

          {!!limitpage && (
            <Pagination count={limitpage} page={page} onChange={handleChange} />
          )}
        </Stack>

        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          spacing={3}
        >
          {!!responseDetails &&
            responseDetails.content.map((item) => (
              <QuizCard item={item} key={item.id} />
            ))}
        </Stack>
      </Stack>
    </div>
  );
}

export default PublicQuizzesPage;
