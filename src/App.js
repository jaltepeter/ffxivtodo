import React from 'react';
import './App.css';
import { useStateWithLocalStorage } from './localStorage.js';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar'
import './bootstrap.min.css';
import { list } from './items';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


function UpgradeAlert({ todos, upgradeList }) {
  if (todos.version < list.version)
    return (
      <Alert variant='warning'>
        This is an alert!
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => upgradeList(todos)}>Click here to upgrade</Button>
        </div>
      </Alert>
    );
  else
    return (<></>);
}

function Todo({ todo, index, completeTodo }) {
  let checkMark = <></>;
  if (todo.isCompleted) {
    checkMark = <FontAwesomeIcon icon={faCheckCircle} />
  }
  return (
    <ListGroup.Item >
      <p style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
        <span style={{ color: '#00bc8c', marginRight: '1em' }}>{checkMark}</span>
        {todo.name}
      </p>
      <p>
        <a href={todo.link} target="blank">{todo.link}</a>
      </p>

      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
      </div>
    </ListGroup.Item>
  );
};

function App() {
  const [todos, setTodos] = useStateWithLocalStorage();

  const completeTodo = index => {
    const version = todos.version;
    const newTodos = [...todos.items];
    newTodos[index].isCompleted = true;
    setTodos({ 'version': version, 'items': newTodos });
  };

  const reset = type => {
    const version = todos.version;
    const newTodos = [...todos.items];
    newTodos.forEach(element => {
      if (element.type === type) {
        element.isCompleted = false;
      }
    });
    setTodos({ 'version': version, 'items': newTodos });
  }

  const upgradeList = todos => {
    setTodos(list);
  }

  let now = (todos.items.filter(d => d.isCompleted === true).length / todos.items.length) * 100;

  console.log(now);

  return (
    <Container>
      <UpgradeAlert todos={todos} upgradeList={upgradeList} />
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Dailies</Card.Header>

              <ListGroup>
                {todos.items.filter(d => d.type === 'daily').map((todo, index) => (
                  <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                  />
                ))}
              </ListGroup>

            </Card>
          </Col>
          <Col>
            <ListGroup>
              {todos.items.filter(d => d.type === 'weekly').map((todo, index) => (
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  completeTodo={completeTodo}
                />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>


      <Container>
        <ProgressBar now={now.toFixed(0)} />
      </Container>
      <Container>
        <label>v: {todos.version}</label>
      </Container>
      <Container>
        <Button onClick={() => reset('daily')}>Reset Dailies</Button>
        <Button onClick={() => reset('weekly')}>Reset Weeklies</Button>
      </Container>
    </Container>
  );
};

export default App;