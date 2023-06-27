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
<<<<<<< HEAD
  const url = localStorage.getItem("url");
  const baseURL = "http://" + url + "/quiz/all";
=======
  // const baseURL = "http://quizsurveyapp-production.up.railway.app/quiz/all";
  const baseURL = "http://localhost:8080/quiz/all-quizzes";
>>>>>>> 9994fe8761269c59ad06e33bf52bcc05b5a4ea2b
  const [eventDetails, setEventDetails] = useState([]);
  const [limitpage, setLimitPage] = useState();
  const [responseDetails, setResponseDetails] = useState();
  const [page, setPage] = useState(1);
<<<<<<< HEAD
  const paginationURL = "http://" + url + "/quiz/pagination/";
=======
  // const paginationURL =
  //   "http://quizsurveyapp-production.up.railway.app/quiz/pagination/";
  const paginationURL = "http://localhost:3000/all-quizzes/page"
>>>>>>> 9994fe8761269c59ad06e33bf52bcc05b5a4ea2b
  const [value, setValue] = useState(options[0]);

  async function getEventsWithPagination() {
    const newPage = page;
    const pagination = paginationURL +  "/" + newPage + "/show" + "/4";
    console.log(pagination);
    try {
      const response = await axios.get(paginationURL + "/" + newPage + "/show" + "/" + value);
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
