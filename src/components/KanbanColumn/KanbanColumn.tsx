import React, { FC, useState, useEffect } from 'react';
import useKanbanContext from '../../hooks/useKanbanContext/useKanbanContext';
import { Column } from '../../typings/typings';
import AddIcon from '../icons/AddIcon';
import DeleteIcon from '../icons/DeleteIcon';
import KanbanTicket from '../KanbanTicket/KanbanTicket';
import styles from './kanbanColumn.module.css';
import Modal from '../../components/Modal/Modal';
import TicketForm from '../TicketForm/TicketForm';
import { Droppable } from 'react-beautiful-dnd';

const KanbanColumn: FC<{
  column: Column;
  onSelect: (Ticket) => void;
  index: number;
}> = ({ column, onSelect, index }) => {
  const { deleteColumn, addTicket, addingError } = useKanbanContext();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onHandleSubmit = ticket => {
    addTicket(ticket, column.name);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!addingError) {
      setIsModalOpen(false);
    }
  }, [column, addingError]);

  return (
    <>
      <Droppable droppableId={`${index}`} key={index}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.column}
          >
            <div className={styles['column--title']}>
              {column.name}
              <div>
                <AddIcon
                  className={styles['icon-button']}
                  onClick={() => setIsModalOpen(true)}
                />
                <DeleteIcon
                  className={styles['icon-button']}
                  onClick={() => deleteColumn(column.name)}
                />
              </div>
            </div>
            {column.tickets.map((ticket, index) => (
              <KanbanTicket
                index={index}
                key={ticket.title}
                ticket={ticket}
                onClick={() => onSelect(ticket)}
              />
            ))}
          </div>
        )}
      </Droppable>
      {isModalOpen && (
        <Modal title='Create a ticket' onClose={() => setIsModalOpen(false)}>
          <TicketForm onHandleSubmit={onHandleSubmit} />
        </Modal>
      )}
    </>
  );
};

export default KanbanColumn;
