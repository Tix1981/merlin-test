import Head from 'next/head';

import KanbanBoard from '../components/KanbanBoard/KanbanBoard';
import { resetServerContext } from 'react-beautiful-dnd';
import Navbar from '../components/Navbar/Navbar';
import styles from '../styles/Home.module.css';
import useKanban from '../hooks/useKanban/useKanban';
import { KanbanContextProvider } from '../hooks/useKanbanContext/useKanbanContext';

export default function Home() {
  const kanban = useKanban();

  resetServerContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Merlin - Kanban Code Test</title>
        <meta name='description' content='React code test for Merlin' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar>
        <h1>Merlin - Kanban Code Test</h1>
      </Navbar>

      <div className={styles['scroll-container']}>
        <div className={styles.centered}>
          <KanbanContextProvider value={kanban}>
            <KanbanBoard {...kanban} />
          </KanbanContextProvider>
        </div>
      </div>
    </div>
  );
}
