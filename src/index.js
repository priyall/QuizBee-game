import React, { Component, onTimesup, alert } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import CountDown from "./CountDown";


class QuizBee extends Component{
    state ={
        questionBank: [], //state variable
        score: 0,
        responses: 0
    };
    getQuestions = () =>{  //this function will invoke the  quizService API
        // it will populate the questionBank state variable with results
        quizService().then(question=> {
            this.setState({
                questionBank: question
            });
        });
    };
    computeAnswer = (answer, correctAnswer)=>{
        if(answer===correctAnswer){
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses <5 ? this.state.responses +1 : 5
        });
    };

    playAgain = ()=>{
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        });
    };

    onTimesup = () => {
        alert.show("Time's up!")
    };

    componentDidMount(){ //Lifecycle method
        this.getQuestions();
    }
    render(){
        return(
            <div className="container">
                <div className="title">QuizBee: Test your General Knowledge!</div>
                <div>
                <CountDown
                    onTimesup={onTimesup}
                    duration={10}
                    />
                </div>
                {this.state.questionBank.length > 0 &&  
                    this.state.responses<5 &&
                    this.state.questionBank.map(
                    ({question, answers, correct, questionId}) => (
                       <QuestionBox 
                        question= {question} 
                        options={answers} 
                        key= {questionId}
                        selected={answer => this.computeAnswer(answer,correct)}
                         />
                       //key helps react identify and correlate an instance of a component with the data it consumes
                    )
                )}

                {this.state.responses === 5 ? (
                    <Result score={this.state.score} playAgain={this.playAgain} />

                ): null}
            </div>
        );
    }
}

ReactDOM.render(<QuizBee />,document.getElementById("root"));