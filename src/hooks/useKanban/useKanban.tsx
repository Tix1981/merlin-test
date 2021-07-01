import produce from 'immer';
import { useReducer } from 'react';
import { Column, Kanban, Ticket } from '../../typings/typings';

type KanbanState = {
  addingError: string;
  columns: Column[];
};

const defaultState: KanbanState = {
  addingError: '',
  columns: [
    {
      name: 'Todo',
      tickets: [
        {
          title: 'Implement dragging and dropping tickets',
          description: 'Test',
          acceptanceCriteria: 'Lorem Ipsum',
          estimate: 1.5,
        },
        {
          title: 'Implement "View Ticket" Modal',
          description: 'Test 2',
          acceptanceCriteria: 'Lorem Ipsum',
          estimate: 1.5,
        },
        {
          title: 'Implement "Create Ticket" Modal',
          description: 'Test 3',
          acceptanceCriteria: 'Lorem Ipsum',
          estimate: 1,
        },
      ],
    },
    { name: 'In Progress', tickets: [] },
    { name: 'Done', tickets: [] },
  ],
};

const reducer = produce((state: KanbanState, action) => {
  switch (action.type) {
    case 'ADD_TICKET': {
      const existingTitle = ({ title }) => {
        return title === action.ticket.title;
      };

      const existingTicket = state.columns.some(column =>
        column.tickets.some(existingTitle)
      );
      if (existingTicket) {
        state.addingError = 'Ticket with this name already exists';
        break;
      } else {
        state.addingError = '';
      }

      const col = state.columns.find(({ name }) => name === action.column);
      if (col) col.tickets.push(action.ticket);
      break;
    }
    case 'DELETE_TICKET': {
      const shouldDelete = ({ title }) => {
        return title === action.ticket;
      };

      const col = state.columns.find(c => c.tickets.some(shouldDelete));
      if (col) col.tickets = col.tickets.filter(v => !shouldDelete(v));
      break;
    }
    case 'ADD_COLUMN': {
      state.columns.push(action.column);
      break;
    }
    case 'DELETE_COLUMN': {
      const index = state.columns.findIndex(
        ({ name }) => name === action.column
      );

      if (index !== -1) state.columns.splice(index, 1);

      break;
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
});

const useKanban = (initialState = defaultState): Kanban => {
  const [{ columns, addingError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const addTicket = (ticket: Ticket, column: string) =>
    dispatch({ type: 'ADD_TICKET', column, ticket });

  const deleteTicket = (ticket: string) =>
    dispatch({ type: 'DELETE_TICKET', ticket });

  const addColumn = (column: Column) =>
    dispatch({ type: 'ADD_COLUMN', column });

  const deleteColumn = (column: string) =>
    dispatch({ type: 'DELETE_COLUMN', column });

  return {
    columns,
    addingError,
    addTicket,
    deleteTicket,
    addColumn,
    deleteColumn,
  };
};

export default useKanban;
