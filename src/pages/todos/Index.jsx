import React, { useEffect } from 'react'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

import { useTodos } from '@/contexts/Todos'

function PagesTodosIndex() {
  const navigate = useNavigate()
  const { index: { data: todos, loading }, getTodos } = useTodos()

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div id="pages-todos-index" className="container">
      <h1 className="text-center">Todos</h1>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th className="w-75" scope="col">Title</th>
              <th className="w-25" scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? (
                Array(10).fill(null).map((temp, i) => (
                  <tr key={i}>
                    <td><Skeleton /></td>
                    <td><Skeleton /></td>
                    <td><Skeleton /></td>
                  </tr>
                ))
              ) : (
                todos.map((todo) => (
                  <tr key={todo.id} onClick={() => navigate(`/todos/${todo.id}`)}>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td>{moment(todo.createdAt).format('YYYY/DD/MM')}</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PagesTodosIndex
