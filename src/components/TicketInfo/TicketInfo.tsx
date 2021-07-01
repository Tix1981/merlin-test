import React, { FC } from 'react';
import { Ticket } from '../../typings/typings';

const TicketInfo: FC<{ ticket: Ticket }> = ({ ticket }) => {
  return (
    <ul>
      <li>
        <p>
          <strong>Description: </strong>
        </p>
        <span>{ticket.description}</span>
      </li>
      <li>
        <p>
          <strong>Acceptance Criteria: </strong>
        </p>
        <span>{ticket.acceptanceCriteria}</span>
      </li>
      <li>
        <p>
          <strong>Estimate: </strong>
        </p>
        <span>{ticket.estimate}</span>
      </li>
    </ul>
  );
};

export default TicketInfo;
