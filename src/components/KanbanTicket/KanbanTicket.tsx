import React, { FC } from 'react';
import useKanbanContext from '../../hooks/useKanbanContext/useKanbanContext';
import { Ticket } from '../../typings/typings';
import DeleteIcon from '../icons/DeleteIcon';
import styles from './kanbanTicket.module.css';
import { Draggable } from 'react-beautiful-dnd';

const KanbanTicket: FC<{ ticket: Ticket; onClick: () => void; index: number }> =
  ({ ticket, onClick, index }) => {
    const { deleteTicket } = useKanbanContext();

    return (
      <Draggable draggableId={`${index}`} key={index} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style }}
          >
            <div className={styles.ticket}>
              <div className={styles['ticket--title']}>
                <a onClick={() => onClick()}>{ticket.title}</a>
                <DeleteIcon
                  onClick={() => deleteTicket(ticket.title)}
                  className={styles['icon-button']}
                />
              </div>
              <div className={styles['ticket--estimate']}>
                Story Points: {ticket.estimate}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

export default KanbanTicket;
