import React, { FC, useState } from 'react';
import styles from './ticketForm.module.css';
import { Ticket } from '../../typings/typings';
import useKanbanContext from '../../hooks/useKanbanContext/useKanbanContext';

const TicketForm: FC<{ onHandleSubmit: (ticket: object) => void }> = ({
  onHandleSubmit,
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string>('');
  const [estimate, setEstimate] = useState<number>(0);
  const { addingError } = useKanbanContext();

  const handleSubmit = () => {
    const ticket: Ticket = {
      title,
      description,
      acceptanceCriteria,
      estimate,
    };

    onHandleSubmit(ticket);
  };

  return (
    <div>
      <input
        className={styles.input}
        name='title'
        type='text'
        placeholder='Enter ticket title'
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className={styles.input}
        name='description'
        type='text'
        placeholder='Enter ticket description'
        onChange={e => setDescription(e.target.value)}
      />
      <input
        className={styles.input}
        name='acceptanceCriteria'
        type='text'
        placeholder='Enter ticket acceptance criteria'
        onChange={e => setAcceptanceCriteria(e.target.value)}
      />
      <input
        className={styles.input}
        name='estimation'
        type='number'
        placeholder='Enter ticket estimation'
        onChange={e => setEstimate(Number(e.target.value))}
      />
      <button className={styles.button} onClick={handleSubmit}>
        Create Ticket
      </button>
      {!!addingError && <p className={styles.error}>{addingError}</p>}
    </div>
  );
};

export default TicketForm;
