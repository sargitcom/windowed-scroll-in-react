import logo from './logo.svg';
import './App.css';
import DragAndDrop from "./components/DragAndDrop";
import {useState} from 'react';
import {Container} from "./components/Drag/Container";
import DataLoader from "./components/Drag/DataLoader";

const getTasks = (title) => {
    const tasks = [];

    for (let i = 1; i < 50; i++) {
        tasks.push(
            {id: i + 'task', title: title + " test " + i},
        )
    }

    return tasks;
}

const t = [];

for (let i = 1; i <= 3650; i++) {
  t.push(
      {
        id: i + 'test',
        text: 'Day ' + i,
        tasks: [...getTasks(i)]
      }
  )
}

function App() {
  const [tt, setTt] = useState(t)
    const [shouldRefreshTaskList, setShouldRefreshTaskList] = useState(false);

    const addTask = (item) => {
      console.log(item);
    }

  return (
      <div>
          <DataLoader
              items={t}
              isItemLoaded={false}
              itemCount={t.length}
              loadMoreItems={() => {}}
              shouldRefreshTaskList={setShouldRefreshTaskList}
          />
      </div>
  );
}

export default App;
