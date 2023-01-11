import { Button, FormControlLabel, FormGroup, Grid, Stack, Switch, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import'../CommunCss.css'
import'./QuizCreationPage.css'

function QuizCreationPage() {
    const baseURL = "http://localhost:8080/quiz/create/1";


    const [title,setTitle]=useState("")
    const [desq,setDesq]=useState("")
    const [quizStatus,setQuizStatus]=useState(true)
    const [questionsList,setQuestionsList]=useState([])
    const [questionStatement,setQuestionStatement]=useState("")
    const [answer,setAnswer]=useState("")
    const [answersList,setAnswersList]=useState([])
    const [question,setQuestion]=useState({
        questionStatement:"",
        answers:[],
    })
    const [errorMsg,setErrorMsg]=useState("")

    const addAnswerToList = (e)=>{
        e.preventDefault();
        const newAnswer = {
            answerStatement:answer
        }
        answersList.push(newAnswer)
        setAnswer("")
        
    }


    const addQuestionToList= e => {
        e.preventDefault();
        setErrorMsg("")
        if(answersList.length>=2){
       
        const newQuestion= {
            questionStatement:questionStatement,
            answers:answersList,
        }
        questionsList.push(newQuestion)
        console.log(questionsList)
        setQuestionStatement("")
        setAnswer("")
        setAnswersList([])
        }else{
            setErrorMsg("The question can not have less than two answers")
        }   
    }


    const handleChange = (e) =>{
        e.preventDefault();
        setQuizStatus(!quizStatus)
    }

    const saveQuiz = async (e)=>{
        e.preventDefault();
        if(questionsList.length>=2){
        const quiz = {
            quizTitle:title,
            quizDescription:desq,
            questions:questionsList,
            privateStatus:quizStatus,
        }
        console.log(quiz)
        await axios.post(baseURL,quiz).
        then(function (response){
            setErrorMsg("it worked")
            console.log(response)
            setAnswer("")
            setAnswersList([])
            setDesq("")
            setQuestion({
                questionStatement:"",
                answers:[],
            })
            setQuestionStatement("")
            setTitle("")
            setQuestionsList([])
            
                     
        }).
        catch(function (error) {
            console.log(error)
            setErrorMsg("something  went wrong")
        })
        }else{
            setErrorMsg("The quiz can not have les than two questions")
        }    
    }

    const newAnswersList = answersList.map((an,index)=>
        <div key={index}>{an.answerStatement }</div>
        )

    const createdQuestions = questionsList.map((q,index)=>

    <div>
        <div key={index}>The question is : {q.questionStatement}</div>
        <div>{q.answers.map((a,answerIndex)=>
            <div key={answerIndex}>-{a.answerStatement}</div>
        )}</div>

    </div>   
        
    )
  return (
    <div>
        <Grid className='section-container' 
        direction="column"
        container>
            <Grid item >
                <Stack justifyContent="space-evenly" direction="row"><div  className='' >Create your quiz</div> <Button>Go to home page</Button></Stack>
                
            </Grid>
            <Grid item>
                <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                >
                <Stack direction="column" spacing={2}  className='small-section'>
                    <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(event)=>{setTitle(event.target.value)}} value={title} />
                    <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(event)=>{setDesq(event.target.value)}} value={desq} multiline minRows={2} />
                    <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked  onChange={handleChange} />} label="Is the quiz privat"  labelPlacement="start"/>
                    </FormGroup>
                    <Button onClick={saveQuiz}> Save Quiz</Button>
                    
                </Stack >
                <Stack direction="column" spacing={2}  className='small-section'>
                    <div>{errorMsg}</div>
                    <TextField id="outlined-basic" label="Questtion Statement" variant="outlined" onChange={(event)=>{setQuestionStatement(event.target.value)}} value={questionStatement} />
                    <Button onClick={addQuestionToList}>add question to the list</Button>
                    {answersList.length===0 ? <div>Add the correct answer firest</div> : newAnswersList}
                    <TextField id="outlined-basic" label="Answer " variant="outlined" onChange={(event)=>{setAnswer(event.target.value)}} value={answer}  />
                    <Button onClick={addAnswerToList}>add question to the list</Button>
                </Stack >
                <Stack direction="column" spacing={2}  className='small-section'>
                    {questionsList.length==0 ? <div>No question created yet</div> : createdQuestions }
                </Stack>
                </Stack>
            </Grid>
        </Grid>
    </div>
  )
}

export default QuizCreationPage