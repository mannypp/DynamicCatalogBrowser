exports.view = `
<View id="buttons">
  <Button id="firstButton" style="firstButton" textStyle="redButtonText" handler="buttons.firstButtonClicked">First</Button>
  <Button id="lastButton" style="lastButton" textStyle="redButtonText" handler="buttons.lastButtonClicked">Last</Button>
</View>
`;

exports.styles = {
  firstButton: {
    paddingLeft: 30
  },
  lastButton: {
    paddingLeft: 30
  },
  redButtonText: {
    color: "red"
  }  
};

exports.firstButtonClicked = function(e) {
  var controller = this.props.controller;
  controller.state.cursor = 0;
  controller.loadProduct(controller.state.results.hits[controller.state.cursor].product_id);
};

exports.lastButtonClicked = function(e) {
  var controller = this.props.controller;  
  controller.state.cursor = controller.state.results.count - 1;
  controller.loadProduct(controller.state.results.hits[controller.state.cursor].product_id);
};
