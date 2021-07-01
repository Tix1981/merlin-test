export type Ticket = {
  title: string;
  description: string;
  acceptanceCriteria: string;
  estimate?: number;
};

export type Column = {
  name: string;
  tickets: Ticket[];
};

type Kanban = {
  addingError:string,
  columns: Column[];
  addTicket: (ticket: Ticket, column: string) => void;
  deleteTicket: (ticket: string) => void;
  addColumn: (column: Column) => void;
  deleteColumn: (column: string) => void;
};
