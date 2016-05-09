exports.view = `
<View id="productInfo" style="textContainer">
  <Text id="name" style="text" displayCondition="true">product.name</Text>
  <Text id="description" style="descriptionText" displayCondition="true">product.long_description</Text>
  <Text id="price" style="text" displayCondition="true">product.price</Text>
</View>
`;

exports.styles = {
  "textContainer": {
    "width": 370,
    "paddingTop": 10,
    "borderColor": "gray",
    "borderWidth": 1
  },
  "text": {
    "width": 345,
    "paddingLeft": 10,
    "paddingBottom": 10
  },
  "descriptionText": {
    "width": 345,
    "flexWrap": "wrap",
    "paddingLeft": 10,
    "paddingBottom": 10
  }
};
