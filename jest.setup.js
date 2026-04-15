jest.mock('@react-native-vector-icons/ionicons', () => {
  const React = require('react');

  const Ionicons = props => React.createElement('Ionicons', props, props.children);

  return { Ionicons };
});
