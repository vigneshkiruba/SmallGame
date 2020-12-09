import React from "react";

import Chessboard from "chessboardjsx";
import Chess  from "chess.js";
class chessComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data : 'start',

    chess: {},

    }
  }

  componentDidMount() {
  const chess = new Chess();


    this.setState({ chess : chess});
    }
     componentWillUnmount() {
        window.clearTimeout(this.timer());
      }


 timer = () => window.setTimeout(this.makeRandomMove, 1000);

makeRandomMove = () => {
    var {chess } = this.state;
    let possibleMoves = chess.moves();

    if (
      chess.game_over() === true ||
      chess.in_draw() === true ||
      possibleMoves.length === 0
    )
      return;

    let randomIndex = Math.floor(Math.random() * possibleMoves.length);
    chess.move(possibleMoves[randomIndex]);
    this.setState({ data: chess.fen() });

  };

handleChange = (event) => {

    var {chess } = this.state;
        chess.fen();
      console.log(event);
      console.log();
      if(chess.move({from : event.sourceSquare , to : event.targetSquare}) != null)
      {

      this.setState({data: chess.fen()});

      setTimeout(() => this.makeRandomMove(), 1000);
      }
  }
  render() {

    var {data} = this.state;

    return ( <Chessboard position ={data} onDrop={(e) => this.handleChange(e)} />);

      }
      }


export default chessComp;