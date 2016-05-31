exports.view = `
<View id="buttons" style="buttonContainer">
  <Button id="addToCartButton" style="button" textStyle="buttonText" handler="addToCart.addToCartButtonClicked"
          displayCondition="feature-present:cart">Add To Cart</Button>
</View>
`;

exports.styles = {
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
  },
  buttonText: {
    color: 'blue'
  }  
};

exports.addToCartButtonClicked = function(e) {

};

