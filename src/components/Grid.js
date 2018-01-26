import styled from 'styled-components';

const gridColumns = columns => {
  switch (typeof columns) {
    case 'number':
      return `repeat(${columns}, 1fr)`;

    case 'string':
      return columns;

    default:
      return '1fr';
  }
};

const Grid = styled.div`
  display: grid;

  grid-template-columns: ${props => gridColumns(props.columns)};
`;

export const GridItem = styled.div`
  ${props => `
    ${
      props.row
        ? `
  grid-row: ${props.row};`
        : ''
    }
      
      ${
        props.column
          ? `
  grid-column: ${props.column};`
          : ''
      }
      `};
`;

export default Grid;
