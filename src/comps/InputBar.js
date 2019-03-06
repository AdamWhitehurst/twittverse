import React, { Component } from "react";
import {
  VerticalGroup,
  HorizontalGroup,
  MiniButton,
  ButtonText,
  Input
} from "./TweetCardParts";

export default class InputBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  render() {
    const { onComplete } = this.props;
    return (
      <VerticalGroup>
        <HorizontalGroup>
          <Input
            onChange={event => {
              this.setState({ input: event.target.value });
            }}
          />
          <MiniButton
            onClick={() => {
              if (!this.state.input || this.state.input === "") return;
              console.log("SearchBar", this.state.input);
              onComplete(this.state.input, 10);
            }}
          >
            <ButtonText>Go</ButtonText>
          </MiniButton>
        </HorizontalGroup>
      </VerticalGroup>
    );
  }
}
