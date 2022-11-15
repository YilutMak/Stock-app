import React from 'react'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

import { useGetMyTodosQuery } from '@/services/api/MyTodos'

function PagesMyTodosIndex() {
  const navigate = useNavigate()
  const { data: { todos: myTodos } = {}, isLoading, error } = useGetMyTodosQuery()

  if (error) return <h1 className="text-center">{error.data.message}</h1>

  return (
    <div id="pages-my-todos-index" className="container">
      <h1 className="text-center">My Todos</h1>
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
              isLoading ? (
                Array(10).fill(null).map((temp, i) => (
                  <tr key={i}>
                    <td><Skeleton /></td>
                    <td><Skeleton /></td>
                    <td><Skeleton /></td>
                  </tr>
                ))
              ) : (
                myTodos?.map((myTodo) => (
                  <tr key={myTodo.id} onClick={() => navigate(`/my/todos/${myTodo.id}`)}>
                    <td>{myTodo.id}</td>
                    <td>{myTodo.title}</td>
                    <td>{moment(myTodo.createdAt).format('YYYY/DD/MM')}</td>
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

export default PagesMyTodosIndex
