import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import '../App.css';

export default function Nav({ categories, onClick }) {
  const to = category => (
    category.id === '1'
      ? '/all'
      : `/category/${category.id}`
  );

  return (
    <div className="App">
      <List style={{ width: 240 }}>
        {categories.map(category => (
          <ListItem
            button
            key={`nav-item-${category.id}`}
            onClick={() => onClick(to(category))}
          >
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

Nav.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired
};