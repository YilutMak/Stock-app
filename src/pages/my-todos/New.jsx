import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useCreateMyTodoMutation } from '@/services/api/MyTodos'

import FormsTodosChange from '@/forms/todos/Change'

function PagesMyTodosNew() {
  const navigation = useNavigate()
  const [createMyTodo] = useCreateMyTodoMutation()

  const customCreateMyTodo = async (data) => {
    await createMyTodo(data).then((resp) => {
      navigation(`/todos/${resp.data.todo.id}`)
    })
  }

  return (
    <div id="pages-my-todos-new" className="container">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <h1 className="text-center">Create A New Todo</h1>

          <FormsTodosChange
            onSubmit={customCreateMyTodo}
          />
        </div>
      </div>
    </div>
  )
}

export default PagesMyTodosNew
