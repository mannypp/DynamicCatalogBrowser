exports.view = `
<View id="buttons" style="buttonContainer">
  <Button id="prevButton" style="prevButton" textStyle="buttonText" handler="buttons.prevButtonClicked">Prev</Button>
  <Button id="nextButton" style="nextButton" textStyle="buttonText" handler="buttons.nextButtonClicked">Next</Button>
</View>
`;

exports.styles = {
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'green',
    borderWidth: 1
  },
  button: {
  },
  prevButton: {
  },
  nextButton: {
    paddingLeft: 30
  },
  buttonText: {
  }  
};

exports.nextButtonClicked = function(e) {
  var controller = this.props.controller;

  if (controller.state.cursor < controller.state.results.count) {
    controller.state.cursor++;
    controller.loadProduct(controller.state.results.hits[controller.state.cursor].product_id);
  }
};

exports.prevButtonClicked = function(e) {
  var controller = this.props.controller;
  
  if (controller.state.cursor > 0) {
    controller.state.cursor--;
    controller.loadProduct(controller.state.results.hits[controller.state.cursor].product_id);
  }
};
