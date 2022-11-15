import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

import { useMyTodos } from '@/contexts/MyTodos'

import FormsTodosChange from '@/forms/todos/Change'

function PagesMyTodosEdit() {
  const { id } = useParams()
  const { show: { data: myTodo, loading }, getMyTodo, updateMyTodo } = useMyTodos()

  useEffect(() => {
    getMyTodo(id)
  }, [])

  if (!loading && !myTodo) return <h1 className="text-center">Todo {id} Not Found</h1>

  return (
    <div id="pages-my-todos-edit" className="container">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <h1 className="text-center">{ myTodo?.id ? `Edit Todo ${myTodo.id}` : <Skeleton className="w-50" />}</h1>

          {
            loading ? (
              <Skeleton count={5} height={40} />
            ) : (
              <FormsTodosChange
                onSubmit={updateMyTodo}
                initialValues={myTodo}
              />
            )
          }

        </div>
      </div>
    </div>
  )
}

export default PagesMyTodosEdit
