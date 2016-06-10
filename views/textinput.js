exports.view = `
<TextInput style="input" value="red" changeText="textinput.changeText" submit="textinput.submit"/>
`;

exports.styles = {
  input: {
    height: 18,
    width: 345,
    left: 205,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 10
  }
};

var inputValue;

exports.submit = function(e) {
  var controller = this.props.controller;
  controller.setState({queryString: inputValue});
  controller.search();  
};

exports.changeText = function(textValue) {
  inputValue = textValue;
};
