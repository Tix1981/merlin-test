import { FC, useState, useEffect } from 'react';
import useKanbanContext from '../../hooks/useKanbanContext/useKanbanContext';
import { Kanban, Ticket } from '../../typings/typings';
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import Modal from '../../components/Modal/Modal';
import TicketInfo from '../TicketInfo/TicketInfo';
import { DragDropContext } from 'react-beautiful-dnd';

const KanbanBoard: FC<Kanban> = kanban => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ticket, setTicket] = useState<Ticket>(null);

  const { addTicket, deleteTicket } = useKanbanContext();
  const columns = kanban.columns;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const onTicketSelect = (ticket: Ticket) => {
    setIsModalOpen(true);
    setTicket(ticket);
  };

  const onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = kanban.columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tickets];
      const draggedTicket = sourceItems.find(
        (_, index) => index === source.index
      );

      deleteTicket(draggedTicket.title);
      addTicket(draggedTicket, destColumn.name);
    }
  };

  return (
    <div style={{ display: 'flex', marginTop: 20 }}>
      <DragDropContext
        onDragEnd={result => {
          onDragEnd(result, columns);
        }}
      >
        {kanban?.columns.map((col, index) => (
          <KanbanColumn
            index={index}
            key={col.name}
            column={col}
            onSelect={onTicketSelect}
          />
        ))}
        {isModalOpen && (
          <Modal title={ticket.title} onClose={() => setIsModalOpen(false)}>
            <TicketInfo ticket={ticket} />
          </Modal>
        )}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
