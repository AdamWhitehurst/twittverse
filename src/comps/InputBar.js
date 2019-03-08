import React, { Component } from "react";
import {
  VerticalGroup,
  HorizontalGroup,
  MiniButton,
  ButtonText,
  Input
} from "./TweetCardParts";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, Menu, MenuItem } from "@material-ui/core";

const styles = theme => ({
  headerButton: {
    WebkitAppRegion: "no-drag",
    margin: 0,
    padding: 0
  },
  headerText: {
    fontWeight: "bold",
    color: theme.palette.primary.dark
  },
  inputBar: {
    paddingRight: theme.spacing.unit * 3
  }
});

const counts = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

class InputBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      selectedIndex: 0,
      enchorEl: null
    };

    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickListItem(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuItemClick(event, index) {
    this.setState({ selectedIndex: index, anchorEl: null });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { onComplete, classes } = this.props;
    const { anchorEl, selectedIndex } = this.state;
    const menuText = "SELECT " + counts[selectedIndex] + " TWEETS";
    return (
      <VerticalGroup>
        <HorizontalGroup>
          <Input
            className={classes.inputBar}
            onChange={event => {
              this.setState({ input: event.target.value });
            }}
          />
        </HorizontalGroup>
        <HorizontalGroup>
          <List component="nav">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="count-menu"
              onClick={this.handleClickListItem}
            >
              <ButtonText>{menuText}</ButtonText>
            </ListItem>
          </List>
          <Menu
            id="count-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {counts.map((count, i) => (
              <MenuItem
                key={count}
                selected={i === selectedIndex}
                onClick={event => this.handleMenuItemClick(event, i)}
              >
                {count}
              </MenuItem>
            ))}
          </Menu>
          <MiniButton
            onClick={() => {
              const { input, selectedIndex } = this.state;
              if (!input || input === "") return;
              onComplete(input, counts[selectedIndex]);
            }}
          >
            <ButtonText>SEARCH</ButtonText>
          </MiniButton>
        </HorizontalGroup>
      </VerticalGroup>
    );
  }
}

export default withStyles(styles)(InputBar);
