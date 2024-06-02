import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import TodoListsCreatePage from './pages/TodoLists/TodoListsCreatePage';
import TodoListsShowPage from './pages/TodoLists/TodoListsShowPage';
import TodoListsDeletePage from './pages/TodoLists/TodoListsDeletePage';
import Layout from './Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/todo_lists/show/:id" element={<TodoListsShowPage />} />
          <Route path="/todo_lists/create" element={<TodoListsCreatePage />} />
          <Route path="/todo_lists/delete/:id" element={<TodoListsDeletePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;