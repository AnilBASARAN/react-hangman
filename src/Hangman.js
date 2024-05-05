import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import img7 from "./7.png";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6,img7],
    words : [
      "Apple","Banana","Carrot","Dolphin","Elephant","Flamingo","Giraffe","Hammer","Igloo","Jaguar",
      "Kangaroo","Lemon","Monkey","Notebook","Octopus","Penguin","Quilt","Rainbow","Strawberry","Turtle",
      "Umbrella","Violin","Watermelon","Xylophone","Yak","Zebra","Pizza","Guitar","Robot","Dragon",
      "Spider","Unicorn","Lion","Tiger","Wolf","Moon","Sun","Star","House","Cat","Dog","Mouse","Fish",
      "Bird","Bear","Rabbit","Horse","Cow","Pig","Sheep"
  ]
  };

  constructor(props) {
    super(props);

    this.state = { 
      nWrong: 0,
      nRight: 0,
      guessed: new Set(),
      answer: this.props.words[Math.floor(Math.random()*this.props.words.length)].toLowerCase(),
      isGameOn : true
      };
   
    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */

  guessedWord() {
    return this.state.answer.split("").map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
/*   handleGuess(evt) {

    let current;
  if(this.state.nWrong > this.props.maxWrong || this.state.nRight === Array.from([...new Set(this.state.answer)]).length){
    current = false;
   }else{
    current = true;
  }
    let ltr = evt.target.value;
    this.setState({
      guessed: this.state.guessed.add(ltr),
      nWrong : this.state.nWrong + (this.state.answer.includes(ltr) ? 0 : 1),
      nRight : this.state.nRight + (this.state.answer.includes(ltr) ? 1 : 0),
      isGameOn : current
    });
    
  } */


  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState({
      guessed: this.state.guessed.add(ltr),
      nWrong: this.state.nWrong + (this.state.answer.includes(ltr) ? 0 : 1),
      nRight: this.state.nRight + (this.state.answer.includes(ltr) ? 1 : 0),
    }, () => {
      this.checkStatus(); // Call checkStatus after setState is completed
    });
  }
  

  checkStatus(){
    let current = true;
    if (this.state.nWrong === this.props.maxWrong || this.state.nRight === Array.from([...new Set(this.state.answer)]).length) {
      current = false;
      setTimeout(() => {
        this.resetGame(); // Call resetGame after 2 seconds
      }, 2000);
    }
      this.setState({isGameOn : current})
}
  




   /** resetGame: reset the game */
   resetGame() {
    this.setState({
      nWrong: 0,
      nRight: 0,
      guessed: new Set(),
      answer: this.props.words[Math.floor(Math.random() * this.props.words.length)].toLowerCase(),
      isGameOn : true
    });
  }



  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key = {ltr}
        value = {ltr}
        onClick = {this.handleGuess}
        disabled = {this.state.guessed.has(ltr) || !this.state.isGameOn } 
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        
        <img src={this.props.images[this.state.nWrong]} />
       <p>Answer is: {this.state.answer}</p>
       <p className="Hangman-won" >{(this.state.nRight === Array.from([...new Set(this.state.answer)]).length) && `YOU WON`}</p>
        <p className="Hangman-lost" >{(this.state.nWrong === this.props.maxWrong) && `YOU LOST`}</p>
        <p className="Hangman-wrong-time" >{(this.state.nWrong > this.props.maxWrong)? `Answer was :${this.state.answer}` : `Guesses Remaining : ${this.props.maxWrong - this.state.nWrong}` }  </p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>{this.generateButtons()}</p>
        <div>
         <button id="Hangman-reset-button" onClick={this.resetGame}>Reset Game</button>
        </div>
      </div>
    );
  }
}

export default Hangman;
