import './MemoryCard.css'
import React from 'react';

class MemoryCard extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         isFlipped: false
    //     }
    // }
    // clickHandler = () => {
    //     this.setState({
    //         isFlipped: !this.state.isFlipped
    //     })
    // }
    render() {
        const innerClass = "MemoryCard__inner"
        return (
            <div onClick={this.props.clickHandler} className="MemoryCard">
                <div className={!this.props.isFlipped ? {innerClass} : 'MemoryCard__inner flipped'}>
                    <div className="MemoryCard__back">
                        <img src="https://www.digitalcrafts.com/img/logo-wrench-white.png" alt="DigitalCrafts logo" width="80px"></img>
                    </div>
                    <div className="MemoryCard__front">{this.props.symbol}</div>
                </div>
            </div>
        )
    }
}

export default MemoryCard;