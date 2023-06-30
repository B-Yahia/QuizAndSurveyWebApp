import {
  Autocomplete,
  Pagination,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PublicQuizzesPage.css";
import QuizCard from "../../Comonents/PublicQuizPageComponent/QuizCard";

const options = ["4", "5", "6", , "8", "10"];
function PublicQuizzesPage() {
  const url = localStorage.getItem("url");
  const baseURL = "http://" + url + "/quiz/";

  const [eventDetails, setEventDetails] = useState([]);
  const [limitpage, setLimitPage] = useState();
  const [responseDetails, setResponseDetails] = useState();
  const [page, setPage] = useState(1);

  const [value, setValue] = useState(options[0]);

  async function getEventsWithPagination() {
    const newPage = page - 1;
    try {
      const response = await axios.get(baseURL + newPage + "/" + value);
      setResponseDetails(response.data.quizDTOList);
      setLimitPage(response.data.numberOfPages);
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
  }, [value, page]);

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
            renderInput={(params) => <TextField {...params} label="Num" />}
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
            responseDetails.map((item) => (
              <QuizCard item={item} key={item.id} />
            ))}
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={0.5}
        >
          <Link to={"/"}>
            <Button>home page</Button>
          </Link>
        </Stack>
      </Stack>
    </div>
  );
}

export default PublicQuizzesPage;
